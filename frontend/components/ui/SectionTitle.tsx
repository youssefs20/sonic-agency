interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      {label && (
        <span className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3 block">
          {label}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">{title}</h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
