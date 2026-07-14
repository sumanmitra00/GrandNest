import { useMemo, useState } from 'react';
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { findHotel, roomTypes } from '../data/hotels';

const countries = ['United States', 'United Kingdom', 'India', 'UAE', 'France', 'Germany', 'Australia', 'Japan', 'Other'];
const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'];

export default function Booking() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const hotel = findHotel(id);
  const rooms = useMemo(() => hotel ? roomTypes(hotel.price) : [], [hotel]);
  const preselect = params.get('room');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', country: 'United States',
    guests: 2, roomType: preselect || rooms[0]?.id || 'suite', checkin: '', checkout: '',
    requests: '', coupon: '', payment: 'Credit Card',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  if (!hotel) return <Navigate to="/hotels" replace />;

  const room = rooms.find(r => r.id === form.roomType) || rooms[0];
  const nights = form.checkin && form.checkout
    ? Math.max(1, Math.round((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
    : 1;
  const subtotal = room.price * nights;
  const discount = form.coupon.trim().toUpperCase() === 'GRAND10' ? Math.round(subtotal * 0.1) : 0;
  const taxes = Math.round((subtotal - discount) * 0.12);
  const total = subtotal - discount + taxes;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[0-9+\-\s]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.checkin) e.checkin = 'Select a check-in date';
    if (!form.checkout) e.checkout = 'Select a check-out date';
    if (form.checkin && form.checkout && new Date(form.checkout) <= new Date(form.checkin)) {
      e.checkout = 'Check-out must be after check-in';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) setSuccess(true);
  };

  if (success) {
    return (
      <div className="pt-32 pb-28 min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center animate-fadeUp">
          <CheckCircle2 className="w-14 h-14 text-gold-500 mx-auto" strokeWidth={1.2} />
          <p className="eyebrow text-gold-600 mt-6">Confirmed</p>
          <h1 className="font-display text-3xl text-ink mt-2">Your Booking Is Set</h1>
          <p className="text-ink/50 mt-4 text-sm leading-relaxed">
            A confirmation for <strong className="text-ink">{hotel.name}</strong> has been sent to {form.email}.
            Booking reference <span className="font-mono text-gold-600">GN-{hotel.id.slice(-3)}{Math.floor(Math.random() * 9000 + 1000)}</span>.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/my-bookings" className="eyebrow bg-navy-950 text-cream px-6 py-3.5 hover:bg-navy-800 transition-colors">View My Bookings</Link>
            <Link to="/hotels" className="eyebrow border border-ink/15 px-6 py-3.5 hover:border-gold-500 transition-colors">Browse More</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-28 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="eyebrow text-gold-600 mb-3">Confirm Your Stay</p>
        <h1 className="font-display text-4xl text-ink">Complete Booking</h1>
        <p className="text-ink/50 mt-2 text-sm">Booking {hotel.name} — {hotel.city}, {hotel.country}</p>

        <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_380px] gap-12 mt-12">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl text-ink mb-5">Guest Details</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First Name" error={errors.firstName}>
                  <input value={form.firstName} onChange={set('firstName')} className={inputCls(errors.firstName)} />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input value={form.lastName} onChange={set('lastName')} className={inputCls(errors.lastName)} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={form.email} onChange={set('email')} className={inputCls(errors.email)} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" className={inputCls(errors.phone)} />
                </Field>
                <Field label="Country">
                  <select value={form.country} onChange={set('country')} className={inputCls()}>
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Guests">
                  <input type="number" min="1" max="10" value={form.guests} onChange={set('guests')} className={inputCls()} />
                </Field>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl text-ink mb-5">Stay Details</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Room Type">
                  <select value={form.roomType} onChange={set('roomType')} className={inputCls()}>
                    {rooms.map(r => <option key={r.id} value={r.id}>{r.name} — ${r.price}/night</option>)}
                  </select>
                </Field>
                <div />
                <Field label="Check-in" error={errors.checkin}>
                  <input type="date" value={form.checkin} onChange={set('checkin')} className={inputCls(errors.checkin)} />
                </Field>
                <Field label="Check-out" error={errors.checkout}>
                  <input type="date" value={form.checkout} onChange={set('checkout')} className={inputCls(errors.checkout)} />
                </Field>
              </div>
              <Field label="Special Requests" className="mt-5">
                <textarea rows={3} value={form.requests} onChange={set('requests')} placeholder="Late check-in, high floor, allergies..." className={inputCls()} />
              </Field>
            </div>

            <div>
              <h2 className="font-display text-xl text-ink mb-5">Payment</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Coupon Code">
                  <input value={form.coupon} onChange={set('coupon')} placeholder="Try GRAND10" className={inputCls()} />
                </Field>
                <Field label="Payment Method">
                  <select value={form.payment} onChange={set('payment')} className={inputCls()}>
                    {paymentMethods.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside>
            <div className="keycard-edge bg-navy-950 text-cream p-7 sticky top-28">
              <p className="eyebrow text-gold-400 mb-1">Booking Summary</p>
              <h3 className="font-display text-xl mt-1">{hotel.name}</h3>
              <p className="text-xs text-cream/40 mt-1">{room?.name} · {nights} night{nights > 1 ? 's' : ''}</p>
              <div className="gold-rule my-6" />
              <Row label="Room Rate" value={`$${room?.price} × ${nights}`} amount={subtotal} />
              <Row label="Discount" amount={-discount} negative={discount > 0} />
              <Row label="Taxes & Fees (12%)" amount={taxes} />
              <div className="gold-rule my-4" />
              <div className="flex items-center justify-between">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-2xl text-gold-500">${total}</span>
              </div>

              <button type="submit" className="w-full eyebrow bg-gold-500 text-navy-950 py-4 mt-8 hover:bg-gold-400 transition-colors">
                Confirm Booking
              </button>
              <Link to={`/hotels/${hotel.id}`} className="block text-center eyebrow text-cream/40 py-3 hover:text-cream/70 transition-colors">
                Cancel
              </Link>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow text-ink/40 text-[10px] block mb-2">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600 mt-1.5 block">{error}</span>}
    </label>
  );
}

function inputCls(error) {
  return `w-full border ${error ? 'border-red-400' : 'border-ink/15'} px-3.5 py-3 text-sm outline-none focus:border-gold-500 transition-colors bg-white`;
}

function Row({ label, value, amount, negative }) {
  return (
    <div className="flex items-center justify-between text-sm mb-3">
      <span className="text-cream/50">{label} {value && <span className="text-cream/30">({value})</span>}</span>
      <span className={negative ? 'text-gold-400' : 'text-cream/80'}>{negative ? '-' : ''}${Math.abs(amount)}</span>
    </div>
  );
}
