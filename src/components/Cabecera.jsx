import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icono from './Icono.jsx';

export default function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const ubicacion = useLocation();

  const esDetalle = ubicacion.pathname.startsWith('/destinos/');
  const cerrar = () => setAbierto(false);

  return (
    <>
      <a className="saltar-contenido" href="#contenido-principal" onClick={(evento) => { evento.preventDefault(); document.getElementById('contenido-principal')?.focus(); }}>Saltar al contenido</a>
      <header className="cabecera">
        <div className="contenedor cabecera-interior">
          <Link className="marca" to="/" onClick={cerrar} aria-label="Brújula, ir al inicio">
            <span className="marca-simbolo"><Icono nombre="brujula" size={23} /></span>
            <span>brújula<span className="marca-punto">.</span></span>
          </Link>

          <button
            className="boton-menu"
            type="button"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            aria-controls="menu-principal"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <Icono nombre={abierto ? 'cerrar' : 'menu'} size={25} />
          </button>

          <nav id="menu-principal" className={`navegacion ${abierto ? 'navegacion-abierta' : ''}`} aria-label="Navegación principal">
            <NavLink to="/" end onClick={cerrar} className={({ isActive }) => isActive ? 'enlace-nav activo' : 'enlace-nav'}>Inicio</NavLink>
            <NavLink to="/destinos" onClick={cerrar} className={({ isActive }) => isActive || esDetalle ? 'enlace-nav activo' : 'enlace-nav'}>Destinos</NavLink>
            <Link className="boton boton-pequeno boton-oscuro enlace-explorar" to="/destinos" onClick={cerrar}>
              Explorar viajes <Icono nombre="diagonal" size={17} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
