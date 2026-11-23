import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Cabecera from './components/Cabecera.jsx';
import PiePagina from './components/PiePagina.jsx';
import Inicio from './pages/Inicio.jsx';
import Catalogo from './pages/Catalogo.jsx';
import DetalleDestino from './pages/DetalleDestino.jsx';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada.jsx';

function CambioRuta() {
  const ubicacion = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ubicacion.pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <CambioRuta />
      <Cabecera />
      <main id="contenido-principal" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Catalogo />} />
          <Route path="/destinos/:destinoId" element={<DetalleDestino />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  );
}
