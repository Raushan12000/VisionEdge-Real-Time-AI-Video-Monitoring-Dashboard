import { WebcamPreview, SimPreview, WebRTCPlayer } from './VideoPreviews';
import StatusBadge from './StatusBadge';

export default function CameraCard({ cam, stat = {}, selected, showStats, onSelect, onToggle, onWebcamState }) {
  let preview;
  if (!cam.enabled) preview = <div className="overlay">Camera disabled</div>;
  else if (cam.type === 'webcam') preview = <WebcamPreview onState={onWebcamState} />;
  else if (cam.type === 'cctv') preview = <WebRTCPlayer streamUrl={null} />;
  else preview = <SimPreview />;

  return (
    <article className={`card cam ${selected ? 'selected' : ''}`}>
      <div className="cam-head">
        <div><h3>{cam.name}</h3><p className="muted">{cam.location}</p></div>
        <StatusBadge status={cam.status} />
      </div>
      <div className="preview">{preview}</div>
      {showStats && (
        <dl className="cam-stats">
          <div><dt>FPS (sim)</dt><dd>{stat.fps ?? 0}</dd></div>
          <div><dt>Latency (sim)</dt><dd>{stat.latency ?? 0} ms</dd></div>
          <div><dt>Objects (sim)</dt><dd>{stat.objects ?? 0}</dd></div>
        </dl>
      )}
      <div className="actions">
        <button className={`btn ${selected ? 'primary' : ''}`} onClick={() => onSelect(cam.id)} aria-pressed={selected}>
          {selected ? 'Selected' : 'Select camera'}
        </button>
        <button className="btn" onClick={() => onToggle(cam.id)}>
          {cam.enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    </article>
  );
}
