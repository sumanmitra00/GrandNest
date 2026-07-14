import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import RatingStars from './RatingStars';

export default function HotelCard({ hotel, index = 0 }) {
  return (
    <div
      className="keycard-edge group bg-navy-950 text-cream overflow-hidden animate-fadeUp"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
        <span className="absolute top-4 left-4 eyebrow bg-navy-950/80 border border-gold-500/40 text-gold-400 px-3 py-1.5">
          {hotel.type}
        </span>
        <span className="absolute top-4 right-4 font-mono text-xs bg-gold-500 text-navy-950 px-2.5 py-1.5 font-bold">
          {hotel.stars}★
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-snug">{hotel.name}</h3>
          <div className="text-right shrink-0">
            <p className="font-display text-xl text-gold-500 leading-none">${hotel.price}</p>
            <p className="text-[10px] text-cream/40 mt-1">/ night</p>
          </div>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-cream/50 mt-2">
          <MapPin className="w-3.5 h-3.5" /> {hotel.city}, {hotel.country}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <RatingStars rating={hotel.rating} />
          <span className="text-xs text-cream/40">{hotel.rating} ({hotel.reviews})</span>
        </div>

        <p className="text-sm text-cream/50 mt-4 leading-relaxed line-clamp-2">{hotel.tagline}</p>

        <div className="flex items-center gap-3 mt-6">
          <Link
            to={`/hotels/${hotel.id}`}
            className="flex-1 text-center eyebrow border border-cream/20 py-3 hover:border-gold-500 hover:text-gold-400 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/booking/${hotel.id}`}
            className="flex-1 text-center eyebrow bg-gold-500 text-navy-950 py-3 hover:bg-gold-400 transition-colors flex items-center justify-center gap-1"
          >
            Book Now <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
