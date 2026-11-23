import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { rutaRecurso } from './rutas.js';

export const CONSULTAR_OPCIONES = gql`
  query ObtenerOpcionesViaje($destinoId: String!) {
    opcionesViaje(destinoId: $destinoId) {
      vuelos {
        id
        aerolinea
        origen
        destino
        salida
        regreso
        duracion
        precio
        disponibilidad
      }
      hoteles {
        id
        nombre
        ubicacion
        categoria
        precioNoche
        desde
        hasta
        disponibilidad
        servicios
      }
    }
  }
`;

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: rutaRecurso('graphql') }),
  cache: new InMemoryCache(),
});
