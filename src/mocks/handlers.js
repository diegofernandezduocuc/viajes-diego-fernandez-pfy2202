import { delay, graphql, http, HttpResponse } from 'msw';
import { destinos, opcionesPorDestino } from '../data/viajes.js';

// API REST simulada: catálogo de destinos con país y actividades.
export const handlers = [
  http.get('*/api/destinos', async () => {
    await delay(350);
    return HttpResponse.json(destinos);
  }),

  // API GraphQL simulada: ofertas asociadas al identificador solicitado.
  graphql.query('ObtenerOpcionesViaje', async ({ variables }) => {
    await delay(450);
    const destinoId = variables?.destinoId;
    const opciones = opcionesPorDestino[destinoId];

    if (!opciones) {
      return HttpResponse.json({
        errors: [{ message: 'No se encontraron opciones para el destino solicitado.' }],
      });
    }

    return HttpResponse.json({
      data: { opcionesViaje: opciones },
    });
  }),
];
