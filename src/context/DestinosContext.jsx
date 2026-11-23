import { createContext, useContext, useEffect, useState } from 'react';
import { rutaRecurso } from '../lib/rutas.js';

const DestinosContext = createContext(null);

export function DestinosProvider({ children }) {
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [solicitud, setSolicitud] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerDestinos() {
      setCargando(true);
      setError('');

      try {
        const respuesta = await fetch(rutaRecurso('api/destinos'), {
          signal: controller.signal,
        });
        if (!respuesta.ok) {
          throw new Error(`Respuesta HTTP ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (!Array.isArray(datos)) {
          throw new Error('La respuesta de destinos no tiene el formato esperado.');
        }
        if (!controller.signal.aborted) {
          setDestinos(datos);
        }
      } catch (errorSolicitud) {
        if (!controller.signal.aborted) {
          setDestinos([]);
          setError('No fue posible cargar los destinos. Comprueba la conexión e inténtalo nuevamente.');
        }
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    obtenerDestinos();
    return () => controller.abort();
  }, [solicitud]);

  const reintentar = () => setSolicitud((anterior) => anterior + 1);

  return (
    <DestinosContext.Provider value={{ destinos, cargando, error, reintentar }}>
      {children}
    </DestinosContext.Provider>
  );
}

export function useDestinos() {
  const contexto = useContext(DestinosContext);
  if (!contexto) throw new Error('useDestinos requiere DestinosProvider.');
  return contexto;
}
