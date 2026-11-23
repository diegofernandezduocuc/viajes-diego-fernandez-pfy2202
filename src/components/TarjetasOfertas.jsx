import Icono from './Icono.jsx';
import { formatearFecha, formatearPrecio } from '../lib/formato.js';

function Disponibilidad({ valor }) {
  const clase = valor === 'Disponible' ? 'disponible' : valor === 'Pocos cupos' ? 'limitado' : 'agotado';
  return <span className={`disponibilidad disponibilidad-${clase}`}><span className="punto-estado" />{valor}</span>;
}

export function TarjetaVuelo({ vuelo }) {
  return (
    <article className="tarjeta-oferta">
      <div className="oferta-encabezado">
        <div className="oferta-emblema"><Icono nombre="avion" size={20}/></div>
        <div className="oferta-cabecera-textos"><h3>{vuelo.aerolinea}</h3><span>Vuelo de ida y regreso</span></div>
        <Disponibilidad valor={vuelo.disponibilidad}/>
      </div>
      <div className="ruta-vuelo">
        <span className="ruta-extremo">{vuelo.origen}</span>
        <div className="ruta-trazo"><span/><Icono nombre="avion" size={17}/><span/></div>
        <span className="ruta-extremo">{vuelo.destino}</span>
      </div>
      <div className="oferta-informacion">
        <span><Icono nombre="calendario" size={16}/> Ida: {formatearFecha(vuelo.salida)}</span>
        <span><Icono nombre="calendario" size={16}/> Regreso: {formatearFecha(vuelo.regreso)}</span>
        <span><Icono nombre="reloj" size={16}/> Duración estimada: {vuelo.duracion}</span>
      </div>
      <div className="oferta-pie">
        <span>Precio referencial por persona</span>
        <strong>{formatearPrecio(vuelo.precio)}</strong>
      </div>
    </article>
  );
}

export function TarjetaHotel({ hotel }) {
  return (
    <article className="tarjeta-oferta">
      <div className="oferta-encabezado">
        <div className="oferta-emblema oferta-emblema-hotel"><Icono nombre="hotel" size={20}/></div>
        <div className="oferta-cabecera-textos"><h3>{hotel.nombre}</h3><span>{hotel.categoria} · {hotel.ubicacion}</span></div>
        <Disponibilidad valor={hotel.disponibilidad}/>
      </div>
      <div className="hotel-servicios">
        {hotel.servicios.map((servicio) => <span key={servicio}><Icono nombre="check" size={16}/>{servicio}</span>)}
      </div>
      <div className="oferta-informacion">
        <span><Icono nombre="calendario" size={16}/> Desde: {formatearFecha(hotel.desde)}</span>
        <span><Icono nombre="calendario" size={16}/> Hasta: {formatearFecha(hotel.hasta)}</span>
      </div>
      <div className="oferta-pie">
        <span>Precio referencial por noche</span>
        <strong>{formatearPrecio(hotel.precioNoche)}</strong>
      </div>
    </article>
  );
}
