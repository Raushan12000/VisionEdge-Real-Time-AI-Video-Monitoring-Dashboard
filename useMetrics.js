import { useState, useEffect, useCallback } from 'react';

const rnd = (min, max) => Math.round(min + Math.random() * (max - min));

// Generates SIMULATED metrics every `intervalMs`. `cameras` must be memoized by the caller.
export default function useMetrics(cameras, intervalMs) {
  const [data, setData] = useState({ stats: {}, gpu: 0, mem: 0, lastUpdate: new Date() });
  const [history, setHistory] = useState([]);

  const tick = useCallback(() => {
    const stats = {};
    cameras.forEach((c) => {
      stats[c.id] = c.online
        ? { fps: rnd(22, 30), latency: rnd(40, 120), objects: rnd(0, 9) }
        : { fps: 0, latency: 0, objects: 0 };
    });
    const on = cameras.filter((c) => c.online);
    const n = on.length || 1;
    const sum = (k) => on.reduce((a, c) => a + stats[c.id][k], 0);
    const point = {
      time: new Date().toLocaleTimeString([], { hour12: false }),
      fps: Math.round(sum('fps') / n),
      latency: Math.round(sum('latency') / n),
      objects: sum('objects'),
    };
    setData({ stats, gpu: rnd(35, 75), mem: rnd(40, 70), lastUpdate: new Date() });
    setHistory((h) => [...h.slice(-19), point]);
  }, [cameras]);

  useEffect(() => {
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id); // cleanup
  }, [tick, intervalMs]);

  return { ...data, history, refresh: tick };
}
