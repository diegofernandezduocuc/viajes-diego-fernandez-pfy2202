export function rutaRecurso(ruta) {
  return `${import.meta.env.BASE_URL}${ruta.replace(/^\//, '')}`;
}
