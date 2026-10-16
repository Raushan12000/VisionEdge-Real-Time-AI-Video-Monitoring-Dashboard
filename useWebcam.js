import { useRef, useState, useEffect } from 'react';

// Starts the laptop webcam when the component mounts and ALWAYS stops it on unmount.
// Needs http://localhost or HTTPS, otherwise the browser blocks camera access.
export default function useWebcam() {
  const videoRef = useRef(null);
  const [state, setState] = useState('connecting'); // connecting | live | error
  const [error, setError] = useState('');

  useEffect(() => {
    let stream = null;
    let cancelled = false;

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState('error');
        setError('Camera API unavailable. Open the app on http://localhost or HTTPS.');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        videoRef.current.srcObject = stream;
        setState('live');
      } catch (e) {
        if (cancelled) return;
        setState('error');
        if (e.name === 'NotAllowedError') setError('Camera permission denied. Allow camera access in the browser, then disable and re-enable this camera.');
        else if (e.name === 'NotFoundError') setError('No camera device found on this computer.');
        else setError('Could not start the camera: ' + e.message);
      }
    }
    start();

    return () => {
      cancelled = true;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, []);

  return { videoRef, state, error };
}
