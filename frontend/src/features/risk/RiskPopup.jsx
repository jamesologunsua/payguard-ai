import { RiAlertFill, RiFlagLine } from 'react-icons/ri';
import { Button } from '../../shared/ui/Button';
import { Loader } from '../../shared/ui/Loader';
import RiskBreakdown from './RiskBreakdown';

export default function RiskPopup({
  open,
  risk,
  onCancel,
  onProceed,
  onReport,
  isProceeding
}) {
  if (!open || !risk) return null;

  const level = risk.risk_level?.toLowerCase() || 'low';
  const badgeStyles = {
    high: 'bg-rose-100 text-rose-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-emerald-100 text-emerald-700'
  };

  const items = [
    { label: 'Reports', value: risk.reports ?? 0 },
    { label: 'Similar Cases', value: risk.similar_cases ?? 0 },
    { label: 'Network', value: risk.network ?? 'NO' },
    { label: 'Trend', value: risk.trend ?? 'CALM' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/30 bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <RiAlertFill />
            </span>
            <h2 className="font-sora text-xl font-semibold text-slate-900">Transaction Check</h2>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${badgeStyles[level]}`}
          >
            {risk.risk_level}
          </span>
        </div>

        <div className="text-3xl font-semibold text-slate-900">Risk Score: {risk.score}</div>
        <p className="card-subtitle mt-2">
          We found signals linked to reported scams on this account.
        </p>

        <div className="mt-5">
          <RiskBreakdown items={items} />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button variant="ghost" onClick={onReport}>
            <RiFlagLine /> Report this account
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onProceed} disabled={isProceeding}>
            {isProceeding ? <Loader label="Processing..." /> : 'Proceed Anyway'}
          </Button>
        </div>
      </div>
    </div>
  );
}
