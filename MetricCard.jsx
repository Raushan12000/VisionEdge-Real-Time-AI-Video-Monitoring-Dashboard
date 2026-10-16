export default function MetricCard({ icon: Icon, label, value, unit = '' }) {
  return (
    <div className="card metric">
      <span className="ico"><Icon size={20} aria-hidden="true" /></span>
      <div>
        <span className="muted">{label} (simulated)</span>
        <b>{value}{unit}</b>
      </div>
    </div>
  );
}
