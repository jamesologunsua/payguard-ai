const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700',
  ghost: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  danger: 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-700',
  soft: 'bg-orange-100 text-orange-700 hover:bg-orange-200'
};

export function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`.trim()}
      {...props}
    />
  );
}
