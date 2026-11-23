import { Link } from 'react-router-dom';
import ImagenDestino from './ImagenDestino.jsx';
import Icono from './Icono.jsx';

export default function DestinoCard({ destino, indice = 0 }) {
  return (
    <article className={`tarjeta-destino tarjeta-${destino.tono}`}>
      <Link className="tarjeta-imagen-enlace" to={`/destinos/${destino.id}`} aria-label={`Ver vuelos y hoteles para ${destino.ciudad}, ${destino.pais}`}>
        <ImagenDestino destino={destino} loading={indice < 3 ? 'eager' : 'lazy'} className="tarjeta-imagen" />
        <span className="tarjeta-categoria">{destino.etiqueta}</span>
      </Link>
      <div className="tarjeta-contenido">
        <div className="tarjeta-ubicacion"><Icono nombre="ubicacion" size={15}/>{destino.pais} <span className="separador-punto">•</span> {destino.region}</div>
        <div className="tarjeta-titulo-linea">
          <h3>{destino.ciudad}</h3>
          <Link className="tarjeta-flecha" to={`/destinos/${destino.id}`} aria-label={`Explorar ${destino.ciudad}`}><Icono nombre="diagonal" size={21}/></Link>
        </div>
        <p>{destino.subtitulo}</p>
        <div className="tarjeta-actividades" aria-label="Actividades destacadas">
          {destino.actividades.slice(0, 2).map((actividad) => <span key={actividad}>{actividad}</span>)}
        </div>
      </div>
    </article>
  );
}
