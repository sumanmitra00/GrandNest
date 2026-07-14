import RatingStars from './RatingStars';
import { Quote } from 'lucide-react';

export default function ReviewCard({ review, index = 0 }) {
  return (
    <div className="bg-navy-950 text-cream p-8 border-t-2 border-gold-500 animate-fadeUp" style={{ animationDelay: `${index * 70}ms` }}>
      <Quote className="w-6 h-6 text-gold-500/50 mb-4" />
      <p className="text-sm leading-relaxed text-cream/70">{review.review}</p>
      <div className="flex items-center gap-3 mt-6">
        <img src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full object-cover border border-gold-500/40" />
        <div>
          <p className="font-display text-base">{review.name}</p>
          <p className="text-xs text-cream/40">{review.role}</p>
        </div>
        <div className="ml-auto"><RatingStars rating={review.rating} /></div>
      </div>
    </div>
  );
}
