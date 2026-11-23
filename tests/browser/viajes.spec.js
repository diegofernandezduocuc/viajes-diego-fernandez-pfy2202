import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function catalogo(page) {
  await page.goto('./#/destinos');
  await expect(page.locator('.tarjeta-destino')).toHaveCount(6);
}

test('REST y GraphQL simulados mediante MSW y ofertas distintas', async ({ page }) => {
  const errores = [];
  page.on('pageerror', error => errores.push(error.message));
  const rest = page.waitForResponse(r => r.url().endsWith('/api/destinos') && r.status() === 200);
  await catalogo(page);
  const respuesta = await rest;
  expect(respuesta.fromServiceWorker()).toBe(true);
  expect((await respuesta.json()).every(d => d.pais && d.actividades.length)).toBe(true);
  expect(await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL)).toContain('mockServiceWorker.js');
  const ofertas = [];
  for (const id of ['patagonia', 'lisboa']) {
    const graphql = page.waitForResponse(r => r.url().endsWith('/graphql') && r.request().method() === 'POST');
    await page.locator(`.tarjeta-flecha[href="#/destinos/${id}"]`).click();
    const resultado = await graphql;
    expect(resultado.status()).toBe(200);
    expect(resultado.fromServiceWorker()).toBe(true);
    expect(resultado.request().postDataJSON()).toMatchObject({ operationName: 'ObtenerOpcionesViaje', variables: { destinoId: id } });
    const datos = (await resultado.json()).data.opcionesViaje;
    expect(datos.vuelos[0]).toMatchObject({ precio: expect.any(Number), salida: expect.any(String), disponibilidad: expect.any(String) });
    expect(datos.hoteles[0]).toMatchObject({ precioNoche: expect.any(Number), desde: expect.any(String), disponibilidad: expect.any(String) });
    await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
    await expect(page.locator('.columnas-ofertas')).toContainText(datos.vuelos[0].aerolinea);
    ofertas.push(datos);
    await page.goBack();
  }
  expect(ofertas[0].vuelos[0].id).not.toBe(ofertas[1].vuelos[0].id);
  expect(ofertas[0].hoteles[0].id).not.toBe(ofertas[1].hoteles[0].id);
  expect(errores).toEqual([]);
});

