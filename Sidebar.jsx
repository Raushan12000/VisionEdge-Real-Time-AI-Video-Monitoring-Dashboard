import { LayoutDashboard, Video, BarChart3, ClipboardList, Settings } from 'lucide-react';

const ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cameras', label: 'Cameras', icon: Video },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'events', label: 'Events', icon: ClipboardList },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ page, onNavigate, open }) {
  return (
    <nav className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
      <div className="brand">Vision<span>Edge</span></div>
      {ITEMS.map(({ id, label, icon: Icon }) => (
        <button key={id} className={`nav-btn ${page === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)} aria-current={page === id ? 'page' : undefined}>
          <Icon size={18} aria-hidden="true" /> {label}
        </button>
      ))}
      <p className="muted side-note">Frontend prototype v0.1</p>
    </nav>
  );
}
