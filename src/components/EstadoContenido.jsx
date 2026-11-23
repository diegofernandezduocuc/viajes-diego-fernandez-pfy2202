import Icono from './Icono.jsx';

export function EstadoError({ mensaje, alReintentar }) {
  return (
    <section className="estado estado-error" role="alert">
      <span className="estado-icono"><Icono nombre="advertencia" size={28}/></span>
      <h2>No pudimos cargar la información</h2>
      <p>{mensaje}</p>
      {alReintentar && (
        <button className="boton boton-oscuro" type="button" onClick={alReintentar}>Intentar nuevamente <Icono nombre="flecha" size={18} /></button>
      )}
    </section>
  );
}

export function EstadoVacio({ titulo = 'Sin resultados', descripcion = 'No encontramos información para mostrar.' }) {
  return (
    <section className="estado estado-vacio" role="status">
      <span className="estado-icono"><Icono nombre="lupa" size={27}/></span>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </section>
  );
}

export function EsqueletoDestinos({ cantidad = 3 }) {
  return (
    <div className="cuadricula-destinos" aria-label="Cargando destinos" aria-busy="true">
      {Array.from({ length: cantidad }, (_, indice) => (
        <div className="esqueleto-tarjeta" key={indice}>
          <div className="esqueleto-imagen animacion-carga" />
          <div className="esqueleto-linea animacion-carga" />
          <div className="esqueleto-linea corta animacion-carga" />
        </div>
      ))}
    </div>
  );
}
