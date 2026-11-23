const monedaChilena = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const fechaCorta = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatearPrecio(valor) {
  return monedaChilena.format(valor);
}

export function formatearFecha(fechaISO) {
  return fechaCorta.format(new Date(`${fechaISO}T12:00:00Z`));
}

export function normalizarTexto(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