test('filtros, rutas, recarga, teclado e imágenes locales', async ({ page }) => {
  await catalogo(page);
  await page.getByRole('button', { name: 'Europa', exact: true }).click();
  await expect(page.locator('.tarjeta-destino')).toHaveCount(2);
  await page.getByRole('searchbox').fill('inexistente');
  await expect(page.getByText('No encontramos coincidencias')).toBeVisible();
  await page.getByRole('button', { name: /Quitar filtros/ }).click();
  await page.getByRole('searchbox').fill('peru');
  await expect(page.locator('.tarjeta-destino')).toHaveCount(1);
  await page.getByRole('searchbox').fill('');
  const imagenes = page.locator('.tarjeta-imagen');
  for (const img of await imagenes.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth === 1400)).toBe(true);
    expect(await img.getAttribute('src')).toMatch(/images\/fotos\/.*\.jpg$/);
  }
  const enlace = page.getByRole('link', { name: 'Explorar Cusco', exact: true });
  await enlace.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('h1')).toContainText('Cusco');
  await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
  await page.reload();
  await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
  await page.goto('./#/no-existe');
  await expect(page.getByRole('heading', { name: 'Esta ruta no está disponible.' })).toBeVisible();
  await page.goto('./#/destinos/no-existe');
  await expect(page.getByRole('heading', { name: 'Destino no encontrado' })).toBeVisible();
  await page.goto('./');
  await expect(page.locator('.tarjeta-destino')).toHaveCount(3);
  await page.keyboard.press('Tab');
  await page.getByRole('link', { name: 'Saltar al contenido' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('responsive, menú y accesibilidad de inicio, catálogo y detalle', async ({ page }) => {
  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const ruta of ['', '#/destinos', '#/destinos/reikiavik']) {
      await page.goto(`./${ruta}`);
      await expect(page.locator(ruta.includes('reikiavik') ? '.tarjeta-oferta' : '.tarjeta-destino')).toHaveCount(ruta.includes('reikiavik') ? 4 : ruta ? 6 : 3);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(resultado.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
    }
    if (width === 360) {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
      await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Inicio', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
    }
  }
});

// Inyección de fallos en fetch solo en esta sesión de prueba; los casos de éxito usan MSW.
test('carga, REST y GraphQL fallidos con reintento', async ({ page }) => {
  await page.addInitScript(() => {
    window.falloPrueba = 'rest';
    const original = window.fetch;
    window.fetch = async (...args) => {
      const url = String(args[0]);
      if (url.endsWith('/api/destinos') && window.falloPrueba) {
        await new Promise(resolve => setTimeout(resolve, 600));
        if (window.falloPrueba === 'rest') return new Response('', { status: 503 });
      }
      if (url.endsWith('/graphql') && window.falloPrueba === 'graphql') return Response.json({ errors: [{ message: 'Error de prueba' }] });
      return original(...args);
    };
  });
  await page.goto('./#/destinos');
  await expect(page.getByLabel('Cargando destinos')).toBeVisible();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.evaluate(() => { window.falloPrueba = ''; });
  await page.getByRole('button', { name: /Intentar nuevamente/ }).click();
  await expect(page.locator('.tarjeta-destino')).toHaveCount(6);
  await page.evaluate(() => { window.falloPrueba = 'graphql'; });
  await page.getByRole('link', { name: 'Explorar Cusco', exact: true }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.evaluate(() => { window.falloPrueba = ''; });
  await page.getByRole('button', { name: /Intentar nuevamente/ }).click();
  await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
});

test('catálogo vacío y ofertas vacías', async ({ page }) => {
  await page.addInitScript(() => {
    const original = window.fetch;
    window.fetch = (...args) => {
      if (String(args[0]).endsWith('/api/destinos') && !sessionStorage.getItem('catalogoCompleto')) return Promise.resolve(Response.json([]));
      if (String(args[0]).endsWith('/graphql')) return Promise.resolve(Response.json({ data: { opcionesViaje: { vuelos: [], hoteles: [] } } }));
      return original(...args);
    };
  });
  await page.goto('./#/destinos');
  await expect(page.getByText('Aún no hay destinos')).toBeVisible();
  await expect(page.locator('.tarjeta-destino')).toHaveCount(0);
  await page.goto('./#/');
  await expect(page.getByText('Aún no hay destinos')).toBeVisible();
  await page.evaluate(() => sessionStorage.setItem('catalogoCompleto', '1'));
  await page.goto('./#/destinos/cusco');
  await page.reload();
  await expect(page.getByText('Sin vuelos disponibles')).toBeVisible();
  await expect(page.getByText('Sin hoteles disponibles')).toBeVisible();
});

test('cambio directo de destino sin ofertas anteriores y respaldo de imagen', async ({ page }) => {
  await page.goto('./#/destinos/patagonia');
  await expect(page.locator('.columnas-ofertas')).toContainText('Refugio del Lago');
  await page.evaluate(() => { window.location.hash = '/destinos/lisboa'; });
  await expect(page.locator('h1')).toContainText('Lisboa');
  await expect(page.getByText('Refugio del Lago')).toHaveCount(0);
  await expect(page.locator('.columnas-ofertas')).toContainText('Solar de Alfama');
  await page.locator('.detalle-hero-imagen img').evaluate(el => el.dispatchEvent(new Event('error')));
  await expect(page.locator('.detalle-hero-imagen img')).toHaveAttribute('src', /images\/lisboa.svg$/);
  await expect.poll(() => page.locator('.detalle-hero-imagen img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
});
