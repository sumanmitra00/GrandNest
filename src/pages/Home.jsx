import { Link } from 'react-router-dom';
import { ShieldCheck, BadgeDollarSign, Headset, MousePointerClick, Gem, Lock, ArrowRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import DestinationCard from '../components/DestinationCard';
import ReviewCard from '../components/ReviewCard';
import SectionHeading from '../components/SectionHeading';
import { hotels } from '../data/hotels';
import { destinations, testimonials } from '../data/misc';

const whyChoose = [
  { icon: Gem, title: 'Luxury Rooms', copy: 'Every property is hand-inspected for design, comfort, and service standard.' },
  { icon: BadgeDollarSign, title: 'Best Price Guarantee', copy: 'Find it cheaper elsewhere and we will match it, no questions asked.' },
  { icon: Headset, title: '24/7 Customer Support', copy: 'A concierge team reachable any hour, in every timezone you travel to.' },
  { icon: MousePointerClick, title: 'Easy Online Booking', copy: 'Reserve in under two minutes — no accounts required to browse.' },
  { icon: ShieldCheck, title: 'Premium Services', copy: 'Airport transfers, private dining, and spa reservations arranged for you.' },
  { icon: Lock, title: 'Secure Payments', copy: 'Encrypted checkout and transparent pricing with zero hidden fees.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[640px] flex items-center overflow-hidden">
        <img
          src="https://picsum.photos/seed/grandnest-hero/1800/1100"
          alt="Luxury hotel at dusk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">
          <p className="eyebrow text-gold-400 animate-fadeUp">Est. for the considered traveler</p>
          <h1 className="font-display text-5xl md:text-7xl text-cream mt-5 max-w-3xl text-balance animate-fadeUp" style={{ animationDelay: '80ms' }}>
            Experience Luxury Like Never Before
          </h1>
          <p className="text-cream/60 mt-6 max-w-lg text-base leading-relaxed animate-fadeUp" style={{ animationDelay: '160ms' }}>
            Twelve destinations. One standard of service. GrandNest curates the hotels worth crossing an ocean for.
          </p>
          <div className="mt-8 animate-fadeUp" style={{ animationDelay: '240ms' }}>
            <Link to="/hotels" className="inline-flex items-center gap-2 eyebrow bg-gold-500 text-navy-950 px-7 py-4 hover:bg-gold-400 transition-colors">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 px-6 md:px-10">
          <div className="max-w-6xl mx-auto animate-fadeUp" style={{ animationDelay: '320ms' }}>
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-40 pb-28">
        <SectionHeading eyebrow="Handpicked" title="Featured Hotels" description="A rotating shortlist of the properties our guests return to most." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.slice(0, 6).map((h, i) => <HotelCard hotel={h} key={h.id} index={i} />)}
        </div>
        <div className="text-center mt-14">
          <Link to="/hotels" className="eyebrow border-b border-gold-500 text-gold-600 pb-1 hover:text-gold-500 transition-colors">
            View All Hotels
          </Link>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-navy-950 py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="The Standard" title="Why Choose GrandNest" light align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10">
            {whyChoose.map((w, i) => (
              <div key={w.title} className="bg-navy-950 p-8 hover:bg-navy-900 transition-colors animate-fadeUp" style={{ animationDelay: `${i * 60}ms` }}>
                <w.icon className="w-7 h-7 text-gold-500" strokeWidth={1.4} />
                <h3 className="font-display text-lg text-cream mt-5">{w.title}</h3>
                <p className="text-sm text-cream/50 mt-2 leading-relaxed">{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28">
        <SectionHeading eyebrow="Around the World" title="Popular Destinations" description="Every destination page is stocked with hotels worth the flight." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((d, i) => <DestinationCard destination={d} key={d.name} index={i} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-950 py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Guest Notes" title="What Our Guests Say" light align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, i) => <ReviewCard review={t} key={t.name} index={i} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-28 text-center">
        <p className="eyebrow text-gold-600 mb-3">Before You Go</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink text-balance">Private rates, sent to your inbox</h2>
        <p className="text-ink/50 mt-4 text-sm max-w-md mx-auto">Join the list for early access to new properties and member-only pricing.</p>
        <form className="mt-8 flex max-w-md mx-auto border-b-2 border-ink/15 focus-within:border-gold-500 transition-colors" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="you@email.com" className="bg-transparent flex-1 py-3 outline-none text-sm placeholder:text-ink/30" />
          <button type="submit" className="eyebrow text-gold-600 px-4 hover:text-gold-500 transition-colors">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
