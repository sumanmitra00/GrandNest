import { Link } from 'react-router-dom';

export default function DestinationCard({ destination, index = 0 }) {
  return (
    <Link
      to={`/hotels?q=${encodeURIComponent(destination.name)}`}
      className="group relative h-72 overflow-hidden block animate-fadeUp"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
      <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/60 transition-colors duration-500 m-3" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="eyebrow text-gold-400">{destination.count} Hotels</p>
        <h3 className="font-display text-2xl text-cream mt-1">{destination.name}</h3>
      </div>
    </Link>
  );
}
