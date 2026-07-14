import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(rating);
        return <Star key={i} width={size} height={size} className={filled ? 'fill-gold-500 text-gold-500' : 'text-cream/20'} strokeWidth={1} />;
      })}
    </div>
  );
}
