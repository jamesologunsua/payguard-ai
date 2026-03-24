import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiShieldCheckLine,
  RiPulseLine,
  RiStackLine,
  RiNodeTree,
  RiAlarmWarningLine,
  RiUserHeartLine
} from 'react-icons/ri';
import PaymentForm from './PaymentForm';
import RiskPopup from '../risk/RiskPopup';
import { checkRisk } from '../risk/api';
import { pay } from './api';
import { Loader } from '../../shared/ui/Loader';

const initialForm = {
  account_number: '',
  bank: '',
  amount: ''
};

export default function PaymentPage() {
  const [form, setForm] = useState(initialForm);
  const [risk, setRisk] = useState(null);
  const [checking, setChecking] = useState(false);
  const [proceeding, setProceeding] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setChecking(true);

    try {
      const data = await checkRisk(form);
      setRisk(data);
      setPopupOpen(true);
    } catch (err) {
      setError(err.message || 'Unable to run risk check.');
    } finally {
      setChecking(false);
    }
  };

  const handleCancel = () => {
    setPopupOpen(false);
  };

  const handleProceed = async () => {
    setProceeding(true);
    setError('');

    try {
      const payment = await pay(form);
      setPopupOpen(false);
      navigate('/result', {
        state: {
          status: payment.status,
          reference: payment.reference,
          amount: form.amount,
          account_number: form.account_number,
          bank: form.bank,
          risk
        }
      });
    } catch (err) {
      setError(err.message || 'Payment failed.');
    } finally {
      setProceeding(false);
    }
  };

  const handleReport = () => {
    const params = new URLSearchParams({
      account_number: form.account_number,
      bank: form.bank
    }).toString();
    navigate(`/report?${params}`);
  };

  return (
    <div className="page">
      <div className="glass">
        <div className="flex items-center gap-3 font-sora text-lg font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
            <RiShieldCheckLine />
          </span>
          PayGuard AI
        </div>
        <span className="status-pill">
          <RiPulseLine /> Live risk screening
        </span>
      </div>

      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Send Money</h1>
          <p className="card-subtitle">
            Run a fraud pulse before every transfer to protect your users.
          </p>
        </div>

        {error && <div className="error">{error}</div>}
        {checking && (
          <div className="notice flex items-center gap-3">
            <Loader label="Analyzing risk signals..." />
          </div>
        )}

        <PaymentForm value={form} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={checking} />
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Why PayGuard?</h2>
          <p className="card-subtitle">
            We cross-check reports, behavior, and network signals before funds leave the account.
          </p>
        </div>
        <div className="grid-2">
          <div className="risk-item">
            <span className="risk-label">Reports</span>
            <span className="risk-value flex items-center gap-2">
              <RiStackLine /> Community scam intelligence
            </span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Network</span>
            <span className="risk-value flex items-center gap-2">
              <RiNodeTree /> Linked scam clusters
            </span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Trend</span>
            <span className="risk-value flex items-center gap-2">
              <RiAlarmWarningLine /> Real-time spikes
            </span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Action</span>
            <span className="risk-value flex items-center gap-2">
              <RiUserHeartLine /> User stays in control
            </span>
          </div>
        </div>
      </div>

      <RiskPopup
        open={popupOpen}
        risk={risk}
        onCancel={handleCancel}
        onProceed={handleProceed}
        onReport={handleReport}
        isProceeding={proceeding}
      />
    </div>
  );
}
