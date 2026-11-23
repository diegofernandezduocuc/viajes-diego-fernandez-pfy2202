// Datos de demostración utilizados por los servicios REST y GraphQL simulados.
export const destinos = [
  {
    id: 'patagonia',
    ciudad: 'Patagonia',
    pais: 'Chile',
    region: 'Sudamérica',
    etiqueta: 'Naturaleza',
    subtitulo: 'La inmensidad del sur',
    descripcion: 'Montañas, lagos turquesa y paisajes que invitan a recorrer cada sendero con calma.',
    actividades: ['Senderismo', 'Miradores', 'Lagos y glaciares'],
    imagen: 'images/patagonia.svg',
    foto: 'images/fotos/patagonia.jpg',
    tono: 'verde',
    aeropuerto: 'PUQ'
  },
  {
    id: 'cusco',
    ciudad: 'Cusco',
    pais: 'Perú',
    region: 'Sudamérica',
    etiqueta: 'Cultura',
    subtitulo: 'Historias entre montañas',
    descripcion: 'Recorre calles históricas, descubre el Valle Sagrado y disfruta de la cultura andina.',
    actividades: ['Valle Sagrado', 'Gastronomía', 'Patrimonio histórico'],
    imagen: 'images/cusco.svg',
    foto: 'images/fotos/cusco.jpg',
    tono: 'arena',
    aeropuerto: 'CUZ'
  },
  {
    id: 'cartagena',
    ciudad: 'Cartagena',
    pais: 'Colombia',
    region: 'Sudamérica',
    etiqueta: 'Costa',
    subtitulo: 'Color junto al mar',
    descripcion: 'Arquitectura colonial, calles llenas de vida y tardes frente al Caribe.',
    actividades: ['Centro histórico', 'Playas', 'Paseos culturales'],
    imagen: 'images/cartagena.svg',
    foto: 'images/fotos/cartagena.jpg',
    tono: 'coral',
    aeropuerto: 'CTG'
  },
  {
    id: 'lisboa',
    ciudad: 'Lisboa',
    pais: 'Portugal',
    region: 'Europa',
    etiqueta: 'Ciudad',
    subtitulo: 'Calles con mucha historia',
    descripcion: 'Tranvías, miradores, azulejos y barrios donde siempre hay algo nuevo que conocer.',
    actividades: ['Miradores', 'Recorridos a pie', 'Gastronomía'],
    imagen: 'images/lisboa.svg',
    foto: 'images/fotos/lisboa.jpg',
    tono: 'sol',
    aeropuerto: 'LIS'
  },
  {
    id: 'kioto',
    ciudad: 'Kioto',
    pais: 'Japón',
    region: 'Asia',
    etiqueta: 'Tradición',
    subtitulo: 'Pausa entre templos',
    descripcion: 'Jardines tranquilos, templos tradicionales y rincones para explorar sin prisa.',
    actividades: ['Templos', 'Jardines', 'Cultura local'],
    imagen: 'images/kioto.svg',
    foto: 'images/fotos/kioto.jpg',
    tono: 'rosa',
    aeropuerto: 'KIX'
  },
  {
    id: 'reikiavik',
    ciudad: 'Reikiavik',
    pais: 'Islandia',
    region: 'Europa',
    etiqueta: 'Aventura',
    subtitulo: 'Un viaje a otro paisaje',
    descripcion: 'Paisajes volcánicos, costas del Atlántico y una ciudad de espíritu creativo.',
    actividades: ['Paisajes volcánicos', 'Termas', 'Rutas panorámicas'],
    imagen: 'images/reikiavik.svg',
    foto: 'images/fotos/reikiavik.jpg',
    tono: 'azul',
    aeropuerto: 'KEF'
  }
];

