const LABELS = { online: 'Online', offline: 'Offline', disabled: 'Disabled', connecting: 'Connecting', demo: 'Demo Mode' };

export default function StatusBadge({ status, label }) {
  return <span className={`badge b-${status}`}>{label || LABELS[status]}</span>;
}
