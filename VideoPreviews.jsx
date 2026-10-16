import { useEffect } from 'react';
import useWebcam from '../hooks/useWebcam';

// Real laptop webcam preview. Reports its state to the parent.
export function WebcamPreview({ onState }) {
  const { videoRef, state, error } = useWebcam();
  useEffect(() => { onState(state, error); }, [state, error, onState]);
  useEffect(() => () => onState('idle', ''), [onState]);
  return (
    <>
      <video ref={videoRef} className="video" autoPlay playsInline muted
        aria-label="Live laptop webcam preview" style={{ display: state === 'live' ? 'block' : 'none' }} />
      {state === 'connecting' && <div className="overlay">Requesting camera permission…</div>}
      {state === 'error' && <div className="overlay err" role="alert">{error}</div>}
      {state === 'live' && <span className="tag">LIVE · LOCAL WEBCAM</span>}
    </>
  );
}

// Animated fake preview. NOT real footage.
export function SimPreview() {
  return (
    <div className="sim" role="img" aria-label="Simulated camera preview, not real footage">
      <span className="box b1" /><span className="box b2" />
      <span className="tag warn">SIMULATED · NOT REAL FOOTAGE</span>
    </div>
  );
}

// Integration point for a future WebRTC stream URL provided by the backend.
// Never put RTSP URLs or camera passwords in frontend code.
export function WebRTCPlayer({ streamUrl }) {
  if (!streamUrl) {
    return (
      <div className="overlay">
        <strong>No stream connected</strong>
        <span>Browsers cannot play RTSP. The Python backend must relay this camera to WebRTC and give the dashboard a stream URL.</span>
      </div>
    );
  }
  return (
    <div className="overlay">
      <strong>Stream URL received</strong>
      <span>{streamUrl}. The WebRTC client is planned for backend integration.</span>
    </div>
  );
}
