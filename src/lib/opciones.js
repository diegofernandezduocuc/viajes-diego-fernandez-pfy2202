const textoValido = valor => typeof valor === 'string' && valor.trim().length > 0;
const fechaValida = valor => typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor) && Number.isFinite(Date.parse(valor));
const precioValido = valor => Number.isFinite(valor) && valor >= 0;

// Una respuesta vacía es válida; los campos ausentes o mal formados son un error.
export function opcionesValidas(opciones) {
  return Array.isArray(opciones?.vuelos) && Array.isArray(opciones?.hoteles) &&
    opciones.vuelos.every(vuelo => vuelo &&
      ['id', 'aerolinea', 'origen', 'destino', 'duracion', 'disponibilidad'].every(campo => textoValido(vuelo[campo])) &&
      fechaValida(vuelo.salida) && fechaValida(vuelo.regreso) && precioValido(vuelo.precio)) &&
    opciones.hoteles.every(hotel => hotel &&
      ['id', 'nombre', 'ubicacion', 'categoria', 'disponibilidad'].every(campo => textoValido(hotel[campo])) &&
      fechaValida(hotel.desde) && fechaValida(hotel.hasta) && precioValido(hotel.precioNoche) &&
      Array.isArray(hotel.servicios) && hotel.servicios.every(textoValido));
}
