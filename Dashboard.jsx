import { Video, Wifi, WifiOff, Gauge, Timer, Target, Cpu, HardDrive } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import CameraGrid from '../components/CameraGrid';
import SelectedCamera from '../components/SelectedCamera';

export default function Dashboard({ cams, metrics, selected, ...grid }) {
  const online = cams.filter((c) => c.online);
  const avg = (k) => (online.length ? Math.round(online.reduce((a, c) => a + (metrics.stats[c.id]?.[k] || 0), 0) / online.length) : 0);
  const objects = online.reduce((a, c) => a + (metrics.stats[c.id]?.objects || 0), 0);

  return (
    <>
      <h1>Dashboard overview</h1>
      <div className="grid metrics">
        <MetricCard icon={Video} label="Total cameras" value={cams.length} />
        <MetricCard icon={Wifi} label="Online cameras" value={online.length} />
        <MetricCard icon={WifiOff} label="Offline cameras" value={cams.length - online.length} />
        <MetricCard icon={Gauge} label="Current FPS" value={avg('fps')} />
        <MetricCard icon={Timer} label="Avg latency" value={avg('latency')} unit=" ms" />
        <MetricCard icon={Target} label="Detected objects" value={objects} />
        <MetricCard icon={Cpu} label="GPU utilization" value={metrics.gpu} unit="%" />
        <MetricCard icon={HardDrive} label="Memory utilization" value={metrics.mem} unit="%" />
      </div>
      <CameraGrid cams={cams} stats={metrics.stats} {...grid} />
      <SelectedCamera cam={selected} stat={selected && metrics.stats[selected.id]} lastUpdate={metrics.lastUpdate} />
    </>
  );
}
