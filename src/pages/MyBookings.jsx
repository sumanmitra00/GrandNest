import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, X as XIcon, Download, Moon, Bell, LogOut, Crown } from 'lucide-react';
import { bookingHistory, wishlist, recentlyViewed } from '../data/misc';
import { findHotel } from '../data/hotels';
import HotelCard from '../components/HotelCard';
import SectionHeading from '../components/SectionHeading';

const statusStyle = {
  Upcoming: 'text-gold-600 border-gold-500/40 bg-gold-50',
  Completed: 'text-emerald-700 border-emerald-500/30 bg-emerald-50',
  Cancelled: 'text-ink/40 border-ink/15 bg-ink/5',
};

export default function MyBookings() {
  const [bookings, setBookings] = useState(bookingHistory);
  const [tab, setTab] = useState('overview');
  const [toggles, setToggles] = useState({ notifications: true, darkMode: false });

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  return (
    <div className="pt-32 pb-28 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10">
          {/* Profile card */}
          <aside>
            <div className="keycard-edge bg-navy-950 text-cream p-7 sticky top-28">
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-gold-500" />
                <div>
                  <h2 className="font-display text-xl">John Whitfield</h2>
                  <p className="text-xs text-cream/40">john.w@email.com</p>
                </div>
              </div>
              <div className="gold-rule my-6" />
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-4 h-4 text-gold-500" />
                <span className="eyebrow text-gold-400">Gold Member</span>
              </div>
              <div className="flex items-center justify-between text-sm text-cream/60 mb-2">
                <span>Phone</span><span className="text-cream">+1 555 214 8890</span>
              </div>
              <div className="flex items-center justify-between text-sm text-cream/60 mb-6">
                <span>Reward Points</span><span className="text-cream">4,280 pts</span>
              </div>

              <nav className="flex flex-col gap-1">
                {[
                  { id: 'overview', label: 'Booking History' },
                  { id: 'wishlist', label: 'Wishlist' },
                  { id: 'activity', label: 'Recent Activity' },
                  { id: 'settings', label: 'Account Settings' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`text-left eyebrow px-3 py-2.5 transition-colors ${tab === t.id ? 'bg-gold-500 text-navy-950' : 'text-cream/60 hover:bg-navy-900'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div>
            {tab === 'overview' && (
              <div>
                <SectionHeading eyebrow="Your Trips" title="Booking History" />
                <div className="overflow-x-auto -mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left eyebrow text-ink/40 border-b border-ink/10">
                        <th className="py-3 pr-4">Booking ID</th>
                        <th className="py-3 pr-4">Hotel</th>
                        <th className="py-3 pr-4">Dates</th>
                        <th className="py-3 pr-4">Guests</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3 pr-4">Amount</th>
                        <th className="py-3 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-b border-ink/5 align-top">
                          <td className="py-4 pr-4 font-mono text-xs text-ink/50">{b.id}</td>
                          <td className="py-4 pr-4">
                            <p className="text-ink font-medium">{b.hotel}</p>
                            <p className="text-xs text-ink/40">{b.location}</p>
                          </td>
                          <td className="py-4 pr-4 text-ink/60">{b.dates}</td>
                          <td className="py-4 pr-4 text-ink/60">{b.guests}</td>
                          <td className="py-4 pr-4">
                            <span className={`text-xs border px-2.5 py-1 ${statusStyle[b.status]}`}>{b.status}</span>
                          </td>
                          <td className="py-4 pr-4 text-ink font-medium">${b.amount}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3 text-ink/40">
                              <button title="View" className="hover:text-gold-600"><Eye className="w-4 h-4" /></button>
                              <button title="Download Invoice" className="hover:text-gold-600"><Download className="w-4 h-4" /></button>
                              {b.status === 'Upcoming' && (
                                <button title="Cancel" onClick={() => cancelBooking(b.id)} className="hover:text-red-500"><XIcon className="w-4 h-4" /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'wishlist' && (
              <div>
                <SectionHeading eyebrow="Saved for Later" title="Wishlist" />
                <div className="grid sm:grid-cols-2 gap-6 -mt-4">
                  {wishlist.map((id, i) => {
                    const h = findHotel(id);
                    return h ? <HotelCard hotel={h} key={id} index={i} /> : null;
                  })}
                </div>
              </div>
            )}

            {tab === 'activity' && (
              <div>
                <SectionHeading eyebrow="Lately" title="Recent Activity" />
                <p className="eyebrow text-ink/40 mb-4 -mt-6">Recently Viewed</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentlyViewed.map((id, i) => {
                    const h = findHotel(id);
                    return h ? <HotelCard hotel={h} key={id} index={i} /> : null;
                  })}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="max-w-lg">
                <SectionHeading eyebrow="Preferences" title="Account Settings" />
                <div className="-mt-4 space-y-5">
                  <button className="w-full text-left border border-ink/10 px-5 py-4 hover:border-gold-500 transition-colors flex items-center justify-between">
                    <span className="text-sm text-ink/70">Edit Profile</span>
                    <span className="eyebrow text-gold-600">Edit</span>
                  </button>
                  <button className="w-full text-left border border-ink/10 px-5 py-4 hover:border-gold-500 transition-colors flex items-center justify-between">
                    <span className="text-sm text-ink/70">Change Password</span>
                    <span className="eyebrow text-gold-600">Update</span>
                  </button>
                  <div className="flex items-center justify-between border border-ink/10 px-5 py-4">
                    <span className="flex items-center gap-3 text-sm text-ink/70"><Bell className="w-4 h-4" /> Notifications</span>
                    <Toggle checked={toggles.notifications} onChange={() => setToggles(t => ({ ...t, notifications: !t.notifications }))} />
                  </div>
                  <div className="flex items-center justify-between border border-ink/10 px-5 py-4">
                    <span className="flex items-center gap-3 text-sm text-ink/70"><Moon className="w-4 h-4" /> Dark Mode</span>
                    <Toggle checked={toggles.darkMode} onChange={() => setToggles(t => ({ ...t, darkMode: !t.darkMode }))} />
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 eyebrow border border-red-300 text-red-600 px-5 py-4 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-gold-500' : 'bg-ink/15'}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${checked ? 'left-5' : 'left-0.5'}`} />
    </button>
  );
}
