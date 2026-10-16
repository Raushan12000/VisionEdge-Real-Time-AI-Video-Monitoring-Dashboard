// DEMO DATA ONLY. None of this comes from a real backend, camera, or AI model.
export const initialCameras = [
  { id: 1, name: 'Laptop Webcam', location: 'Developer Desk', type: 'webcam', streamType: 'Browser camera (getUserMedia)', enabled: true },
  { id: 2, name: 'CCTV / IP Camera', location: 'Main Entrance', type: 'cctv', streamType: 'WebRTC (needs backend)', enabled: true },
  { id: 3, name: 'Simulated Camera', location: 'Parking Lot (demo)', type: 'sim', streamType: 'Simulated preview', enabled: true },
  { id: 4, name: 'Simulated Camera', location: 'Warehouse (demo)', type: 'sim', streamType: 'Simulated preview', enabled: true },
];

// Simulated 24-hour availability per camera (percent)
export const availability = { 1: 99, 2: 0, 3: 98, 4: 96 };

const objects = ['person', 'car', 'bus', 'bicycle'];
const statuses = ['New', 'Reviewed', 'Dismissed'];

export const mockEvents = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  time: new Date(Date.now() - i * 7 * 60000).toLocaleString(),
  cameraId: (i % 4) + 1,
  object: objects[(i * 7 + (i % 3)) % 4],
  confidence: (0.6 + ((i * 37) % 39) / 100).toFixed(2),
  status: statuses[i % 3],
}));