export const opcionesPorDestino = {
  patagonia: {
    vuelos: [
      { id: 'pat-v1', aerolinea: 'Aerolínea Austral', origen: 'Santiago (SCL)', destino: 'Punta Arenas (PUQ)', salida: '2027-03-12', regreso: '2027-03-19', duracion: '3 h 30 min', precio: 145900, disponibilidad: 'Disponible' },
      { id: 'pat-v2', aerolinea: 'Vuelos del Sur', origen: 'Santiago (SCL)', destino: 'Punta Arenas (PUQ)', salida: '2027-04-08', regreso: '2027-04-15', duracion: '3 h 25 min', precio: 169900, disponibilidad: 'Pocos cupos' }
    ],
    hoteles: [
      { id: 'pat-h1', nombre: 'Refugio del Lago', ubicacion: 'Puerto Natales', categoria: 'Lodge', precioNoche: 89900, desde: '2027-03-12', hasta: '2027-03-19', disponibilidad: 'Disponible', servicios: ['Desayuno', 'Vista al lago'] },
      { id: 'pat-h2', nombre: 'Hotel Viento Austral', ubicacion: 'Punta Arenas', categoria: 'Hotel', precioNoche: 74900, desde: '2027-04-08', hasta: '2027-04-15', disponibilidad: 'Disponible', servicios: ['Wi-Fi', 'Desayuno'] }
    ]
  },
  cusco: {
    vuelos: [
      { id: 'cus-v1', aerolinea: 'Andes Aire', origen: 'Santiago (SCL)', destino: 'Cusco (CUZ)', salida: '2027-04-10', regreso: '2027-04-17', duracion: '5 h 15 min', precio: 259900, disponibilidad: 'Disponible' },
      { id: 'cus-v2', aerolinea: 'Rutas Andinas', origen: 'Santiago (SCL)', destino: 'Cusco (CUZ)', salida: '2027-05-06', regreso: '2027-05-13', duracion: '5 h 40 min', precio: 238900, disponibilidad: 'Pocos cupos' }
    ],
    hoteles: [
      { id: 'cus-h1', nombre: 'Casa del Valle', ubicacion: 'Centro histórico', categoria: 'Boutique', precioNoche: 62900, desde: '2027-04-10', hasta: '2027-04-17', disponibilidad: 'Disponible', servicios: ['Desayuno', 'Patio interior'] },
      { id: 'cus-h2', nombre: 'Altura Andina', ubicacion: 'San Blas', categoria: 'Hotel', precioNoche: 84900, desde: '2027-05-06', hasta: '2027-05-13', disponibilidad: 'Disponible', servicios: ['Wi-Fi', 'Terraza'] }
    ]
  },
  cartagena: {
    vuelos: [
      { id: 'car-v1', aerolinea: 'Caribe Conecta', origen: 'Santiago (SCL)', destino: 'Cartagena (CTG)', salida: '2027-02-18', regreso: '2027-02-25', duracion: '7 h 45 min', precio: 389900, disponibilidad: 'Disponible' },
      { id: 'car-v2', aerolinea: 'Alas del Caribe', origen: 'Santiago (SCL)', destino: 'Cartagena (CTG)', salida: '2027-03-11', regreso: '2027-03-18', duracion: '7 h 50 min', precio: 409900, disponibilidad: 'Sin disponibilidad' }
    ],
    hoteles: [
      { id: 'car-h1', nombre: 'Patio de la Muralla', ubicacion: 'Ciudad amurallada', categoria: 'Boutique', precioNoche: 119900, desde: '2027-02-18', hasta: '2027-02-25', disponibilidad: 'Disponible', servicios: ['Piscina', 'Desayuno'] },
      { id: 'car-h2', nombre: 'Brisa del Caribe', ubicacion: 'Bocagrande', categoria: 'Hotel', precioNoche: 96900, desde: '2027-03-11', hasta: '2027-03-18', disponibilidad: 'Pocos cupos', servicios: ['Vista al mar', 'Wi-Fi'] }
    ]
  },
  lisboa: {
    vuelos: [
      { id: 'lis-v1', aerolinea: 'Atlántico Air', origen: 'Santiago (SCL)', destino: 'Lisboa (LIS)', salida: '2027-04-18', regreso: '2027-04-28', duracion: '16 h 20 min', precio: 899900, disponibilidad: 'Disponible' },
      { id: 'lis-v2', aerolinea: 'Europa Viajes', origen: 'Santiago (SCL)', destino: 'Lisboa (LIS)', salida: '2027-05-15', regreso: '2027-05-25', duracion: '17 h 10 min', precio: 939900, disponibilidad: 'Pocos cupos' }
    ],
    hoteles: [
      { id: 'lis-h1', nombre: 'Solar de Alfama', ubicacion: 'Alfama', categoria: 'Boutique', precioNoche: 129900, desde: '2027-04-18', hasta: '2027-04-28', disponibilidad: 'Disponible', servicios: ['Desayuno', 'Terraza'] },
      { id: 'lis-h2', nombre: 'Casa do Miradouro', ubicacion: 'Baixa', categoria: 'Hotel', precioNoche: 109900, desde: '2027-05-15', hasta: '2027-05-25', disponibilidad: 'Disponible', servicios: ['Wi-Fi', 'Cerca del metro'] }
    ]
  },
  kioto: {
    vuelos: [
      { id: 'kio-v1', aerolinea: 'Pacífico Oriente', origen: 'Santiago (SCL)', destino: 'Osaka (KIX)', salida: '2027-03-19', regreso: '2027-03-31', duracion: '25 h 10 min', precio: 1299900, disponibilidad: 'Disponible' },
      { id: 'kio-v2', aerolinea: 'Ruta del Sol', origen: 'Santiago (SCL)', destino: 'Osaka (KIX)', salida: '2027-04-14', regreso: '2027-04-26', duracion: '24 h 45 min', precio: 1399900, disponibilidad: 'Pocos cupos' }
    ],
    hoteles: [
      { id: 'kio-h1', nombre: 'Jardín de Kioto', ubicacion: 'Higashiyama', categoria: 'Ryokan', precioNoche: 159900, desde: '2027-03-19', hasta: '2027-03-31', disponibilidad: 'Disponible', servicios: ['Desayuno', 'Jardín'] },
      { id: 'kio-h2', nombre: 'Machi Stay', ubicacion: 'Centro de Kioto', categoria: 'Hotel', precioNoche: 119900, desde: '2027-04-14', hasta: '2027-04-26', disponibilidad: 'Disponible', servicios: ['Wi-Fi', 'Cerca del tren'] }
    ]
  },
  reikiavik: {
    vuelos: [
      { id: 'rei-v1', aerolinea: 'Norte Atlántico', origen: 'Santiago (SCL)', destino: 'Keflavík (KEF)', salida: '2027-03-07', regreso: '2027-03-17', duracion: '20 h 30 min', precio: 1199900, disponibilidad: 'Disponible' },
      { id: 'rei-v2', aerolinea: 'Aurora Air', origen: 'Santiago (SCL)', destino: 'Keflavík (KEF)', salida: '2027-04-02', regreso: '2027-04-12', duracion: '21 h 05 min', precio: 1249900, disponibilidad: 'Pocos cupos' }
    ],
    hoteles: [
      { id: 'rei-h1', nombre: 'Nordic Harbor', ubicacion: 'Puerto viejo', categoria: 'Hotel', precioNoche: 149900, desde: '2027-03-07', hasta: '2027-03-17', disponibilidad: 'Disponible', servicios: ['Desayuno', 'Vista al puerto'] },
      { id: 'rei-h2', nombre: 'Aurora House', ubicacion: 'Centro de Reikiavik', categoria: 'Guesthouse', precioNoche: 119900, desde: '2027-04-02', hasta: '2027-04-12', disponibilidad: 'Disponible', servicios: ['Wi-Fi', 'Cocina compartida'] }
    ]
  }
};
