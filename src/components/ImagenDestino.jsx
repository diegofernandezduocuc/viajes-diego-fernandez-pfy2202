import { useEffect, useState } from 'react';
import { rutaRecurso } from '../lib/rutas.js';

function obtenerRuta(ruta) {
  return /^https?:\/\//.test(ruta) ? ruta : rutaRecurso(ruta);
}

export default function ImagenDestino({ destino, className = '', loading = 'lazy' }) {
  const [usarRespaldo, setUsarRespaldo] = useState(false);

  useEffect(() => {
    setUsarRespaldo(false);
  }, [destino.id, destino.foto]);

  return (
    <img
      src={usarRespaldo || !destino.foto ? rutaRecurso(destino.imagen) : obtenerRuta(destino.foto)}
      alt={`Vista de ${destino.ciudad}, ${destino.pais}`}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => setUsarRespaldo(true)}
    />
  );
}
