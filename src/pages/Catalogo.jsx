import { useMemo, useState } from 'react';
import DestinoCard from '../components/DestinoCard.jsx';
import Icono from '../components/Icono.jsx';
import { EsqueletoDestinos, EstadoError, EstadoVacio } from '../components/EstadoContenido.jsx';
import { useDestinos } from '../context/DestinosContext.jsx';
import { normalizarTexto } from '../lib/formato.js';

const regiones = ['Todos', 'Sudamérica', 'Europa', 'Asia'];

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [region, setRegion] = useState('Todos');
  const { destinos, cargando, error, reintentar } = useDestinos();

  const resultados = useMemo(() => destinos.filter((destino) => {
    const correspondeRegion = region === 'Todos' || destino.region === region;
    const palabras = normalizarTexto(`${destino.ciudad} ${destino.pais} ${destino.region} ${destino.actividades.join(' ')}`);
    return correspondeRegion && palabras.includes(normalizarTexto(busqueda.trim()));
  }), [destinos, region, busqueda]);

  const reiniciarFiltros = () => { setBusqueda(''); setRegion('Todos'); };

  return (
    <>
      <section className="banner-interior">
        <div className="contenedor banner-interior-contenido">
          <div className="banner-texto"><span className="sobre-titulo">EXPLORA A TU RITMO</span><h1>Encuentra tu próximo <em>destino.</em></h1><p>Explora lugares, actividades y opciones para comenzar a planificar una experiencia diferente.</p></div>
          <div className="banner-decoracion" aria-hidden="true"><Icono nombre="mundo" size={155}/></div>
        </div>
      </section>
      <section className="seccion seccion-catalogo" aria-labelledby="titulo-listado">
        <div className="contenedor">
          <div className="barra-filtros">
            <div className="filtro-busqueda">
              <label className="solo-lectores" htmlFor="buscar-destino">Buscar por lugar o actividad</label>
              <Icono nombre="lupa" size={20}/>
              <input id="buscar-destino" type="search" placeholder="Buscar destino o actividad..." value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)}/>
            </div>
            <div className="filtro-regiones" role="group" aria-label="Filtrar por región">
              {regiones.map((opcion) => (
                <button key={opcion} type="button" className={region === opcion ? 'boton-filtro seleccionado' : 'boton-filtro'} onClick={() => setRegion(opcion)} aria-pressed={region === opcion}>{opcion}</button>
              ))}
            </div>
          </div>
          <div className="contador-resultados"><h2 id="titulo-listado">Destinos <span className="contador-numero">{cargando ? '…' : resultados.length}</span></h2><span>Selecciona un lugar para consultar vuelos y hoteles</span></div>
          {cargando && <EsqueletoDestinos cantidad={6} />}
          {!cargando && error && <EstadoError mensaje={error} alReintentar={reintentar} />}
          {!cargando && !error && destinos.length === 0 && <EstadoVacio titulo="Aún no hay destinos" descripcion="Vuelve a consultar el catálogo más adelante." />}
          {!cargando && !error && destinos.length > 0 && resultados.length === 0 && (
            <div className="sin-resultados"><EstadoVacio titulo="No encontramos coincidencias" descripcion="Prueba con otro nombre, actividad o región."/><button type="button" className="boton boton-oscuro" onClick={reiniciarFiltros}>Quitar filtros <Icono nombre="cerrar" size={18}/></button></div>
          )}
          {!cargando && !error && resultados.length > 0 && (
            <div className="cuadricula-destinos">
              {resultados.map((destino, indice) => <DestinoCard key={destino.id} destino={destino} indice={indice}/>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
