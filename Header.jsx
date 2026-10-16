import { useState, useEffect } from 'react';
import { RefreshCw, UserCircle, Menu } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function Header({ mode, onRefresh, onMenu }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const badge = {
    demo: <StatusBadge status="demo" label="Demo Mode · Simulated Data" />,
    live: <StatusBadge status="online" label="Backend connected" />,
    error: <StatusBadge status="offline" label="Backend unreachable" />,
  }[mode];

  return (
    <header className="header">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Open menu"><Menu size={18} /></button>
      <strong>VisionEdge</strong>
      {badge}
      <span className="spacer" />
      <span className="muted">{now.toLocaleDateString()} {now.toLocaleTimeString()}</span>
      <button className="icon-btn" onClick={onRefresh}><RefreshCw size={16} aria-hidden="true" /> Refresh</button>
      <button className="icon-btn" aria-label="User profile"><UserCircle size={20} /></button>
    </header>
  );
}
