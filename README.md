# Brújula — Agencia de viajes

Aplicación web desarrollada para la actividad **«Integrando nuestro frontend con backend»**, correspondiente a Desarrollo Frontend II (PFY2202), semana 5.

Brújula permite explorar destinos turísticos y consultar vuelos y alojamientos asociados. Integra React con dos servicios simulados: una API REST para el catálogo de destinos y una API GraphQL para las opciones de viaje.

## Funcionalidades

- Catálogo de seis destinos, con país, región, descripción y actividades populares.
- Búsqueda por destino, país o actividad y filtrado por región.
- Consulta de vuelos y hoteles asociados al destino seleccionado, con precios, fechas y disponibilidad.
- Navegación mediante React Router entre inicio, catálogo, detalle y página no encontrada.
- Estados de carga, error, reintento y ausencia de resultados.
- Interfaz responsiva con fotografías locales, recursos SVG de respaldo e iconos vectoriales.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React y JavaScript | Componentes funcionales, `useState`, `useEffect` e interacción |
| HTML y CSS | Estructura semántica, presentación y diseño responsivo |
| Vite | Desarrollo local y compilación |
| React Router | Navegación entre vistas |
| MSW | Simulación de servicios REST y GraphQL |
| Apollo Client y GraphQL | Consulta de vuelos y hoteles por destino |
| Lucide React | Iconos de la interfaz |

## Instalación y ejecución

**Requisitos:** Node.js compatible con Vite (20.19+ o 22.12+) y npm.

Desde la raíz del proyecto:

```bash
npm ci
npm run dev
```

La aplicación se ejecuta en la dirección local que informa Vite, normalmente `http://localhost:5173/`. Los scripts preparan el Service Worker de MSW necesario para responder a las solicitudes simuladas.

Para compilar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

La compilación se genera en `dist/`.

## Integración frontend y backend simulado

**REST — `GET /api/destinos`:** entrega los destinos en formato JSON, con identificador, país, región, descripción y actividades. La aplicación consulta el servicio con `fetch` y `useEffect`.

**GraphQL — `POST /graphql`:** la operación `ObtenerOpcionesViaje` recibe `destinoId` y devuelve los vuelos y hoteles correspondientes. Apollo Client gestiona la consulta en la vista de detalle.

Ambos servicios se implementan mediante los handlers de `src/mocks/handlers.js`. No requieren un servidor backend independiente ni una base de datos. El archivo `mockServiceWorker.js` se prepara mediante los scripts de desarrollo y compilación.

## Pruebas

| Comando | Verificación |
|---|---|
| `npm test` | Datos, contratos REST/GraphQL y validación de respuestas |
| `npm run test:browser` | Navegación e integración desde el navegador mediante Playwright |
| `npm run build` | Compilación de producción |

Las pruebas de navegador están configuradas para Chrome y Microsoft Edge. Incluyen carga inicial, cambios de destino, recarga de rutas, filtros, errores y reintentos, fotografías locales, navegación por teclado y vistas de 360, 768 y 1280 píxeles. Se incorpora una comprobación automática de accesibilidad mediante axe. Los casos de éxito utilizan MSW; los escenarios de error y datos vacíos inyectan respuestas controladas en la sesión de prueba.

## Estructura del proyecto

```text
public/              Fotografías, recursos SVG y Service Worker
src/components/      Componentes reutilizables
src/context/         Estado del catálogo de destinos
src/data/            Datos de prueba
src/lib/             Consultas y utilidades
src/mocks/           Servicios REST y GraphQL simulados
src/pages/           Páginas y navegación
tests/               Pruebas automatizadas
LICENSES/            Avisos de licencia de terceros
.github/workflows/   Configuración de GitHub Pages
```

## Publicación

El proyecto está configurado para el repositorio `viajes-diego-fernandez-pfy2202`. Incluye un flujo de GitHub Actions que ejecuta pruebas y genera la versión de GitHub Pages con la ruta base correspondiente. La navegación utiliza `HashRouter` para admitir enlaces directos y recargas en alojamiento estático. La variable de entorno `GITHUB_PAGES=true` selecciona la ruta base `/viajes-diego-fernandez-pfy2202/` durante la compilación y el preview. El workflow despliega desde `main` o mediante ejecución manual y requiere GitHub Pages configurado con GitHub Actions.

## Información de demostración

Los datos de destinos, vuelos y alojamientos son referenciales y no representan ofertas comerciales reales. La aplicación está orientada a consultar opciones de viaje; no procesa reservas ni pagos.

## Recursos gráficos y licencias

Las fotografías se obtuvieron de [Pexels](https://www.pexels.com/license/) y se almacenan localmente en `public/images/fotos/`. Se utilizan conforme a la Licencia Pexels. Las ilustraciones SVG locales funcionan como respaldo cuando una fotografía no puede cargarse.

| Destino | Fotografía | Autor | Fuente |
|---|---|---|---|
| Patagonia | Torres del Paine | Leo Enrique Paredes Lopez | [Pexels](https://www.pexels.com/photo/lake-in-torres-del-paine-national-park-17324478/) |
| Cusco | Plaza de Armas de Cusco | Julia Volk | [Pexels](https://www.pexels.com/photo/cuzco-main-square-in-cusco-peru-5198292/) |
| Cartagena | Centro histórico de Cartagena | Maria Paula Medina | [Pexels](https://www.pexels.com/photo/traditional-houses-in-the-center-of-cartagena-colombia-13804522/) |
| Lisboa | Tranvía de Lisboa | Masood Aslami | [Pexels](https://www.pexels.com/photo/tram-on-lisbon-street-16549948/) |
| Kioto | Pagoda Yasaka | Satoshi Hirayama | [Pexels](https://www.pexels.com/photo/yasaka-pagoda-in-kyoto-7526805/) |
| Reikiavik | Vista urbana de Reikiavik | Monica Oprea | [Pexels](https://www.pexels.com/photo/aerial-shot-of-city-buildings-and-houses-13805378/) |

Los iconos proceden de [Lucide React](https://lucide.dev/guide/react/) y se distribuyen bajo la licencia ISC, con los avisos correspondientes a los iconos derivados de Feather Icons. Los textos de licencia están en [`LICENSES/LUCIDE.txt`](LICENSES/LUCIDE.txt).

El isotipo y las ilustraciones SVG de respaldo son recursos gráficos creados para el proyecto.
