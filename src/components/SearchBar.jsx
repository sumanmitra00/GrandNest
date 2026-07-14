import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export default function SearchBar({ variant = 'hero' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: '', checkin: '', checkout: '', guests: '2 Guests' });

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.destination) params.set('q', form.destination);
    navigate(`/hotels?${params.toString()}`);
  };

  const wrap = variant === 'hero'
    ? 'bg-navy-950/80 backdrop-blur-md border border-gold-500/30'
    : 'bg-navy-950 border border-gold-700/30';

  return (
    <form onSubmit={submit} className={`${wrap} p-3 md:p-4 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-3`}>
      <label className="flex items-center gap-3 px-3 py-2 border border-cream/10 focus-within:border-gold-500 transition-colors">
        <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
        <div className="flex-1">
          <span className="block eyebrow text-cream/40 text-[9px] mb-0.5">Destination</span>
          <input
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            placeholder="Where to?"
            className="bg-transparent text-cream text-sm w-full outline-none placeholder:text-cream/30"
          />
        </div>
      </label>

      <label className="flex items-center gap-3 px-3 py-2 border border-cream/10 focus-within:border-gold-500 transition-colors">
        <Calendar className="w-4 h-4 text-gold-500 shrink-0" />
        <div className="flex-1">
          <span className="block eyebrow text-cream/40 text-[9px] mb-0.5">Check-in</span>
          <input
            type="date"
            value={form.checkin}
            onChange={(e) => setForm({ ...form, checkin: e.target.value })}
            className="bg-transparent text-cream text-sm w-full outline-none [color-scheme:dark]"
          />
        </div>
      </label>

      <label className="flex items-center gap-3 px-3 py-2 border border-cream/10 focus-within:border-gold-500 transition-colors">
        <Calendar className="w-4 h-4 text-gold-500 shrink-0" />
        <div className="flex-1">
          <span className="block eyebrow text-cream/40 text-[9px] mb-0.5">Check-out</span>
          <input
            type="date"
            value={form.checkout}
            onChange={(e) => setForm({ ...form, checkout: e.target.value })}
            className="bg-transparent text-cream text-sm w-full outline-none [color-scheme:dark]"
          />
        </div>
      </label>

      <label className="flex items-center gap-3 px-3 py-2 border border-cream/10 focus-within:border-gold-500 transition-colors">
        <Users className="w-4 h-4 text-gold-500 shrink-0" />
        <div className="flex-1">
          <span className="block eyebrow text-cream/40 text-[9px] mb-0.5">Guests</span>
          <select
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="bg-navy-950 text-cream text-sm w-full outline-none"
          >
            {['1 Guest', '2 Guests', '3 Guests', '4+ Guests'].map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
      </label>

      <button type="submit" className="eyebrow bg-gold-500 text-navy-950 px-6 py-3 hover:bg-gold-400 transition-colors flex items-center justify-center gap-2">
        <Search className="w-4 h-4" /> <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
