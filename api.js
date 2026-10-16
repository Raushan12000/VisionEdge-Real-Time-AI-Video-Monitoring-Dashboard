// Proposed backend endpoints (NOT implemented yet): /api/health, /api/cameras, /api/metrics, /api/events
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function getJSON(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(API_BASE + path, { signal: controller.signal });
    if (!res.ok) throw new Error('Server returned ' + res.status);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const getHealth = () => getJSON('/api/health');
export const getCameras = () => getJSON('/api/cameras');
export const getMetrics = () => getJSON('/api/metrics');
export const getEvents = () => getJSON('/api/events');
