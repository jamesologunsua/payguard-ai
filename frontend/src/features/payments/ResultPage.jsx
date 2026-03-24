import { useLocation, useNavigate } from 'react-router-dom';
import { RiCheckboxCircleLine, RiFlagLine, RiArrowLeftLine } from 'react-icons/ri';
import { Button } from '../../shared/ui/Button';

export default function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const status = state?.status || 'success';
  const reference = state?.reference || 'N/A';
  const amount = state?.amount || '--';
  const accountNumber = state?.account_number || '--';
  const bank = state?.bank || '--';
  const risk = state?.risk;

  const level = risk?.risk_level?.toLowerCase() || 'low';
  const badgeStyles = {
    high: 'bg-rose-100 text-rose-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-emerald-100 text-emerald-700'
  };

  return (
    <div className="page">
      <div className="glass">
        <div className="flex items-center gap-3 font-sora text-lg font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
            <RiCheckboxCircleLine />
          </span>
          PayGuard AI
        </div>
        <span className="status-pill">Transfer {status}</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Transfer Complete</h1>
          <p className="card-subtitle">Reference: {reference}</p>
        </div>

        <div className="grid-2">
          <div className="risk-item">
            <span className="risk-label">Amount</span>
            <span className="risk-value">?{amount}</span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Beneficiary</span>
            <span className="risk-value">{accountNumber}</span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Bank</span>
            <span className="risk-value">{bank}</span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Risk Level</span>
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${badgeStyles[level]}`}
            >
              {risk?.risk_level || 'LOW'}
            </span>
          </div>
        </div>

        <p className="helper mt-4">
          If anything feels wrong, help the community by reporting this account.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <RiArrowLeftLine /> Make another transfer
          </Button>
          <Button variant="soft" onClick={() => navigate('/report')}>
            <RiFlagLine /> Report a scam
          </Button>
        </div>
      </div>
    </div>
  );
}
