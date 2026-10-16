import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { availability } from '../data/mockData';

function ChartCard({ title, children }) {
  return (
    <section className="card">
      <h2>{title} <span className="muted">(simulated)</span></h2>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </section>
  );
}

const axes = [
  <CartesianGrid key="g" stroke="#22325a" strokeDasharray="3 3" />,
  <XAxis key="x" dataKey="time" stroke="#8d9bbd" fontSize={11} />,
  <YAxis key="y" stroke="#8d9bbd" fontSize={11} />,
  <Tooltip key="t" contentStyle={{ background: '#111c36', border: '1px solid #22325a' }} />,
];

export default function Analytics({ metrics, cams }) {
  const h = metrics.history;
  const avail = cams.map((c) => ({ time: `Cam ${c.id}`, availability: availability[c.id] }));
  if (h.length < 2) return <p className="state">Collecting data… charts appear after a few updates.</p>;

  return (
    <>
      <h1>Analytics</h1>
      <div className="grid charts">
        <ChartCard title="FPS over time"><LineChart data={h}>{axes}<Line dataKey="fps" stroke="#3b82f6" dot={false} /></LineChart></ChartCard>
        <ChartCard title="Detected objects over time"><LineChart data={h}>{axes}<Line dataKey="objects" stroke="#22c55e" dot={false} /></LineChart></ChartCard>
        <ChartCard title="Latency over time (ms)"><LineChart data={h}>{axes}<Line dataKey="latency" stroke="#f59e0b" dot={false} /></LineChart></ChartCard>
        <ChartCard title="Camera availability, last 24h (%)"><BarChart data={avail}>{axes}<Bar dataKey="availability" fill="#3b82f6" /></BarChart></ChartCard>
      </div>
    </>
  );
}
