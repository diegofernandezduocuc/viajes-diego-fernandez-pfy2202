import { Link } from 'react-router-dom';
import Icono from './Icono.jsx';

export default function PiePagina() {
  return (
    <footer className="pie-pagina">
      <div className="contenedor pie-contenido">
        <div>
          <Link className="marca marca-pie" to="/">
            <span className="marca-simbolo"><Icono nombre="brujula" size={22}/></span>
            <span>brújula<span className="marca-punto">.</span></span>
          </Link>
          <p>Una forma simple de descubrir lugares extraordinarios.</p>
        </div>
        <div className="pie-enlaces">
          <Link to="/">Inicio</Link>
          <Link to="/destinos">Destinos</Link>
        </div>
      </div>
      <div className="contenedor pie-inferior">
        <span>Brújula · Explora tu próximo destino.</span>
        <span>Información simulada</span>
      </div>
    </footer>
  );
}
