import { test, expect } from '@playwright/test';

const destinos = [
  ['patagonia', 'Patagonia', 'Refugio del Lago'],
  ['cusco', 'Cusco', 'Casa del Valle'],
  ['cartagena', 'Cartagena', 'Patio de la Muralla'],
  ['lisboa', 'Lisboa', 'Solar de Alfama'],
  ['kioto', 'Kioto', 'Jardín de Kioto'],
  ['reikiavik', 'Reikiavik', 'Nordic Harbor'],
];

test('primera navegación desde inicio y recorrido de los seis destinos', async ({ page }) => {
  const errores = [];
  page.on('pageerror', error => errores.push(error.message));
  await page.goto('./');
  await expect(page.locator('.tarjeta-destino')).toHaveCount(3);
  await page.getByRole('link', { name: 'Explorar Patagonia', exact: true }).click();
  for (const [id, ciudad, hotel] of destinos) {
    if (id !== 'patagonia') {
      await page.getByRole('link', { name: /Explorar otros destinos/ }).click();
      await page.getByRole('link', { name: `Explorar ${ciudad}`, exact: true }).click();
    }
    await expect(page.locator('h1')).toContainText(ciudad);
    await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
    await expect(page.locator('.columnas-ofertas')).toContainText(hotel);
    await expect(page.getByRole('alert')).toHaveCount(0);
    await expect(page.getByText('Información simulada', { exact: true })).toHaveCount(1);
    expect(await page.locator('svg.lucide').count()).toBeGreaterThan(5);
  }
  expect(errores).toEqual([]);
});

test('respuestas lentas y cambios rápidos no muestran ofertas de otro destino', async ({ page }) => {
  await page.addInitScript(() => {
    const original = window.fetch;
    window.fetch = async (...args) => {
      const respuesta = await original(...args);
      if (String(args[0]).endsWith('/graphql')) {
        const id = JSON.parse(args[1].body).variables.destinoId;
        await new Promise(resolve => setTimeout(resolve, id === 'patagonia' ? 1700 : 750));
      }
      return respuesta;
    };
  });
  const solicitudes = [];
  page.on('request', r => { if (r.url().endsWith('/graphql')) solicitudes.push(r.postDataJSON().variables.destinoId); });
  await page.goto('./#/destinos/patagonia');
  await expect(page.getByRole('status')).toContainText('Consultando vuelos');
  await expect.poll(() => solicitudes.includes('patagonia')).toBe(true);
  for (const [id, ciudad] of destinos.slice(1)) {
    await page.evaluate(id => { window.location.hash = `/destinos/${id}`; }, id);
    await expect(page.locator('h1')).toContainText(ciudad);
    await expect(page.getByRole('status')).toContainText('Consultando vuelos');
    await expect(page.locator('.tarjeta-oferta')).toHaveCount(0);
    await expect.poll(() => solicitudes.includes(id)).toBe(true);
  }
  await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
  await expect(page.locator('.columnas-ofertas')).toContainText('Nordic Harbor');
  await page.waitForTimeout(2000);
  await expect(page.locator('.columnas-ofertas')).toContainText('Nordic Harbor');
  await expect(page.getByText('Refugio del Lago')).toHaveCount(0);
});

for (const caso of ['ausente', 'estructura', 'hotel-invalido']) {
  test(`GraphQL con respuesta ${caso} presenta error y permite reintentar`, async ({ page }) => {
    await page.addInitScript(caso => {
      const original = window.fetch;
      window.fetch = (...args) => {
        if (String(args[0]).endsWith('/graphql') && !window.respuestaValida) {
          const opciones = caso === 'estructura' ? { vuelos: null, hoteles: [] } : { vuelos: [], hoteles: [{ id: 'incorrecto' }] };
          return Promise.resolve(Response.json({ data: caso === 'ausente' ? null : { opcionesViaje: opciones } }));
        }
        return original(...args);
      };
    }, caso);
    await page.goto('./#/destinos/patagonia');
    await expect(page.getByRole('alert')).toContainText('respuesta');
    await expect(page.getByText('Sin vuelos disponibles')).toHaveCount(0);
    await page.evaluate(() => { window.respuestaValida = true; });
    await page.getByRole('button', { name: /Intentar nuevamente/ }).click();
    await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
  });
}

test('error HTTP temporal y dos reintentos sin recarga ni promesas rechazadas', async ({ page }) => {
  const errores = [];
  page.on('pageerror', error => errores.push(error.message));
  await page.addInitScript(() => {
    window.intentosGraphql = 0;
    const original = window.fetch;
    window.fetch = (...args) => {
      if (String(args[0]).endsWith('/graphql') && ++window.intentosGraphql <= 2) {
        return Promise.resolve(new Response('', { status: 503 }));
      }
      return original(...args);
    };
  });
  await page.goto('./#/destinos/patagonia');
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByRole('button', { name: /Intentar nuevamente/ }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByRole('button', { name: /Intentar nuevamente/ }).click();
  await expect(page.locator('.tarjeta-oferta')).toHaveCount(4);
  expect(await page.evaluate(() => window.intentosGraphql)).toBe(3);
  expect(errores).toEqual([]);
});
