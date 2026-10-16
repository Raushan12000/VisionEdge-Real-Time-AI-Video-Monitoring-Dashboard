import { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Cameras from './pages/Cameras';
import Analytics from './pages/Analytics';
import Events from './pages/Events';
import Settings from './pages/Settings';
import useMetrics from './hooks/useMetrics';
import { initialCameras } from './data/mockData';
import { getHealth, API_BASE } from './services/api';

const DEFAULTS = { refreshSec: 2, demoMode: true, showStats: true, notify: true };
const loadSettings = () => {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('ve-settings')) }; }
  catch { return DEFAULTS; }
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const [cameras, setCameras] = useState(initialCameras);
  const [selectedId, setSelectedId] = useState(1);
  const [live, setLive] = useState({ state: 'idle', error: '' }); // laptop webcam state
  const [settings, setSettings] = useState(loadSettings);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [backend, setBackend] = useState({ ok: false, error: '' });

  // Work out each camera's status from its settings and stream state
  const cams = useMemo(() => cameras.map((c) => {
    let status = 'online';
    if (!c.enabled) status = 'disabled';
    else if (c.type === 'cctv') status = 'offline'; // no backend stream yet
    else if (c.type === 'webcam') status = live.state === 'live' ? 'online' : live.state === 'error' ? 'offline' : 'connecting';
    return { ...c, status, online: status === 'online' };
  }), [cameras, live]);

  const metrics = useMetrics(cams, settings.refreshSec * 1000);
  const onWebcamState = useCallback((state, error) => setLive({ state, error }), []);

  const checkBackend = useCallback(async () => {
    if (settings.demoMode) { setBackend({ ok: false, error: '' }); return; }
    try { await getHealth(); setBackend({ ok: true, error: '' }); }
    catch { setBackend({ ok: false, error: `Backend not reachable at ${API_BASE}. Showing simulated data instead.` }); }
  }, [settings.demoMode]);

  useEffect(() => { checkBackend(); }, [checkBackend]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);
  useEffect(() => { try { localStorage.setItem('ve-settings', JSON.stringify(settings)); } catch { /* storage blocked */ } }, [settings]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleCamera = (id) => {
    const cam = cameras.find((c) => c.id === id);
    setCameras((cs) => cs.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)));
    if (settings.notify) setToast(`${cam.name} (Camera ${id}) ${cam.enabled ? 'disabled' : 'enabled'}`);
  };
  const changeSetting = (key, value) => setSettings((s) => ({ ...s, [key]: value }));
  const refresh = () => { metrics.refresh(); checkBackend(); };

  const mode = settings.demoMode ? 'demo' : backend.ok ? 'live' : 'error';
  const selected = cams.find((c) => c.id === selectedId);
  const shared = { cams, metrics, selected, selectedId, settings, onSelect: setSelectedId, onToggle: toggleCamera, onWebcamState };

  let content = null;
  if (page === 'dashboard') content = <Dashboard {...shared} />;
  if (page === 'cameras') content = <Cameras {...shared} />;
  if (page === 'analytics') content = <Analytics metrics={metrics} cams={cams} />;
  if (page === 'events') content = <Events />;
  if (page === 'settings') content = <Settings settings={settings} onChange={changeSetting} onReset={() => setSettings(DEFAULTS)} />;

  return (
    <div className="app">
      <Sidebar page={page} open={navOpen} onNavigate={(p) => { setPage(p); setNavOpen(false); }} />
      <div className="main">
        <Header mode={mode} onRefresh={refresh} onMenu={() => setNavOpen((o) => !o)} />
        {backend.error && <div className="banner" role="alert">{backend.error}</div>}
        <main className="content">{loading ? <p className="state">Loading dashboard…</p> : content}</main>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
