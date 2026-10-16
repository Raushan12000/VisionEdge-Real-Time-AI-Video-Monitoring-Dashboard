import StatusBadge from './StatusBadge';

export default function SelectedCamera({ cam, stat = {}, lastUpdate }) {
  if (!cam) return <section className="card"><p className="state">Select a camera to see its details.</p></section>;
  return (
    <section className="card" aria-label="Selected camera details">
      <h2>Selected camera: {cam.name} <span className="muted">(demo values)</span></h2>
      <dl className="details">
        <div><dt>Name</dt><dd>{cam.name}</dd></div>
        <div><dt>Connection status</dt><dd><StatusBadge status={cam.status} /></dd></div>
        <div><dt>FPS</dt><dd>{stat.fps ?? 0}</dd></div>
        <div><dt>Latency</dt><dd>{stat.latency ?? 0} ms</dd></div>
        <div><dt>Detections</dt><dd>{stat.objects ?? 0}</dd></div>
        <div><dt>Stream type</dt><dd>{cam.streamType}</dd></div>
        <div><dt>Last update</dt><dd>{lastUpdate.toLocaleTimeString()}</dd></div>
      </dl>
    </section>
  );
}
