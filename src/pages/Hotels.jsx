import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import { hotels, amenitiesList } from '../data/hotels';

const PAGE_SIZE = 9;
const cities = [...new Set(hotels.map(h => h.city))].sort();
const types = [...new Set(hotels.map(h => h.type))].sort();

export default function Hotels() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [city, setCity] = useState('All');
  const [type, setType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minStars, setMinStars] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleAmenity = (a) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = hotels.filter(h => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.country.toLowerCase().includes(q);
      const matchesCity = city === 'All' || h.city === city;
      const matchesType = type === 'All' || h.type === type;
      const matchesPrice = h.price <= maxPrice;
      const matchesStars = h.stars >= minStars;
      const matchesAmenities = amenities.every(a => h.amenities.includes(a));
      return matchesQuery && matchesCity && matchesType && matchesPrice && matchesStars && matchesAmenities;
    });

    switch (sortBy) {
      case 'price-low': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-high': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [query, city, type, maxPrice, minStars, amenities, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setQuery(''); setCity('All'); setType('All'); setMaxPrice(1000); setMinStars(0); setAmenities([]); setSortBy('recommended'); setPage(1);
  };

  return (
    <div className="pt-32 pb-28 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="eyebrow text-gold-600 mb-3">The Collection</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">All Hotels</h1>
        <p className="text-ink/50 mt-3 max-w-lg text-sm">{filtered.length} propert{filtered.length === 1 ? 'y' : 'ies'} matching your search.</p>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 mt-12">
          {/* Filters sidebar */}
          <aside className={`lg:block ${filtersOpen ? 'block' : 'hidden'}`}>
            <div className="bg-navy-950 text-cream p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <p className="eyebrow text-gold-400">Filters</p>
                <button onClick={resetFilters} className="text-xs text-cream/40 hover:text-gold-400 transition-colors">Reset</button>
              </div>

              <div className="mb-6">
                <label className="eyebrow text-cream/40 text-[10px] block mb-2">Search Hotel</label>
                <div className="flex items-center gap-2 border border-cream/15 px-3 py-2 focus-within:border-gold-500">
                  <Search className="w-3.5 h-3.5 text-cream/40" />
                  <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Name or city" className="bg-transparent text-sm outline-none w-full placeholder:text-cream/30" />
                </div>
              </div>

              <div className="mb-6">
                <label className="eyebrow text-cream/40 text-[10px] block mb-2">City</label>
                <select value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }} className="w-full bg-navy-900 border border-cream/15 px-3 py-2 text-sm outline-none focus:border-gold-500">
                  <option>All</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="eyebrow text-cream/40 text-[10px] block mb-2">Hotel Type</label>
                <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className="w-full bg-navy-900 border border-cream/15 px-3 py-2 text-sm outline-none focus:border-gold-500">
                  <option>All</option>
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="eyebrow text-cream/40 text-[10px] block mb-2">Price Range — up to ${maxPrice}</label>
                <input type="range" min="200" max="1000" step="20" value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }} className="w-full accent-gold-500" />
              </div>

              <div className="mb-6">
                <label className="eyebrow text-cream/40 text-[10px] block mb-2">Star Rating</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => { setMinStars(s); setPage(1); }} className={`px-3 py-1.5 text-xs border transition-colors ${minStars === s ? 'border-gold-500 text-gold-500' : 'border-cream/15 text-cream/50 hover:border-cream/40'}`}>
                      {s === 0 ? 'Any' : `${s}+★`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="eyebrow text-cream/40 text-[10px] block mb-3">Amenities</label>
                <div className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-1">
                  {amenitiesList.map(a => (
                    <label key={a} className="flex items-center gap-2.5 text-sm text-cream/70 cursor-pointer">
                      <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)} className="accent-gold-500 w-3.5 h-3.5" />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-8 gap-3">
              <button onClick={() => setFiltersOpen(o => !o)} className="lg:hidden flex items-center gap-2 eyebrow border border-ink/15 px-4 py-2.5 text-ink/70">
                {filtersOpen ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />} Filters
              </button>
              <div className="ml-auto flex items-center gap-3">
                <span className="eyebrow text-ink/40 hidden sm:inline">Sort By</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-gold-500 bg-white">
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-24 border border-ink/10">
                <p className="font-display text-2xl text-ink">No hotels match those filters</p>
                <button onClick={resetFilters} className="eyebrow text-gold-600 mt-4 border-b border-gold-500 pb-1">Reset filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((h, i) => <HotelCard hotel={h} key={h.id} index={i} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-10 h-10 flex items-center justify-center border border-ink/15 disabled:opacity-30 hover:border-gold-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 text-sm border transition-colors ${page === i + 1 ? 'bg-gold-500 border-gold-500 text-navy-950' : 'border-ink/15 hover:border-gold-500'}`}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="w-10 h-10 flex items-center justify-center border border-ink/15 disabled:opacity-30 hover:border-gold-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
