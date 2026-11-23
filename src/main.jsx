import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { HashRouter } from 'react-router-dom';
import { apolloClient } from './lib/apollo.js';
import { DestinosProvider } from './context/DestinosContext.jsx';
import App from './App.jsx';
import './styles.css';

const root = createRoot(document.getElementById('root'));

async function iniciarAplicacion() {
  // El worker responde tanto en desarrollo como en la versión estática publicada.
  try {
    const { worker } = await import('./mocks/browser.js');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        options: { scope: import.meta.env.BASE_URL },
      },
    });
  } catch (error) {
    console.error('No fue posible iniciar los servicios simulados.', error);
    root.render(
      <main className="inicio-error">
        <h1>No pudimos iniciar la aplicación</h1>
        <p>Actualiza la página para volver a intentar la conexión.</p>
        <button type="button" onClick={() => window.location.reload()}>Reintentar</button>
      </main>,
    );
    return;
  }

  root.render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <HashRouter>
          <DestinosProvider>
            <App />
          </DestinosProvider>
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>,
  );
}

iniciarAplicacion();
