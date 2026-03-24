import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RiFlag2Line, RiArrowLeftLine } from 'react-icons/ri';
import { Button } from '../../shared/ui/Button';
import { submitReport } from './api';
import { Loader } from '../../shared/ui/Loader';

const scamTypes = ['Marketplace', 'Investment', 'Fake Vendor', 'Impersonation', 'Other'];

export default function ReportPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialForm = useMemo(
    () => ({
      account_number: searchParams.get('account_number') || '',
      bank_name: searchParams.get('bank') || '',
      scam_type: scamTypes[0],
      description: ''
    }),
    [searchParams]
  );

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await submitReport(form);
      setSuccess('Report submitted. Thanks for helping protect other users.');
      setForm((prev) => ({ ...prev, description: '' }));
    } catch (err) {
      setError(err.message || 'Unable to submit report.');
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = form.account_number && form.bank_name && form.scam_type;

  return (
    <div className="page">
      <div className="glass">
        <div className="flex items-center gap-3 font-sora text-lg font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <RiFlag2Line />
          </span>
          PayGuard AI
        </div>
        <span className="status-pill">Community reports</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Report a Scam</h1>
          <p className="card-subtitle">
            Every report strengthens PayGuard AI and protects the next user.
          </p>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="notice">{success}</div>}

        <form onSubmit={handleSubmit} className="grid-2">
          <div className="field">
            <label htmlFor="account_number">Account Number</label>
            <input
              id="account_number"
              name="account_number"
              className="input"
              inputMode="numeric"
              value={form.account_number}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="bank_name">Bank Name</label>
            <input
              id="bank_name"
              name="bank_name"
              className="input"
              value={form.bank_name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="scam_type">Scam Type</label>
            <select
              id="scam_type"
              name="scam_type"
              className="select"
              value={form.scam_type}
              onChange={handleChange}
            >
              {scamTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              name="description"
              className="textarea"
              value={form.description}
              onChange={handleChange}
              placeholder="Short summary or evidence..."
            />
          </div>

          <div className="field">
            <span className="helper">Submissions are timestamped for trend detection.</span>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={!canSubmit || submitting}>
                {submitting ? <Loader label="Submitting..." /> : 'Submit Report'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/')}>
                <RiArrowLeftLine /> Back to payments
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
