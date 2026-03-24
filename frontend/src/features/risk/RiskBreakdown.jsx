export default function RiskBreakdown({ items = [] }) {
  return (
    <div className="grid-2">
      {items.map((item) => (
        <div key={item.label} className="risk-item">
          <span className="risk-label">{item.label}</span>
          <span className="risk-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
