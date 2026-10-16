import CameraCard from './CameraCard';

export default function CameraGrid({ cams, stats, selectedId, onSelect, onToggle, onWebcamState, settings }) {
  if (cams.length === 0) return <p className="state">No cameras configured.</p>;
  return (
    <div className="grid cams">
      {cams.map((cam) => (
        <CameraCard key={cam.id} cam={cam} stat={stats[cam.id]} selected={cam.id === selectedId}
          showStats={settings.showStats} onSelect={onSelect} onToggle={onToggle} onWebcamState={onWebcamState} />
      ))}
    </div>
  );
}
