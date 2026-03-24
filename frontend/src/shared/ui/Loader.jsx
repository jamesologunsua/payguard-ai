export function Loader({ label = 'Loading...' }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-100 border-t-brand-600" />
      {label}
    </span>
  );
}
