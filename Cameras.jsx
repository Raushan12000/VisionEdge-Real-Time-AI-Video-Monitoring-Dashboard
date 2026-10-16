import CameraGrid from '../components/CameraGrid';
import SelectedCamera from '../components/SelectedCamera';

export default function Cameras({ cams, metrics, selected, ...grid }) {
  return (
    <>
      <h1>Cameras</h1>
      <section className="card">
        <h2>How the cameras work in this prototype</h2>
        <p className="muted">Laptop webcam: real preview through browser permission (works on localhost or HTTPS only). The webcam is active only while a camera page is open.</p>
        <p className="muted">CCTV / IP camera: browsers cannot play RTSP directly. The backend must convert or relay the stream to WebRTC first. Camera usernames and passwords must stay on the backend, never in this frontend.</p>
        <p className="muted">Cameras 3 and 4: simulated previews, not real footage.</p>
      </section>
      <CameraGrid cams={cams} stats={metrics.stats} {...grid} />
      <SelectedCamera cam={selected} stat={selected && metrics.stats[selected.id]} lastUpdate={metrics.lastUpdate} />
    </>
  );
}
