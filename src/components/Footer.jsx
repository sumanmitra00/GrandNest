import { Link } from 'react-router-dom';
import { Diamond, Mail } from 'lucide-react';

const socialIcons = [
  { label: 'Instagram', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
  { label: 'Facebook', path: 'M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.25-1.5 1.6-1.5H16.5V4.3C16.2 4.26 15.2 4.17 14 4.17c-2.4 0-4 1.46-4 4.14V10.5H7.5v3H10V21h3.5z' },
  { label: 'Twitter', path: 'M20.5 6.2c-.6.27-1.25.45-1.93.53a3.4 3.4 0 0 0 1.48-1.87c-.65.39-1.37.66-2.14.82a3.37 3.37 0 0 0-5.74 3.07 9.56 9.56 0 0 1-6.94-3.52 3.36 3.36 0 0 0 1.04 4.5c-.55-.02-1.07-.17-1.52-.42v.04a3.37 3.37 0 0 0 2.7 3.3c-.5.14-1.03.16-1.5.06a3.38 3.38 0 0 0 3.15 2.34A6.77 6.77 0 0 1 3 16.6a9.55 9.55 0 0 0 5.17 1.51c6.2 0 9.6-5.14 9.6-9.6l-.01-.44c.66-.47 1.23-1.06 1.68-1.73l.06-.14z' },
  { label: 'LinkedIn', path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9.5 9H13v1.8h.05c.5-.9 1.7-1.85 3.5-1.85 3.75 0 4.45 2.4 4.45 5.5V21h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.65V21h-4z' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-cream/70 pt-20 pb-8 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-4 gap-12 pb-14">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Diamond className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
              <span className="font-display text-2xl text-cream">GrandNest</span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/50 max-w-xs">
              Curated stays at the world's most considered hotels — booked in minutes, remembered for years.
            </p>
            <div className="flex gap-4 mt-6">
              {socialIcons.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 border border-cream/15 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold-500 mb-5">Company</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About</Link></li>
              <li><Link to="/hotels" className="hover:text-gold-400 transition-colors">Hotels</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold-500 mb-5">Support</p>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Cancellation Options</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">24/7 Concierge</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Trust &amp; Safety</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold-500 mb-5">Stay in the know</p>
            <p className="text-sm text-cream/50 mb-4">New properties, private rates, and destination guides.</p>
            <form className="flex border-b border-cream/20 focus-within:border-gold-500 transition-colors" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Email address" className="bg-transparent py-2 text-sm flex-1 outline-none placeholder:text-cream/30" />
              <button type="submit" aria-label="Subscribe"><Mail className="w-4 h-4 text-gold-500" /></button>
            </form>
          </div>
        </div>

        <div className="gold-rule" />

        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/40">
          <p>&copy; {new Date().getFullYear()} GrandNest. All rights reserved.</p>
          <p>Designed for a portfolio project — dummy data throughout.</p>
        </div>
      </div>
    </footer>
  );
}
