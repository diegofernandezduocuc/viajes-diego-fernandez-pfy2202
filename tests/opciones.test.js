import test from 'node:test';
import assert from 'node:assert/strict';
import { opcionesValidas } from '../src/lib/opciones.js';
import { opcionesPorDestino } from '../src/data/viajes.js';

test('las opciones de los seis destinos cumplen el contrato de presentación', () => {
  for (const opciones of Object.values(opcionesPorDestino)) assert.equal(opcionesValidas(opciones), true);
});

test('una respuesta válida sin ofertas se distingue de una respuesta ausente', () => {
  assert.equal(opcionesValidas({ vuelos: [], hoteles: [] }), true);
  for (const opciones of [null, undefined, {}, { vuelos: null, hoteles: [] }, { vuelos: [], hoteles: {} }]) {
    assert.equal(opcionesValidas(opciones), false);
  }
});

test('ofertas incompletas, precios inválidos y fechas ilegibles no se presentan', () => {
  const base = opcionesPorDestino.patagonia;
  for (const campos of [{ salida: 'fecha-invalida' }, { salida: 'March 12, 2027' }, { precio: '145900' }, { id: '' }, { precio: Infinity }]) {
    assert.equal(opcionesValidas({ ...base, vuelos: [{ ...base.vuelos[0], ...campos }] }), false);
  }
  for (const hotel of [null, { id: 'incompleto' }, { ...base.hoteles[0], servicios: null }]) {
    assert.equal(opcionesValidas({ ...base, hoteles: [hotel] }), false);
  }
});
