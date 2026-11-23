import { useQuery } from '@apollo/client/react';
import { Link, useParams } from 'react-router-dom';
import { useDestinos } from '../context/DestinosContext.jsx';
import ImagenDestino from '../components/ImagenDestino.jsx';
import { CONSULTAR_OPCIONES } from '../lib/apollo.js';
import { opcionesValidas } from '../lib/opciones.js';
import { TarjetaHotel, TarjetaVuelo } from '../components/TarjetasOfertas.jsx';
import { EstadoError, EstadoVacio } from '../components/EstadoContenido.jsx';
import Icono from '../components/Icono.jsx';

function CargandoOfertas() {
  return <div className="cargando-ofertas" role="status" aria-live="polite"><span className="spinner"/> Consultando vuelos y hoteles disponibles…</div>;
}

export default function DetalleDestino() {
  const { destinoId } = useParams();
  const { destinos, cargando, error, reintentar } = useDestinos();
  const destino = destinos.find((item) => item.id === destinoId);

  const { data, loading: cargandoOpciones, error: errorOpciones, refetch } = useQuery(CONSULTAR_OPCIONES, {
    variables: { destinoId },
    skip: !destino,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  if (cargando) return <div className="contenedor detalle-pendiente"><CargandoOfertas /></div>;
  if (error) return <div className="contenedor detalle-pendiente"><EstadoError mensaje={error} alReintentar={reintentar}/></div>;
  if (!destino) return (
    <div className="contenedor detalle-pendiente"><EstadoVacio titulo="Destino no encontrado" descripcion="El lugar solicitado no está disponible en el catálogo."/><Link className="boton boton-oscuro centrado" to="/destinos"><Icono nombre="flechaIzquierda" size={17}/> Volver a destinos</Link></div>
  );

  const respuestaValida = opcionesValidas(data?.opcionesViaje);
  const vuelos = respuestaValida ? data.opcionesViaje.vuelos : [];
  const hoteles = respuestaValida ? data.opcionesViaje.hoteles : [];

  return (
    <>
      <div className="contenedor ruta-migas" aria-label="Ruta de navegación"><Link to="/">Inicio</Link><span>/</span><Link to="/destinos">Destinos</Link><span>/</span><strong>{destino.ciudad}</strong></div>
      <section className="contenedor detalle-hero">
        <div className="detalle-hero-imagen"><ImagenDestino destino={destino} loading="eager"/><span className="sello-imagen"><Icono nombre="ubicacion" size={17}/>{destino.ciudad}, {destino.pais}</span></div>
        <div className="detalle-presentacion"><span className="sobre-titulo">DESCUBRE TU PRÓXIMA EXPERIENCIA</span><h1>{destino.ciudad}<span className="titulo-punto">.</span></h1><p className="detalle-pais"><Icono nombre="ubicacion" size={19}/>{destino.pais} · {destino.region}</p><h2>{destino.subtitulo}</h2><p className="detalle-descripcion">{destino.descripcion}</p><h3>Para disfrutar allí</h3><div className="etiquetas-actividad">{destino.actividades.map((actividad) => <span key={actividad}><Icono nombre="check" size={15}/>{actividad}</span>)}</div><button className="enlace-descender" type="button" onClick={() => document.getElementById('opciones-viaje')?.scrollIntoView({ behavior: 'smooth' })}>Ver vuelos y hoteles <Icono nombre="flecha" size={19}/></button></div>
      </section>

      <section id="opciones-viaje" className="seccion seccion-ofertas" aria-labelledby="titulo-opciones">
        <div className="contenedor">
          <div className="ofertas-cabecera"><div><span className="sobre-titulo">PLANIFICA TU ESTADÍA</span><h2 id="titulo-opciones">Opciones para <em>{destino.ciudad}</em></h2><p>Consulta vuelos y alojamientos asociados a este destino.</p></div></div>

          {cargandoOpciones && <CargandoOfertas />}
          {!cargandoOpciones && errorOpciones && <EstadoError mensaje="No fue posible consultar vuelos y hoteles. Intenta nuevamente." alReintentar={() => refetch()}/>}
          {!cargandoOpciones && !errorOpciones && !respuestaValida && <EstadoError mensaje="La respuesta de vuelos y hoteles no tiene el formato esperado. Intenta nuevamente." alReintentar={() => refetch()}/>}
          {!cargandoOpciones && !errorOpciones && respuestaValida && (
            <div className="columnas-ofertas">
              <section className="columna-ofertas" aria-labelledby="titulo-vuelos">
                <div className="ofertas-seccion-titulo"><span className="ofertas-icono"><Icono nombre="avion" size={24}/></span><div><h3 id="titulo-vuelos">Vuelos disponibles</h3><p>Salidas desde Santiago de Chile</p></div><span className="ofertas-cantidad">{vuelos.length}</span></div>
                {vuelos.length === 0 ? <EstadoVacio titulo="Sin vuelos disponibles" descripcion="No hay vuelos disponibles para este destino."/> : vuelos.map((vuelo) => <TarjetaVuelo key={vuelo.id} vuelo={vuelo}/>)}
              </section>
              <section className="columna-ofertas" aria-labelledby="titulo-hoteles">
                <div className="ofertas-seccion-titulo"><span className="ofertas-icono ofertas-icono-hotel"><Icono nombre="hotel" size={24}/></span><div><h3 id="titulo-hoteles">Hoteles para tu viaje</h3><p>Alojamiento en el destino</p></div><span className="ofertas-cantidad">{hoteles.length}</span></div>
                {hoteles.length === 0 ? <EstadoVacio titulo="Sin hoteles disponibles" descripcion="No hay alojamientos disponibles para este destino."/> : hoteles.map((hotel) => <TarjetaHotel key={hotel.id} hotel={hotel}/>)}
              </section>
            </div>
          )}
        </div>
      </section>
      <div className="contenedor detalle-volver"><Link className="enlace-subrayado" to="/destinos"><Icono nombre="flechaIzquierda" size={19}/> Explorar otros destinos</Link></div>
    </>
  );
}
