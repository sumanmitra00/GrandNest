const img = (seed, w = 900, h = 700) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const face = (n) => `https://i.pravatar.cc/150?img=${n}`;

export const destinations = [
  { name: 'Dubai', country: 'UAE', count: 24, image: img('dest-dubai') },
  { name: 'Paris', country: 'France', count: 31, image: img('dest-paris') },
  { name: 'Maldives', country: 'Maldives', count: 18, image: img('dest-maldives') },
  { name: 'Bali', country: 'Indonesia', count: 27, image: img('dest-bali') },
  { name: 'Switzerland', country: 'Alps', count: 15, image: img('dest-switzerland') },
  { name: 'New York', country: 'USA', count: 22, image: img('dest-newyork') },
];

export const testimonials = [
  { name: 'Elena Marchetti', role: 'Milan, Italy', rating: 5, avatar: face(32), review: 'Every detail at GrandNest felt considered — from the welcome note to the turn-down service. Booking took two minutes and the stay took my breath away.' },
  { name: 'Marcus Webb', role: 'London, UK', rating: 5, avatar: face(14), review: 'I have booked through GrandNest for three anniversaries running. The properties are consistently exceptional and the concierge team never misses a request.' },
  { name: 'Priya Anand', role: 'Singapore', rating: 4.8, avatar: face(47), review: 'The filtering tools made it easy to find exactly the kind of quiet, design-forward hotel I wanted in Kyoto. Checked in feeling like a returning guest.' },
  { name: 'Diego Fernández', role: 'Mexico City, MX', rating: 5, avatar: face(56), review: 'Sol y Piedra was everything the listing promised and more. GrandNest\u2019s booking summary made the pricing completely transparent — no surprises at checkout.' },
];

export const bookingHistory = [
  { id: 'BK-88213', hotel: 'The Aurelia', location: 'Dubai, UAE', dates: 'Aug 12 – Aug 16, 2026', guests: 2, status: 'Upcoming', amount: 2480 },
  { id: 'BK-87960', hotel: 'Chalet Argent', location: 'Zermatt, Switzerland', dates: 'Feb 02 – Feb 07, 2026', guests: 4, status: 'Completed', amount: 3550 },
  { id: 'BK-87411', hotel: 'Maison Vér', location: 'Paris, France', dates: 'Nov 20 – Nov 23, 2025', guests: 2, status: 'Completed', amount: 1620 },
  { id: 'BK-86904', hotel: 'Sawah Retreat', location: 'Ubud, Bali', dates: 'Sep 05 – Sep 10, 2025', guests: 2, status: 'Cancelled', amount: 1700 },
];

export const wishlist = ['gn-003', 'gn-005', 'gn-011'];
export const recentlyViewed = ['gn-002', 'gn-007', 'gn-010', 'gn-006'];
