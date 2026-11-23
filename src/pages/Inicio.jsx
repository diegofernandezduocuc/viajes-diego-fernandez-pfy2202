import { Link } from 'react-router-dom';
import { useDestinos } from '../context/DestinosContext.jsx';
import ImagenDestino from '../components/ImagenDestino.jsx';
import DestinoCard from '../components/DestinoCard.jsx';
import { EsqueletoDestinos, EstadoError, EstadoVacio } from '../components/EstadoContenido.jsx';
import Icono from '../components/Icono.jsx';

const etapas = [
  { numero: '01', icono: 'mundo', titulo: 'Encuentra tu lugar', texto: 'Explora destinos y descubre qué experiencias tiene cada uno.' },
  { numero: '02', icono: 'avion', titulo: 'Revisa tus vuelos', texto: 'Consulta fechas, rutas y precios orientativos para tu viaje.' },
  { numero: '03', icono: 'hotel', titulo: 'Elige dónde quedarte', texto: 'Compara hoteles y disponibilidad para el destino elegido.' },
];

export default function Inicio() {
  const { destinos, cargando, error, reintentar } = useDestinos();
  const fotoPatagonia = destinos.find(({ id }) => id === 'patagonia') ?? { id: 'patagonia', ciudad: 'Patagonia', pais: 'Chile', imagen: 'images/patagonia.svg' };
  const fotoCartagena = destinos.find(({ id }) => id === 'cartagena') ?? { id: 'cartagena', ciudad: 'Cartagena', pais: 'Colombia', imagen: 'images/cartagena.svg' };

  return (
    <>
      <section className="hero">
        <div className="contenedor hero-contenido">
          <div className="hero-texto">
            <div className="etiqueta-superior"><span className="etiqueta-estrella"><Icono nombre="chispa" size={15}/></span> TUS PRÓXIMAS HISTORIAS COMIENZAN AQUÍ</div>
            <h1>Hay un mundo <em>esperando</em> por ti.</h1>
            <p>Descubre nuevos destinos, encuentra vuelos y hoteles, y empieza a imaginar tu próxima aventura.</p>
            <div className="hero-botones">
              <Link className="boton boton-principal" to="/destinos">Explorar destinos <Icono nombre="flecha" size={19}/></Link>
              <button className="enlace-texto" type="button" onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}>¿Cómo funciona? <Icono nombre="diagonal" size={16}/></button>
            </div>
            <div className="hero-sello"><span className="sello-icono"><Icono nombre="brujula" size={19}/></span><span>Una manera más simple de descubrir el mundo.</span></div>
          </div>
          <div className="hero-composicion" aria-label="Fotografías de destinos turísticos">
            <div className="hero-figura-decorativa" aria-hidden="true" />
            <div className="hero-foto-principal">
              <ImagenDestino destino={fotoPatagonia} loading="eager" />
              <div className="hero-foto-pie"><Icono nombre="ubicacion" size={16}/> Patagonia, Chile</div>
            </div>
            <div className="hero-foto-secundaria">
              <ImagenDestino destino={fotoCartagena} loading="eager" />
              <span>Cartagena, Colombia</span>
            </div>
            <div className="hero-sello-flotante"><Icono nombre="estrella" size={20}/><span>Viajes que inspiran</span></div>
          </div>
        </div>
      </section>

      <section className="seccion seccion-destacados" aria-labelledby="titulo-destacados">
        <div className="contenedor">
          <div className="encabezado-seccion">
            <div>
              <span className="sobre-titulo">UN MUNDO POR DESCUBRIR</span>
              <h2 id="titulo-destacados">Destinos para <em>inspirarte</em></h2>
              <p>Comienza por alguno de estos lugares y descubre las opciones de viaje disponibles.</p>
            </div>
            <Link className="enlace-subrayado" to="/destinos">Ver todos los destinos <Icono nombre="flecha" size={19}/></Link>
          </div>
          {cargando && <EsqueletoDestinos />}
          {!cargando && error && <EstadoError mensaje={error} alReintentar={reintentar} />}
          {!cargando && !error && destinos.length === 0 && <EstadoVacio titulo="Aún no hay destinos" descripcion="Vuelve a consultar el catálogo más adelante." />}
          {!cargando && !error && destinos.length > 0 && (
            <div className="cuadricula-destinos">
              {destinos.slice(0, 3).map((destino, indice) => <DestinoCard key={destino.id} destino={destino} indice={indice}/>)}
            </div>
          )}
        </div>
      </section>

      <section className="seccion como-funciona" id="como-funciona" aria-labelledby="titulo-como-funciona">
        <div className="contenedor">
          <div className="centro-seccion">
            <span className="sobre-titulo">TAN FÁCIL COMO IMAGINARLO</span>
            <h2 id="titulo-como-funciona">Tu viaje, en <em>tres pasos</em></h2>
            <p>La información que necesitas para empezar a planificar, en un mismo lugar.</p>
          </div>
          <div className="pasos">
            {etapas.map((etapa) => (
              <article className="paso" key={etapa.numero}>
                <div className="paso-superior"><span className="paso-icono"><Icono nombre={etapa.icono} size={26}/></span><span className="paso-numero">{etapa.numero}</span></div>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion franja-cta">
        <div className="contenedor">
          <div className="cta-interior">
            <div><span className="sobre-titulo">¿LISTO PARA EXPLORAR?</span><h2>El próximo destino <em>lo eliges tú.</em></h2></div>
            <Link className="boton boton-claro" to="/destinos">Descubrir lugares <Icono nombre="flecha" size={18}/></Link>
            <div className="cta-circulo" aria-hidden="true"><Icono nombre="brujula" size={135}/></div>
          </div>
        </div>
      </section>
    </>
  );
}
