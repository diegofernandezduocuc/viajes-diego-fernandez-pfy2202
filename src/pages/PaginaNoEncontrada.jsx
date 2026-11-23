import { Link } from 'react-router-dom';
import Icono from '../components/Icono.jsx';

export default function PaginaNoEncontrada() {
  return (
    <section className="pagina-404 contenedor">
      <div className="numero-404">404</div>
      <span className="sobre-titulo">PARECE QUE NOS SALIMOS DEL MAPA</span>
      <h1>Esta ruta no está disponible.</h1>
      <p>El enlace que buscas no existe. Puedes volver al inicio o explorar nuestros destinos.</p>
      <Link className="boton boton-principal" to="/destinos">Ver destinos <Icono nombre="flecha" size={18}/></Link>
    </section>
  );
}
