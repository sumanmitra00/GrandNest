import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin, Wifi, Waves, Sparkles, Dumbbell, UtensilsCrossed, ParkingCircle,
  Plane, Coffee, BellRing, Shirt, PawPrint, Wine, Users, CheckCircle2,
} from 'lucide-react';
import { findHotel, roomTypes, hotels } from '../data/hotels';
import { testimonials } from '../data/misc';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import HotelCard from '../components/HotelCard';
import SectionHeading from '../components/SectionHeading';

const amenityIcons = {
  WiFi: Wifi, Pool: Waves, Spa: Sparkles, Gym: Dumbbell, Restaurant: UtensilsCrossed,
  Parking: ParkingCircle, 'Airport Pickup': Plane, Breakfast: Coffee, 'Room Service': BellRing,
  Laundry: Shirt, 'Pet Friendly': PawPrint, Bar: Wine,
};

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = findHotel(id);
  const [activeImage, setActiveImage] = useState(0);

  if (!hotel) return <Navigate to="/hotels" replace />;

  const rooms = roomTypes(hotel.price);
  const similar = hotels.filter(h => h.id !== hotel.id && h.city !== hotel.city).slice(0, 4);

  return (
    <div className="pt-24 bg-cream min-h-screen">
      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px]">
          <div className="col-span-4 md:col-span-2 row-span-2 overflow-hidden">
            <img src={hotel.gallery[activeImage]} alt={hotel.name} className="w-full h-full object-cover" />
          </div>
          {hotel.gallery.map((g, i) => (
            <button key={i} onClick={() => setActiveImage(i)} className="hidden md:block overflow-hidden relative">
              <img src={g} alt="" className="w-full h-full object-cover" />
              {activeImage === i && <div className="absolute inset-0 ring-2 ring-inset ring-gold-500" />}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid lg:grid-cols-[1fr_360px] gap-14">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 eyebrow text-gold-600 mb-3"><MapPin className="w-3.5 h-3.5" /> {hotel.city}, {hotel.country}</p>
              <h1 className="font-display text-4xl md:text-5xl text-ink">{hotel.name}</h1>
              <div className="flex items-center gap-3 mt-4">
                <RatingStars rating={hotel.rating} />
                <span className="text-sm text-ink/50">{hotel.rating} · {hotel.reviews} reviews · {hotel.stars}-star {hotel.type}</span>
              </div>
            </div>
          </div>

          <div className="gold-rule my-10" />

          <SectionHeading eyebrow="Overview" title="About This Hotel" />
          <p className="text-ink/60 leading-relaxed -mt-8 max-w-2xl">{hotel.description}</p>

          <div className="mt-16">
            <SectionHeading eyebrow="On Property" title="Amenities" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 -mt-4">
              {hotel.amenities.map(a => {
                const Icon = amenityIcons[a] || CheckCircle2;
                return (
                  <div key={a} className="flex items-center gap-3 border border-ink/10 px-4 py-3.5">
                    <Icon className="w-5 h-5 text-gold-600 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-ink/70">{a}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="Choose Your Stay" title="Room Types" />
            <div className="grid sm:grid-cols-2 gap-5 -mt-4">
              {rooms.map(r => (
                <div key={r.id} className="border border-ink/10 overflow-hidden group">
                  <div className="h-40 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-lg text-ink">{r.name}</h3>
                      <p className="font-display text-lg text-gold-600">${r.price}</p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs text-ink/40 mt-1.5"><Users className="w-3.5 h-3.5" /> {r.capacity}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {r.facilities.map(f => (
                        <span key={f} className="text-[11px] bg-cream border border-ink/10 px-2.5 py-1 text-ink/50">{f}</span>
                      ))}
                    </div>
                    <Link to={`/booking/${hotel.id}?room=${r.id}`} className="block text-center eyebrow bg-navy-950 text-cream mt-5 py-3 hover:bg-navy-800 transition-colors">
                      Book This Room
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="From Our Guests" title="Guest Reviews" />
            <div className="grid sm:grid-cols-2 gap-4 -mt-4">
              {testimonials.slice(0, 2).map((t, i) => <ReviewCard review={t} key={t.name} index={i} />)}
            </div>
          </div>
        </div>

        {/* Sticky booking card */}
        <aside>
          <div className="keycard-edge bg-navy-950 text-cream p-7 sticky top-28">
            <p className="eyebrow text-gold-400 mb-1">From</p>
            <p className="font-display text-4xl">${hotel.price}<span className="text-sm text-cream/40 font-body"> / night</span></p>
            <div className="gold-rule my-6" />
            <div className="flex items-center justify-between text-sm text-cream/60 mb-3">
              <span>Rating</span><span className="text-cream">{hotel.rating} / 5</span>
            </div>
            <div className="flex items-center justify-between text-sm text-cream/60 mb-3">
              <span>Type</span><span className="text-cream">{hotel.type}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-cream/60 mb-6">
              <span>Availability</span><span className="text-gold-400">Open</span>
            </div>
            <Link to={`/booking/${hotel.id}`} className="block text-center eyebrow bg-gold-500 text-navy-950 py-4 hover:bg-gold-400 transition-colors">
              Book Now
            </Link>
          </div>
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="bg-navy-950 py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <SectionHeading eyebrow="You May Also Like" title="Similar Hotels" light />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((h, i) => <HotelCard hotel={h} key={h.id} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
