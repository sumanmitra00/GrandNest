import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Diamond } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/my-bookings', label: 'My Bookings' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const transparentCapable = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = scrolled || !transparentCapable || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-navy-950/95 backdrop-blur-sm shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <Diamond className="w-5 h-5 text-gold-500 group-hover:rotate-45 transition-transform duration-500" strokeWidth={1.5} />
          <span className="font-display text-2xl tracking-wide text-cream">GrandNest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `eyebrow relative py-2 transition-colors duration-300 ${
                  isActive ? 'text-gold-500' : 'text-cream/80 hover:text-gold-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="eyebrow text-cream/80 hover:text-gold-400 transition-colors">Login</button>
          <button className="eyebrow border border-gold-500 text-gold-500 px-5 py-2.5 hover:bg-gold-500 hover:text-navy-950 transition-colors duration-300">
            Sign Up
          </button>
        </div>

        <button className="md:hidden text-cream" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-950 border-t border-gold-700/30 px-6 py-6 flex flex-col gap-5 animate-fadeUp">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className="eyebrow text-cream/80">{l.label}</NavLink>
          ))}
          <div className="gold-rule my-1" />
          <button className="eyebrow text-left text-cream/80">Login</button>
          <button className="eyebrow border border-gold-500 text-gold-500 px-5 py-2.5 w-fit">Sign Up</button>
        </div>
      )}
    </header>
  );
}
