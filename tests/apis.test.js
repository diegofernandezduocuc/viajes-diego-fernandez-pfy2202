import test, { after, before, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handlers.js';
import { destinos, opcionesPorDestino } from '../src/data/viajes.js';

const servidor = setupServer(...handlers);
const urlBase = 'http://localhost:5173/viajes-diego-fernandez-pfy2202';

before(() => servidor.listen({ onUnhandledRequest: 'error' }));
afterEach(() => servidor.resetHandlers());
after(() => servidor.close());

async function consultarOpciones(destinoId) {
  const respuesta = await fetch(`${urlBase}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'ObtenerOpcionesViaje',
      query: `query ObtenerOpcionesViaje($destinoId: String!) {
        opcionesViaje(destinoId: $destinoId) { vuelos { id precio salida disponibilidad } hoteles { id precioNoche desde disponibilidad } }
      }`,
      variables: { destinoId },
    }),
  });
  assert.equal(respuesta.status, 200);
  return respuesta.json();
}

test('REST: GET devuelve destinos con país y actividades', async () => {
  const respuesta = await fetch(`${urlBase}/api/destinos`);
  assert.equal(respuesta.status, 200);
  const datos = await respuesta.json();
  assert.equal(datos.length, destinos.length);
  assert.ok(datos.every((destino) => destino.pais && destino.actividades.length > 0));
});

test('GraphQL: recupera vuelos y hoteles del destino solicitado', async () => {
  const resultado = await consultarOpciones('cusco');
  assert.equal(resultado.data.opcionesViaje.vuelos.length, opcionesPorDestino.cusco.vuelos.length);
  assert.equal(resultado.data.opcionesViaje.hoteles.length, opcionesPorDestino.cusco.hoteles.length);
  assert.ok(resultado.data.opcionesViaje.vuelos[0].precio > 0);
});

test('GraphQL: al cambiar destino cambian las ofertas', async () => {
  const primero = await consultarOpciones('patagonia');
  const segundo = await consultarOpciones('lisboa');
  assert.notEqual(primero.data.opcionesViaje.vuelos[0].id, segundo.data.opcionesViaje.vuelos[0].id);
  assert.notEqual(primero.data.opcionesViaje.hoteles[0].id, segundo.data.opcionesViaje.hoteles[0].id);
});

test('GraphQL: un identificador desconocido devuelve un error legible', async () => {
  const resultado = await consultarOpciones('destino-inexistente');
  assert.ok(resultado.errors?.[0]?.message.includes('No se encontraron opciones'));
});
