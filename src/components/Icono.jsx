import {
  ArrowRight, ArrowLeft, ArrowUpRight, MapPin, Plane, Hotel,
  CalendarDays, Clock3, Search, Menu, X, Compass, Globe2,
  ShieldCheck, Check, TriangleAlert, Mountain, Star,
  Sparkles, Sun, Info,
} from 'lucide-react';

const iconos = {
  flecha: ArrowRight,
  flechaIzquierda: ArrowLeft,
  diagonal: ArrowUpRight,
  ubicacion: MapPin,
  avion: Plane,
  hotel: Hotel,
  calendario: CalendarDays,
  reloj: Clock3,
  lupa: Search,
  menu: Menu,
  cerrar: X,
  brujula: Compass,
  mundo: Globe2,
  escudo: ShieldCheck,
  check: Check,
  advertencia: TriangleAlert,
  montana: Mountain,
  estrella: Star,
  chispa: Sparkles,
  sol: Sun,
  informacion: Info,
};

export default function Icono({ nombre, size = 20, className = '' }) {
  const Componente = iconos[nombre] ?? Compass;
  return <Componente size={size} className={className} strokeWidth={1.8} aria-hidden="true" focusable="false" />;
}
