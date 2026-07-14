export default function SectionHeading({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-12`}>
      <p className={`eyebrow ${light ? 'text-gold-400' : 'text-gold-600'} mb-3`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl md:text-4xl text-balance ${light ? 'text-cream' : 'text-ink'}`}>{title}</h2>
      {description && <p className={`mt-4 text-sm leading-relaxed ${light ? 'text-cream/50' : 'text-ink/50'}`}>{description}</p>}
    </div>
  );
}
