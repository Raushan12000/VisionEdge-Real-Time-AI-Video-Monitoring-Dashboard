// Optional future live telemetry. Not connected to any real server yet.
export function openTelemetrySocket(onMessage, onStatus) {
  const url = (import.meta.env.VITE_WS_URL || 'ws://localhost:8000') + '/ws/telemetry';
  let socket;
  try {
    socket = new WebSocket(url);
  } catch {
    onStatus('error');
    return () => {};
  }
  socket.onopen = () => onStatus('open');
  socket.onerror = () => onStatus('error');
  socket.onclose = () => onStatus('closed');
  socket.onmessage = (e) => {
    try { onMessage(JSON.parse(e.data)); } catch { /* ignore bad data */ }
  };
  return () => socket.close(); // call this in useEffect cleanup
}
