import { Button } from '../../shared/ui/Button';

const banks = [
  'Access Bank',
  'Fidelity Bank',
  'First Bank',
  'GTBank',
  'Kuda',
  'Moniepoint',
  'UBA',
  'Zenith Bank',
  'Opay'
];

export default function PaymentForm({ value, onChange, onSubmit, isSubmitting }) {
  const canSubmit = value.account_number && value.bank && value.amount;

  return (
    <form onSubmit={onSubmit} className="grid-2">
      <div className="field">
        <label htmlFor="account_number">Account Number</label>
        <input
          id="account_number"
          name="account_number"
          className="input"
          inputMode="numeric"
          placeholder="0123456789"
          value={value.account_number}
          onChange={onChange}
          maxLength={10}
        />
      </div>

      <div className="field">
        <label htmlFor="bank">Bank</label>
        <select
          id="bank"
          name="bank"
          className="select"
          value={value.bank}
          onChange={onChange}
        >
          <option value="">Select bank</option>
          {banks.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          className="input"
          inputMode="decimal"
          placeholder="5000"
          value={value.amount}
          onChange={onChange}
        />
      </div>

      <div className="field">
        <span className="helper">Instant risk analysis before transfer.</span>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Checking...' : 'Continue'}
          </Button>
        </div>
      </div>
    </form>
  );
}
