import { Mail, Phone, MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  return (
    <div className="pt-32 pb-28 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeading eyebrow="Get in Touch" title="Contact GrandNest" description="Questions about a booking or a property? Our concierge team responds within the hour." />
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 -mt-4">
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'concierge@grandnest.example' },
              { icon: Phone, label: 'Phone', value: '+1 (800) 555-0192' },
              { icon: MapPin, label: 'Headquarters', value: '1 Meridian Plaza, New York, NY' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-4 border border-ink/10 px-6 py-5">
                <c.icon className="w-5 h-5 text-gold-600" strokeWidth={1.5} />
                <div>
                  <p className="eyebrow text-ink/40">{c.label}</p>
                  <p className="text-ink mt-1">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <input required placeholder="Full Name" className="w-full border border-ink/15 px-4 py-3.5 text-sm outline-none focus:border-gold-500 bg-white" />
            <input required type="email" placeholder="Email Address" className="w-full border border-ink/15 px-4 py-3.5 text-sm outline-none focus:border-gold-500 bg-white" />
            <textarea required rows={5} placeholder="Message" className="w-full border border-ink/15 px-4 py-3.5 text-sm outline-none focus:border-gold-500 bg-white" />
            <button type="submit" className="eyebrow bg-navy-950 text-cream px-8 py-4 hover:bg-navy-800 transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
