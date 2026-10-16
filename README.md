# VisionEdge Dashboard (React frontend prototype)

Dark-themed monitoring dashboard for the VisionEdge MCA project. **Everything is demo data**: there is no backend, no AI detection and no CCTV stream yet.

## Run in VS Code
1. Install Node.js LTS from nodejs.org (check: `node -v`).
2. Unzip, then in VS Code: File > Open Folder > `visionedge-dashboard`.
3. Terminal > New Terminal, then:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 (webcam works on localhost or HTTPS only).
5. Production build: `npm run build` (output in `dist/`).

## Architecture
```
CCTV (RTSP) -> Python backend -> YOLO/TensorRT -> FastAPI + WebRTC -> React dashboard (this project)
```
Browsers cannot play RTSP. The backend must relay it to WebRTC.

## Implemented
Sidebar navigation, header (clock, Demo Mode badge, refresh), 8 simulated metric cards, 4 camera cards (real webcam, CCTV placeholder, 2 simulated), camera select/enable/disable, selected-camera panel, Recharts analytics, filterable demo events, settings saved in localStorage, API layer, WebSocket helper, loading/empty/error states, cleanup of intervals and webcam tracks.

## Pending (needs backend)
Real CCTV via WebRTC, real metrics/events, live WebSocket telemetry. `src/services/websocket.js` is written but not connected to anything yet.

## Backend APIs needed (proposed, not existing)
`GET /api/health`, `GET /api/cameras`, `GET /api/metrics`, `GET /api/events`, optional `WS /ws/telemetry`, plus a WebRTC signalling endpoint per camera. Set `VITE_API_URL` and `VITE_WS_URL` in a `.env` file.

## Changes from the suggested structure
Navigation uses React state instead of React Router (simpler). Mock data is one file (`mockData.js`). `VideoPreviews.jsx` holds the webcam, simulated and WebRTC previews.

## MCA review summary
VisionEdge is a real-time AI video monitoring system. This work is its React dashboard, built with Vite, Recharts and hooks, running on clearly labelled simulated data and structured so a FastAPI backend can replace the mock data.

## Viva questions
- Why Vite? Fast dev server and simple React setup.
- What is state? Data a component remembers; changing it re-renders the UI (`useState`).
- What is useEffect? Runs side effects (timers, webcam); the returned function cleans up.
- Why can't `<video>` play RTSP? Browsers do not support RTSP; the stream must be converted to WebRTC/HLS.
- What is WebRTC? Browser technology for low-latency real-time video.
- Why a service layer? One place to swap mock data for API calls.
- Why stop webcam tracks? To release the camera and turn off its light.
- Is detection real? No. It is simulated until the backend exists.

## Demo script
1. Show the Demo Mode badge and metrics updating. 2. Open Cameras, allow the webcam, point out the simulated labels and the CCTV placeholder. 3. Select and disable a camera. 4. Show Analytics charts. 5. Filter Events. 6. Change the refresh interval in Settings. 7. Explain the planned backend and WebRTC integration.
