import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { destinos, opcionesPorDestino } from '../src/data/viajes.js';
import { formatearFecha, formatearPrecio, normalizarTexto } from '../src/lib/formato.js';

test('el catálogo contiene destinos con identificadores únicos', () => {
  assert.ok(destinos.length >= 3);
  assert.equal(new Set(destinos.map(({ id }) => id)).size, destinos.length);
});

test('cada destino incluye país y actividades populares', () => {
  for (const destino of destinos) {
    assert.ok(destino.id && destino.ciudad && destino.pais);
    assert.ok(destino.region && destino.imagen);
    assert.ok(Array.isArray(destino.actividades) && destino.actividades.length > 0);
  }
});

test('cada destino tiene vuelos y hoteles relacionados', () => {
  assert.deepEqual(Object.keys(opcionesPorDestino).sort(), destinos.map(({ id }) => id).sort());
  for (const destino of destinos) {
    const { vuelos, hoteles } = opcionesPorDestino[destino.id];
    assert.ok(vuelos.length > 0, `${destino.id} sin vuelos`);
    assert.ok(hoteles.length > 0, `${destino.id} sin hoteles`);
  }
});

test('vuelos: precio, fechas, disponibilidad y ruta de origen', () => {
  for (const { vuelos } of Object.values(opcionesPorDestino)) {
    for (const vuelo of vuelos) {
      assert.ok(vuelo.id && vuelo.aerolinea && vuelo.destino);
      assert.ok(vuelo.origen.includes('(SCL)'));
      assert.ok(vuelo.precio > 0);
      assert.ok(!Number.isNaN(Date.parse(vuelo.salida)));
      assert.ok(Date.parse(vuelo.regreso) > Date.parse(vuelo.salida));
      assert.ok(['Disponible', 'Pocos cupos', 'Sin disponibilidad'].includes(vuelo.disponibilidad));
    }
  }
});

test('hoteles: precio por noche, rango de fechas y disponibilidad', () => {
  for (const { hoteles } of Object.values(opcionesPorDestino)) {
    for (const hotel of hoteles) {
      assert.ok(hotel.id && hotel.nombre && hotel.ubicacion);
      assert.ok(hotel.precioNoche > 0);
      assert.ok(Date.parse(hotel.hasta) > Date.parse(hotel.desde));
      assert.ok(hotel.servicios.length >= 1);
      assert.ok(['Disponible', 'Pocos cupos', 'Sin disponibilidad'].includes(hotel.disponibilidad));
    }
  }
});

test('formato de precios y fechas localizados', () => {
  assert.match(formatearPrecio(145900), /145\.900/);
  assert.match(formatearFecha('2027-04-10'), /2027/);
  assert.equal(normalizarTexto('Perú'), 'peru');
});


test('cada destino cuenta con fotografía y recurso local de respaldo', () => {
  const urls = new Set();
  for (const destino of destinos) {
    assert.ok(
      /^https:\/\/images\.pexels\.com\/photos\/\d+\//.test(destino.foto) ||
      /^images\/fotos\/[a-z]+\.(?:webp|jpe?g)$/.test(destino.foto),
      `referencia fotográfica no válida para ${destino.id}`,
    );
    assert.match(destino.imagen, /^images\/[a-z]+\.svg$/);
    if (destino.foto.startsWith('images/')) {
      const foto = readFileSync(new URL(`../public/${destino.foto}`, import.meta.url));
      assert.equal(foto.readUInt16BE(0), 0xffd8, 'archivo JPEG válido');
      assert.ok(foto.length < 800_000, 'fotografía optimizada para la web');
    }
    assert.ok(!urls.has(destino.foto), 'fotografía duplicada');
    urls.add(destino.foto);
  }
});
