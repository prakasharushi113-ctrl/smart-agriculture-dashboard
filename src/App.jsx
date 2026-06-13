import { useState, useEffect, useRef } from "react";

const BOARDS = [
  {
    id: "rpi4",
    name: "Raspberry Pi 4",
    short: "Raspberry Pi",
    color: "#c0392b",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" fill="white" />
        <path d="M12 2C10.4 2 9.1 3.1 8.8 4.6C8.2 4.3 7.5 4.1 6.8 4.3C5.3 4.7 4.4 6.2 4.7 7.7C3.3 8.1 2.3 9.4 2.3 11C2.3 12.5 3.2 13.8 4.5 14.3C4.1 15.7 4.9 17.2 6.3 17.7C6.9 17.9 7.5 17.9 8.1 17.7C8.6 19 9.9 19.9 11.4 19.9C12.9 19.9 14.2 19 14.7 17.7C15.3 17.9 15.9 17.9 16.5 17.7C17.9 17.2 18.7 15.7 18.3 14.3C19.6 13.8 20.5 12.5 20.5 11C20.5 9.4 19.5 8.1 18.1 7.7C18.4 6.2 17.5 4.7 16 4.3C15.3 4.1 14.6 4.3 14 4.6C13.7 3.1 12.7 2 12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1" fill="white" />
        <circle cx="15.5" cy="8.5" r="1" fill="white" />
        <circle cx="8.5" cy="15.5" r="1" fill="white" />
        <circle cx="15.5" cy="15.5" r="1" fill="white" />
      </svg>
    ),
  },
  {
    id: "esp32",
    name: "ESP32",
    short: "ESP32",
    color: "#2563eb",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="1.5" />
        <line x1="7" y1="6" x2="7" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="6" x2="10" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="6" x2="13" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="6" x2="17" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="18" x2="7" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="18" x2="10" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="18" x2="13" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="18" x2="17" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="8" y="9" width="8" height="6" rx="1" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1" />
        <text x="12" y="13.5" textAnchor="middle" fill="white" fontSize="3.5" fontWeight="bold">ESP</text>
      </svg>
    ),
  },
  {
    id: "arduino-uno",
    name: "Arduino UNO",
    short: "Arduino UNO",
    color: "#00878a",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="10" rx="2" stroke="white" strokeWidth="1.5" />
        <circle cx="7" cy="12" r="2.5" stroke="white" strokeWidth="1.5" />
        <circle cx="17" cy="12" r="2.5" stroke="white" strokeWidth="1.5" />
        <line x1="9.5" y1="11" x2="14.5" y2="11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9.5" y1="13" x2="14.5" y2="13" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "arduino-nano",
    name: "Arduino Nano",
    short: "Arduino Nano",
    color: "#00878a",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="4" width="14" height="16" rx="2" stroke="white" strokeWidth="1.5" />
        <line x1="8" y1="4" x2="8" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="11" y1="4" x2="11" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="4" x2="14" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="20" x2="8" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="11" y1="20" x2="11" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="20" x2="14" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="8" y="8" width="8" height="5" rx="1" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1" />
      </svg>
    ),
  },
];

const SIDEBAR_IMAGES = [
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
];

const CAMERA_SNAPSHOTS = [
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=90",
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=90",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=90",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=90",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=90",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
];

const TYPE_INFO = {
  temperature: { emoji: "🌡️", description: "Ambient air temperature measured by DHT22 sensor.", range: "Ideal: 20°C – 35°C", color: "#e67e22", sensor: "DHT22", protocol: "1-Wire Digital", dataRate: "0.5 Hz", resolution: "0.1°C", accuracy: "±0.5°C" },
  humidity:    { emoji: "💧", description: "Relative humidity of the air around the crop canopy.", range: "Ideal: 50% – 80%", color: "#2980b9", sensor: "DHT22", protocol: "1-Wire Digital", dataRate: "0.5 Hz", resolution: "0.1%", accuracy: "±2% RH" },
  rainfall:    { emoji: "🌧️", description: "Accumulated rainfall measured by a tipping bucket gauge.", range: "Ideal: 5 – 20 mm/day", color: "#8e44ad", sensor: "Tipping Bucket", protocol: "Pulse Count", dataRate: "Event-based", resolution: "0.2 mm/tip", accuracy: "±2%" },
  gas: {
  emoji: "💨",
  color: "#f97316",
  description: "Air quality and gas concentration monitoring.",
  range: "0 - 1000 ppm",
  sensor: "MQ-2",
  protocol: "Analog",
  dataRate: "1 Hz",
  resolution: "10-bit",
  accuracy: "±5%",
},
  soil:        { emoji: "🌱", description: "Volumetric soil moisture content at root zone depth.", range: "Ideal: 40% – 75%", color: "#27ae60", sensor: "Capacitive v1.2", protocol: "Analog (ADC)", dataRate: "1 Hz", resolution: "0.1%", accuracy: "±3%" },
  wind:        { emoji: "💨", description: "Wind speed at crop canopy height via anemometer.", range: "Normal: 0 – 30 km/h", color: "#16a085", sensor: "Cup Anemometer", protocol: "Pulse Frequency", dataRate: "1 Hz", resolution: "0.1 km/h", accuracy: "±0.5 km/h" },
  light:       { emoji: "☀️", description: "Photosynthetically active radiation (PAR) reaching crops.", range: "Ideal: 400 – 700 lux", color: "#f39c12", sensor: "BH1750", protocol: "I²C", dataRate: "1 Hz", resolution: "1 lux", accuracy: "±20%" },
  proximity:   { emoji: "📡", description: "HC-SR04 Ultrasonic sensor measuring distance to nearest object.", range: "Range: 2 cm – 400 cm", color: "#6366f1", sensor: "HC-SR04", protocol: "GPIO Trigger/Echo", dataRate: "5 Hz", resolution: "0.3 cm", accuracy: "±3 mm" },
  motion:      { emoji: "🚨", description: "PIR motion sensor detecting movement in the field.", range: "Detection angle: 120°", color: "#dc2626", sensor: "PIR HC-SR501", protocol: "GPIO Digital", dataRate: "Event-based", resolution: "N/A", accuracy: "±0" },
  ph: {
  emoji: "⚗️",
  description: "Soil pH level indicating acidity or alkalinity.",
  range: "Ideal: 6.0 – 7.5",
  color: "#8b5cf6",
  sensor: "NPK Sensor",
  protocol: "RS485 Modbus",
  dataRate: "1 Hz",
  resolution: "0.01",
  accuracy: "±0.1",
},
nitrogen: {
  emoji: "🧪",
  description: "Nitrogen concentration in soil.",
  range: "Ideal: 20 – 50 mg/kg",
  color: "#10b981",
  sensor: "NPK Sensor",
  protocol: "RS485 Modbus",
  dataRate: "1 Hz",
  resolution: "1 mg/kg",
  accuracy: "±5%",
},
phosphorus: {
  emoji: "🧪",
  description: "Phosphorus concentration in soil.",
  range: "Ideal: 20 – 60 mg/kg",
  color: "#f59e0b",
  sensor: "NPK Sensor",
  protocol: "RS485 Modbus",
  dataRate: "1 Hz",
  resolution: "1 mg/kg",
  accuracy: "±5%",
},
potassium: {
  emoji: "🧪",
  description: "Potassium concentration in soil.",
  range: "Ideal: 40 – 120 mg/kg",
  color: "#ef4444",
  sensor: "NPK Sensor",
  protocol: "RS485 Modbus",
  dataRate: "1 Hz",
  resolution: "1 mg/kg",
  accuracy: "±5%",
},
soiltemp: {
  emoji: "🌡️",
  description: "Temperature measured directly within the soil.",
  range: "Ideal: 20°C – 35°C",
  color: "#f97316",
  sensor: "NPK Sensor",
  protocol: "RS485 Modbus",
  dataRate: "1 Hz",
  resolution: "0.1°C",
  accuracy: "±0.5°C",
},
conductivity: {
  emoji: "⚡",
  description: "Soil electrical conductivity indicating nutrient concentration.",
  range: "Normal: 100 – 2000 µS/cm",
  color: "#06b6d4",
  sensor: "NPK Sensor",
  protocol: "RS485 Modbus",
  dataRate: "1 Hz",
  resolution: "1 µS/cm",
  accuracy: "±5%",
},
  other:       { emoji: "🔧", description: "Custom sensor parameter.", range: "—", color: "#7f8c8d", sensor: "Custom", protocol: "—", dataRate: "—", resolution: "—", accuracy: "—" },
};

// ── Settings Modal ────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      className={`settings-toggle ${checked ? "settings-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className="settings-toggle-thumb" />
    </button>
  );
}
 
// ── Alert toast ─────────────────────────────────────────────────────────────

function AlertToast({ alerts, onDismiss }) {
  if (alerts.length === 0) return null;
  return (
    <div className="alert-stack">
      {alerts.map((a) => (
        <div key={a.id} className={`alert-toast alert-toast--${a.level}`}>
          <span className="alert-icon">{a.level === "danger" ? "🔴" : "🟡"}</span>
          <div className="alert-body">
            <span className="alert-title">{a.title}</span>
            <span className="alert-msg">{a.message}</span>
          </div>
          <button className="alert-close" onClick={() => onDismiss(a.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

function AlertBell({ count, onClick }) {
  return (
    <button className="alert-bell" onClick={onClick} title="View alerts">
      🔔
      {count > 0 && <span className="alert-bell-badge">{count}</span>}
    </button>
  );
}

function AlertPanel({ log, onClear, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal alert-panel">
        <div className="modal-header">
          <h3>🔔 Alert Log</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body alert-log-body">
          {log.length === 0 ? (
            <p className="alert-empty">No alerts recorded yet.</p>
          ) : (
            [...log].reverse().map((a) => (
              <div key={a.id} className={`alert-log-item alert-log-item--${a.level}`}>
                <span className="alert-log-icon">{a.level === "danger" ? "🔴" : "🟡"}</span>
                <div className="alert-log-info">
                  <span className="alert-log-title">{a.title}</span>
                  <span className="alert-log-msg">{a.message}</span>
                  <span className="alert-log-time">{a.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClear}>Clear All</button>
          <button className="btn-add" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Mini graph ───────────────────────────────────────────────────────────────

function MiniGraph({ history, color }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !history || history.length < 2) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width; const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
   const vals = (history || []).map((v) => parseFloat(v) || 0);
  let min = Math.min(...vals);
let max = Math.max(...vals);

// Temperature
if (max <= 50 && min >= 10) {
  min = 15;
  max = 45;
}

// Humidity / Soil Moisture
if (max <= 100 && min >= 0 && vals.some(v => v > 50)) {
  min = 0;
  max = 100;
}

// pH
if (max <= 14) {
  min = 4;
  max = 10;
}

// NPK
if (max <= 100 && vals.some(v => v > 10)) {
  min = 0;
  max = 100;
}

// Conductivity
if (max > 100) {
  min = 0;
  max = 500;
}

const range = max - min || 1;
    const pts = vals.map((v, i) => ({
      x: (i / (vals.length - 1)) * w,
      y: h - ((v - min) / range) * (h - 8) - 4,
    }));
    ctx.beginPath();
    ctx.moveTo(pts[0].x, h);
    pts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, color + "55");
    grad.addColorStop(1, color + "00");
    ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath();
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.stroke();
    const last = pts[pts.length - 1];
    ctx.beginPath(); ctx.arc(last.x, last.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
  }, [history, color]);
  return <canvas ref={canvasRef} width={220} height={60} style={{ width: "100%", height: "60px", display: "block" }} />;
}

// ── Large graph for detail modal ─────────────────────────────────────────────

function LargeGraph({ history, timestamps, color, unit, label }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !history || history.length < 2) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width; const h = canvas.height;
    const PAD = { top: 20, right: 20, bottom: 40, left: 80 };
    ctx.clearRect(0, 0, w, h);
   const vals = (history || []).map((v) => parseFloat(v) || 0);

let min = Math.min(...vals);
let max = Math.max(...vals);

switch (label) {
  case "AIR TEMPERATURE":
  case "SOIL TEMPERATURE":
    min = 15;
    max = 45;
    break;

  case "AIR HUMIDITY":
  case "SOIL MOISTURE":
    min = 0;
    max = 100;
    break;

  case "SOIL PH":
    min = 4;
    max = 10;
    break;

 case "SOIL CONDUCTIVITY":
  min = 0;
  max = Math.max(...vals) * 1.1;
  break;

case "NITROGEN":
case "PHOSPHORUS":
case "POTASSIUM":
  min = 0;
  max = Math.max(...vals) + 20;
  break;
}



const range = max - min || 1;
    const chartW = w - PAD.left - PAD.right;
    const chartH = h - PAD.top - PAD.bottom;

    ctx.strokeStyle = "#f3f4f6"; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(w - PAD.right, y); ctx.stroke();
     const val = (max - (range / 4) * i).toFixed(1);
      ctx.fillStyle = "#9ca3af"; ctx.font = "11px sans-serif"; ctx.textAlign = "right";
      ctx.fillText(val + unit, PAD.left - 6, y + 4);
    }

    ctx.fillStyle = "#9ca3af"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    const step = Math.max(1, Math.floor(vals.length / 5));
    for (let i = 0; i < vals.length; i += step) {
      const x = PAD.left + (i / (vals.length - 1)) * chartW;
      ctx.fillText(
  timestamps?.[i]
    ? new Date(timestamps[i].replace(" ", "T"))
        .toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
    : "",
  x,
  h - PAD.bottom + 16
);
    }
  ctx.fillText(
  timestamps?.[timestamps.length - 1]
    ? new Date(
        timestamps[timestamps.length - 1].replace(" ", "T")
      ).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "",
  PAD.left + chartW,
  h - PAD.bottom + 16
);

    const pts = vals.map((v, i) => ({
      x: PAD.left + (i / (vals.length - 1)) * chartW,
      y: PAD.top + chartH - ((v - min) / range) * chartH,
    }));

    ctx.beginPath();
    ctx.moveTo(pts[0].x, PAD.top + chartH);
    pts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, PAD.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + chartH);
    grad.addColorStop(0, color + "40");
    grad.addColorStop(1, color + "05");
    ctx.fillStyle = grad; ctx.fill();

    ctx.beginPath();
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();

    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, i === pts.length - 1 ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = i === pts.length - 1 ? color : color + "80";
      ctx.fill();
      if (i === pts.length - 1) {
        ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = color + "20"; ctx.fill();
      }
    });

    ctx.save(); ctx.translate(14, PAD.top + chartH / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#6b7280"; ctx.font = "11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(label + " (" + unit + ")", 0, 0);
    ctx.restore();
  }, [history, color, unit, label]);
  return <canvas ref={canvasRef} width={560} height={200} style={{ width: "100%", height: "200px", display: "block" }} />;
}

// ── Wi-Fi signal ─────────────────────────────────────────────────────────────

function WifiSignal({ rssi }) {
  const bars = rssi >= -55 ? 4 : rssi >= -67 ? 3 : rssi >= -80 ? 2 : 1;
  const label = rssi >= -55 ? "Excellent" : rssi >= -67 ? "Good" : rssi >= -80 ? "Fair" : "Poor";
  const color = rssi >= -55 ? "#22c55e" : rssi >= -67 ? "#84cc16" : rssi >= -80 ? "#f59e0b" : "#ef4444";
  return (
    <div className="wifi-row">
      <div className="wifi-bars">
        {[1,2,3,4].map((b) => (
          <div key={b} className="wifi-bar" style={{ height: `${b*5+4}px`, background: b <= bars ? color : "#e5e7eb" }} />
        ))}
      </div>
      <span className="wifi-label" style={{ color }}>{label} ({rssi} dBm)</span>
    </div>
  );
}

function BatteryBar({ voltage = 0 }) {
  const pct = Math.min(100, Math.max(0, Math.round(((voltage - 3.0) / 1.2) * 100)));
  const color = pct > 50 ? "#22c55e" : pct > 20 ? "#f59e0b" : "#ef4444";
  return (
    <div className="battery-row">
      <div className="battery-shell">
        <div className="battery-fill" style={{ width: `${pct}%`, background: color }} />
        <div className="battery-nub" />
      </div>
      <span className="battery-label" style={{ color }}>{pct}% ({(voltage || 0).toFixed(1)}V)</span>
    </div>
  );
}

function LastPing({ secondsAgo }) {
  const label = secondsAgo < 5 ? "Just now" : secondsAgo < 60 ? `${secondsAgo}s ago` : `${Math.floor(secondsAgo/60)}m ago`;
  return (
    <div className="ping-row">
      <span className="ping-dot" style={{ background: secondsAgo < 10 ? "#22c55e" : "#f59e0b" }} />
      <span className="ping-label">Updated {label}</span>
    </div>
  );
}

// ── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ param, onClose }) {
const [selectedDate, setSelectedDate] = useState("");
const [recordLimit, setRecordLimit] = useState(100);
const [graphPoints, setGraphPoints] = useState(100);
  const info = TYPE_INFO[param.type] || TYPE_INFO.other;
  const vals = (param.history || []).map((v) => parseFloat(v) || 0);

const avg =
  vals.length > 0
    ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
    : "0.0";

const minVal =
  vals.length > 0
    ? Math.min(...vals).toFixed(1)
    : "0.0";

const maxVal =
  vals.length > 0
    ? Math.max(...vals).toFixed(1)
    : "0.0";

const latest =
  vals.length > 0
    ? vals[vals.length - 1].toFixed(1)
    : "0.0";

const trend =
  vals.length > 1
    ? (vals[vals.length - 1] - vals[vals.length - 2])
    : 0;

const trendIcon = trend > 0.2 ? "↑" : trend < -0.2 ? "↓" : "→";
const trendColor = trend > 0.2 ? "#ef4444" : trend < -0.2 ? "#2980b9" : "#22c55e";

let filteredHistory = [...(param.history || [])];
let filteredTimes = [...(param.timestamps || [])];

if (selectedDate) {
  const filtered = filteredHistory
    .map((v, i) => ({
      value: v,
      time: filteredTimes[i],
    }))
    .filter((row) =>
      row.time?.slice(0, 10) === selectedDate
    );

  filteredHistory = filtered.map((r) => r.value);
  filteredTimes = filtered.map((r) => r.time);
}

const tableRows = filteredHistory
  .slice(-recordLimit)
  .reverse()
  .map((v, i) => ({
    idx: i,
    value: parseFloat(v).toFixed(1),
    time:
      filteredTimes[
        filteredTimes.length - 1 - i
      ] || "N/A",
  }));
   
console.log("filteredHistory", filteredHistory?.length);
console.log("filteredTimes", filteredTimes?.length);

return (
  <div className="modal-overlay" onClick={onClose}>
      <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-header" style={{ borderBottom: `3px solid ${info.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "2rem" }}>{info.emoji}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700 }}>{param.name}</h3>
              <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>Live sensor data · Updates every 1 min</span>
              <div
  style={{
    fontSize: "0.8rem",
    color: "#6b7280",
    marginTop: "4px",
  }}
>
  Last Updated: {param.timestamp || "N/A"}Last Updated: {
  param.timestamp
    ? new Date(param.timestamp.replace(" ", "T")).toLocaleString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      )
    : "N/A"
}
</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="detail-modal-body">
          <div className="detail-stats-row">
            <div className="detail-stat detail-stat--main" style={{ borderColor: info.color + "44" }}>
              <span className="detail-stat-label">Current</span>
              <span className="detail-stat-value" style={{ color: info.color }}>{latest}{param.unit}</span>
              <span className="detail-trend" style={{ color: trendColor }}>{trendIcon} Trend</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Average</span>
              <span className="detail-stat-num">{avg}{param.unit}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Min</span>
              <span className="detail-stat-num" style={{ color: "#2980b9" }}>{minVal}{param.unit}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Max</span>
              <span className="detail-stat-num" style={{ color: "#ef4444" }}>{maxVal}{param.unit}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Samples</span>
              <span className="detail-stat-num">{vals.length}</span>
            </div>
          </div>

          {param.alert && (
            <div className={`card-alert card-alert--${param.alert.level}`} style={{ borderRadius: "12px" }}>
              {param.alert.level === "danger" ? "🔴" : "🟡"} {param.alert.message}
            </div>
          )}

          <div className="detail-graph-section">
            <div className="detail-section-title">📈 Live History Graph</div>
            <div style={{ background: "#f9fafb", borderRadius: "14px", padding: "12px 8px 4px", border: "1px solid #f3f4f6" }}>
             <LargeGraph
  history={filteredHistory.slice(-graphPoints)}
 timestamps={filteredTimes.slice(-graphPoints)}
  color={info.color}
  unit={param.unit}
  label={param.name}
/>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  }}
>
  <span style={{ fontSize: "12px", fontWeight: 600 }}>
    Graph Range
  </span>

  <input
    type="range"
    min="20"
    max={filteredHistory.length}
    value={graphPoints}
    onChange={(e) =>
      setGraphPoints(Number(e.target.value))
    }
    style={{ flex: 1 }}
  />

  <span
    style={{
      minWidth: "50px",
      textAlign: "right",
      fontSize: "12px",
    }}
  >
    {graphPoints}
  </span>
</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9ca3af", marginTop: "4px", padding: "0 8px" }}>
              <span>← Older readings</span>
              <span>Latest →</span>
            </div>
          </div>

          <div className="detail-two-col">
            <div className="detail-info-box">
              <div className="detail-section-title">🔬 Sensor Specifications</div>
              <table className="detail-table">
                <tbody>
                  <tr><td>Sensor Model</td><td>{info.sensor}</td></tr>
                  <tr><td>Protocol</td><td>{info.protocol}</td></tr>
                  <tr><td>Data Rate</td><td>{info.dataRate}</td></tr>
                  <tr><td>Resolution</td><td>{info.resolution}</td></tr>
                  <tr><td>Accuracy</td><td>{info.accuracy}</td></tr>
                  <tr><td>Ideal Range</td><td style={{ color: "#356f1f", fontWeight: 600 }}>{info.range}</td></tr>
                </tbody>
              </table>
              <div className="detail-desc-box">
                <p>{info.description}</p>
              </div>
            </div>

            <div className="detail-info-box">
              <div className="detail-section-title">📶 Connectivity & Power</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <WifiSignal rssi={param.rssi} />
                <BatteryBar voltage={param.voltage} />
                <LastPing secondsAgo={param.pingAge} />
              </div>
<table className="detail-table">
            <div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap",
  }}
>
  <select
    value={recordLimit}
    onChange={(e) => setRecordLimit(Number(e.target.value))}
    style={{
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "12px",
    }}
  >
    <option value={10}>Last 10</option>
    <option value={40}>Last 40</option>
    <option value={100}>Last 100</option>
    <option value={999999}>All Records</option>
  </select>

  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    style={{
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "12px",
    }}
  />

  <span
    style={{
      marginLeft: "auto",
      fontSize: "12px",
      color: "#6b7280",
      fontWeight: 600,
    }}
  >
    Total: {filteredHistory.length} records
  </span>
</div>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => {
                    const v = parseFloat(row.value);
                    const thr = THRESHOLDS[param.type];
                    let status = "✅ OK";
                    if (thr) {
                      if (thr.max !== null && v > thr.max) status = "🔴 High";
                      else if (thr.min !== null && v < thr.min) status = "🟡 Low";
                    }
                    return (
                      <tr key={row.idx}>
                        <td style={{ color: "#9ca3af" }}>{row.time}</td>
                        <td style={{ fontWeight: 600, color: info.color }}>{row.value}{param.unit}</td>
                        <td style={{ fontSize: "0.78rem" }}>{status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Proximity Detail Modal ────────────────────────────────────────────────────

function ProximityDetailModal({ proximity, onClose }) {
  const info = TYPE_INFO.proximity;
  const distColor = proximity.distance < 30 ? "#ef4444" : proximity.distance < 80 ? "#f59e0b" : "#22c55e";
  const distLabel = proximity.distance < 30 ? "Very Close" : proximity.distance < 80 ? "Near" : "Clear";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-header" style={{ borderBottom: `3px solid ${info.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "2rem" }}>📡</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700 }}>PROXIMITY & MOTION</h3>
              <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>HC-SR04 Ultrasonic + PIR motion sensor</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="detail-modal-body">
          <div className="detail-stats-row">
            <div className="detail-stat detail-stat--main" style={{ borderColor: distColor + "44" }}>
              <span className="detail-stat-label">Distance</span>
              <span className="detail-stat-value" style={{ color: distColor }}>{proximity.distance} cm</span>
              <span className="detail-trend" style={{ color: distColor }}>● {distLabel}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Motion</span>
              <span className="detail-stat-num" style={{ color: proximity.motion ? "#ef4444" : "#22c55e" }}>
                {proximity.motion ? "🚨 YES" : "✅ NO"}
              </span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Max Range</span>
              <span className="detail-stat-num">400 cm</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">PIR Angle</span>
              <span className="detail-stat-num">120°</span>
            </div>
          </div>

          <div className="detail-graph-section">
            <div className="detail-section-title">📏 Distance Visualizer</div>
            <div style={{ background: "#f9fafb", borderRadius: "14px", padding: "20px", border: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#9ca3af", marginBottom: "8px" }}>
                <span>0 cm</span><span>100 cm</span><span>200 cm</span><span>300 cm</span><span>400 cm</span>
              </div>
              <div style={{ height: "24px", background: "#e5e7eb", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                <div style={{
                  width: `${Math.min(100, (proximity.distance / 400) * 100)}%`,
                  height: "100%", background: distColor,
                  borderRadius: "12px", transition: "width 0.5s ease",
                  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px",
                }}>
                  <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 700 }}>{proximity.distance} cm</span>
                </div>
              </div>
              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                {[
                  { label: "< 30 cm", color: "#ef4444", desc: "Very Close — Danger zone" },
                  { label: "30–80 cm", color: "#f59e0b", desc: "Near — Caution" },
                  { label: "> 80 cm", color: "#22c55e", desc: "Clear — Safe" },
                ].map((z) => (
                  <div key={z.label} style={{ flex: 1, background: z.color + "15", border: `1px solid ${z.color}44`, borderRadius: "10px", padding: "8px 10px" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: z.color }}>{z.label}</div>
                    <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>{z.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`motion-banner ${proximity.motion ? "motion-banner--alert" : "motion-banner--clear"}`} style={{ borderRadius: "16px" }}>
            <span className="motion-icon">{proximity.motion ? "🚨" : "✅"}</span>
            <div className="motion-info">
              <span className="motion-title">{proximity.motion ? "Motion Detected!" : "Field Clear — No Motion"}</span>
              <span className="motion-sub">PIR HC-SR501 sensor · Detection angle: 120° · Detection range: up to 7 m</span>
            </div>
            {proximity.motion && <span className="motion-pulse" />}
          </div>

          <div className="detail-two-col">
            <div className="detail-info-box">
              <div className="detail-section-title">🔬 HC-SR04 Ultrasonic Specs</div>
              <table className="detail-table">
                <tbody>
                  <tr><td>Sensor Model</td><td>HC-SR04</td></tr>
                  <tr><td>Measuring Range</td><td>2 cm – 400 cm</td></tr>
                  <tr><td>Accuracy</td><td>±3 mm</td></tr>
                  <tr><td>Measuring Angle</td><td>15°</td></tr>
                  <tr><td>Frequency</td><td>40 kHz</td></tr>
                  <tr><td>Supply Voltage</td><td>5V DC</td></tr>
                  <tr><td>Protocol</td><td>GPIO Trigger/Echo</td></tr>
                </tbody>
              </table>
            </div>
            <div className="detail-info-box">
              <div className="detail-section-title">🔬 PIR HC-SR501 Specs</div>
              <table className="detail-table">
                <tbody>
                  <tr><td>Sensor Model</td><td>HC-SR501 PIR</td></tr>
                  <tr><td>Detection Range</td><td>Up to 7 m</td></tr>
                  <tr><td>Detection Angle</td><td>120°</td></tr>
                  <tr><td>Delay Time</td><td>0.3s – 5 min</td></tr>
                  <tr><td>Supply Voltage</td><td>4.5V – 20V</td></tr>
                  <tr><td>Protocol</td><td>GPIO Digital High/Low</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="detail-info-box">
            <div className="detail-section-title">📶 Connectivity & Power</div>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <WifiSignal rssi={proximity.rssi} />
              <BatteryBar voltage={proximity.voltage} />
              <LastPing secondsAgo={proximity.pingAge} />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Camera Detail Modal ───────────────────────────────────────────────────────

function CameraDetailModal({ boardName, onClose }) {
  const [snapIndex, setSnapIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastCaptured, setLastCaptured] = useState(new Date());

  function captureSnapshot() {
    setLoading(true);
    setTimeout(() => {
      setSnapIndex((p) => (p + 1) % CAMERA_SNAPSHOTS.length);
      setLastCaptured(new Date());
      setLoading(false);
    }, 800);
  }

  const fmt = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-header" style={{ borderBottom: "3px solid #356f1f" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "2rem" }}>📷</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700 }}>CAMERA FEED</h3>
              <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>PiCamera v2 · {boardName}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="detail-modal-body">
          <div className="detail-stats-row">
            <div className="detail-stat detail-stat--main" style={{ borderColor: "#356f1f44" }}>
              <span className="detail-stat-label">Status</span>
              <span className="detail-stat-value" style={{ color: "#356f1f", fontSize: "1.6rem" }}>🟢 Live</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Resolution</span>
              <span className="detail-stat-num">8 MP</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">FOV</span>
              <span className="detail-stat-num">62.2°</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">Last Snap</span>
              <span className="detail-stat-num" style={{ fontSize: "0.8rem" }}>{fmt(lastCaptured)}</span>
            </div>
          </div>

          <div className="detail-graph-section">
            <div className="detail-section-title">📸 Camera View</div>
            <div style={{ borderRadius: "18px", overflow: "hidden", position: "relative", background: "#111" }}>
              {loading && (
                <div className="camera-loading">
                  <div className="camera-spinner" />
                  <span>Capturing…</span>
                </div>
              )}
              <img src={CAMERA_SNAPSHOTS[snapIndex]} alt="Pi Camera snapshot"
                style={{ width: "100%", display: "block", maxHeight: "360px", objectFit: "cover", opacity: loading ? 0 : 1, transition: "opacity 0.4s ease" }} />
              <div className="camera-timestamp">
                <span className="camera-rec">● REC</span>
                <span>{fmt(lastCaptured)}</span>
              </div>
            </div>
            <div className="camera-controls" style={{ marginTop: "10px" }}>
              <button className="cam-btn cam-btn--primary" onClick={captureSnapshot} disabled={loading}>
                {loading ? "Capturing…" : "📸 Capture Snapshot"}
              </button>
            </div>
          </div>

          <div className="detail-graph-section">
            <div className="detail-section-title">🖼️ Snapshot Gallery</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {CAMERA_SNAPSHOTS.slice(0, 6).map((src, i) => (
                <div key={i} onClick={() => setSnapIndex(i)}
                  style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer", border: `2px solid ${i === snapIndex ? "#356f1f" : "transparent"}`, transition: "border-color 0.2s" }}>
                  <img src={src} alt={`Snapshot ${i + 1}`} style={{ width: "100%", height: "70px", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-two-col">
            <div className="detail-info-box">
              <div className="detail-section-title">🔬 Camera Specifications</div>
              <table className="detail-table">
                <tbody>
                  <tr><td>Model</td><td>PiCamera v2</td></tr>
                  <tr><td>Sensor</td><td>Sony IMX219</td></tr>
                  <tr><td>Resolution</td><td>3280 × 2464 px (8MP)</td></tr>
                  <tr><td>FOV</td><td>62.2° (H) × 48.8° (V)</td></tr>
                  <tr><td>Focal Length</td><td>3.04 mm</td></tr>
                  <tr><td>Interface</td><td>CSI (Camera Serial)</td></tr>
                  <tr><td>Frame Rate</td><td>30 fps @ 1080p</td></tr>
                </tbody>
              </table>
            </div>
            <div className="detail-info-box">
              <div className="detail-section-title">📶 Connectivity</div>
              <WifiSignal rssi={-50} />
              <div className="ping-row" style={{ marginTop: "10px" }}>
                <span className="ping-dot" style={{ background: "#22c55e" }} />
                <span className="ping-label">Streaming active</span>
              </div>
              <div className="detail-section-title" style={{ marginTop: "16px" }}>ℹ️ Use Cases</div>
              <div className="detail-desc-box">
                <p>Crop health monitoring, intruder detection, growth tracking, and remote field inspection. Captured images can be sent to Firebase Storage for AI-based crop disease detection.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Proximity card ────────────────────────────────────────────────────────────

function ProximityCard({ distance, motionDetected, rssi, voltage, pingAge, onClick }) {
  const distColor = distance < 30 ? "#ef4444" : distance < 80 ? "#f59e0b" : "#22c55e";
  const distLabel = distance < 30 ? "Very Close" : distance < 80 ? "Near" : "Clear";

  return (
    <div className="card param-card clickable-card" onClick={onClick} title="Click for details">
      <div className="card-top">
        <div className="card-title-group">
          <span className="card-emoji">📡</span>
          <span className="card-title">PROXIMITY & MOTION</span>
        </div>
        <span className="sensor-chip">HC-SR04 + PIR</span>
      </div>
      <div className="expand-hint">🔍 Click for details</div>
      <div className="prox-section">
        <div className="prox-label">Ultrasonic Distance</div>
        <div className="prox-value" style={{ color: distColor }}>{distance} cm</div>
        <div className="prox-bar-track">
          <div className="prox-bar-fill" style={{ width: `${Math.min(100, (distance / 400) * 100)}%`, background: distColor }} />
        </div>
        <div className="prox-status" style={{ color: distColor }}>● {distLabel}</div>
      </div>
      <div className={`motion-banner ${motionDetected ? "motion-banner--alert" : "motion-banner--clear"}`}>
        <span className="motion-icon">{motionDetected ? "🚨" : "✅"}</span>
        <div className="motion-info">
          <span className="motion-title">{motionDetected ? "Motion Detected!" : "No Motion"}</span>
          <span className="motion-sub">PIR sensor — 120° detection angle</span>
        </div>
        {motionDetected && <span className="motion-pulse" />}
      </div>
      <div className="info-block">
        <p className="info-desc">HC-SR04 measures distance via ultrasonic pulse echo (2–400 cm). PIR detects infrared movement for intruder/animal alerts.</p>
        <span className="info-range">Ultrasonic range: 2–400 cm &nbsp;|&nbsp; PIR angle: 120° &nbsp;|&nbsp; PIR range: 7 m</span>
      </div>
      <div className="status-row">
        <WifiSignal rssi={rssi} />
        <BatteryBar voltage={voltage} />
        <LastPing secondsAgo={pingAge} />
      </div>
    </div>
  );
}

// ── Camera card ───────────────────────────────────────────────────────────────

function CameraCard({ boardName, onClick }) {
  const [snapIndex, setSnapIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastCaptured, setLastCaptured] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const autoRef = useRef(null);
  const cdRef = useRef(null);

  function captureSnapshot(e) {
    if (e) e.stopPropagation();
    setLoading(true);
    setTimeout(() => {
      setSnapIndex((p) => (p + 1) % CAMERA_SNAPSHOTS.length);
      setLastCaptured(new Date());
      setLoading(false);
      setCountdown(30);
    }, 800);
  }

  useEffect(() => {
    if (autoRefresh) {
      autoRef.current = setInterval(captureSnapshot, 30000);
      cdRef.current = setInterval(() => setCountdown((c) => (c <= 1 ? 30 : c - 1)), 1000);
    } else {
      clearInterval(autoRef.current);
      clearInterval(cdRef.current);
      setCountdown(30);
    }
    return () => { clearInterval(autoRef.current); clearInterval(cdRef.current); };
  }, [autoRefresh]);

  const fmt = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="card camera-card clickable-card" onClick={onClick} title="Click for details">
      <div className="card-top">
        <div className="card-title-group">
          <span className="card-emoji">📷</span>
          <span className="card-title">CAMERA FEED</span>
        </div>
        <span className="camera-source">{boardName}</span>
      </div>
      <div className="expand-hint">🔍 Click for details</div>
      <div className="camera-frame">
        {loading && (
          <div className="camera-loading">
            <div className="camera-spinner" />
            <span>Capturing…</span>
          </div>
        )}
        <img src={CAMERA_SNAPSHOTS[snapIndex]} alt="Pi Camera snapshot"
          className={`camera-img ${loading ? "camera-img--hidden" : ""}`} />
        <div className="camera-timestamp">
          <span className="camera-rec">● REC</span>
          <span>{fmt(lastCaptured)}</span>
        </div>
      </div>
      <div className="camera-controls">
        <button className="cam-btn cam-btn--primary" onClick={captureSnapshot} disabled={loading}>
          {loading ? "Capturing…" : "📸 Capture"}
        </button>
        <button className={`cam-btn ${autoRefresh ? "cam-btn--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); setAutoRefresh((v) => !v); }}>
          {autoRefresh ? `⏱ Auto (${countdown}s)` : "⏱ Auto Refresh"}
        </button>
      </div>
      <div className="info-block">
        <p className="info-desc">PiCamera v2 — 8MP Sony IMX219. Field snapshots for crop health monitoring and intruder detection.</p>
        <span className="info-range">Resolution: 3280 × 2464 px &nbsp;|&nbsp; FOV: 62.2°</span>
      </div>
      <div className="status-row">
        <WifiSignal rssi={-50} />
        <div className="ping-row">
          <span className="ping-dot" style={{ background: "#22c55e" }} />
          <span className="ping-label">Last snapshot at {fmt(lastCaptured)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Param card ────────────────────────────────────────────────────────────────

function ParamCard({ param, onRemove, onClick }) {
  const info = TYPE_INFO[param.type] || TYPE_INFO.other;

  return (
    <div
      className="card param-card clickable-card"
      style={{ "--card-accent": info.color }}
      onClick={onClick}
      title="Click for details"
    >
      <div className="card-top">
        <div className="card-title-group">
          <span className="card-emoji">{info.emoji}</span>
          <span className="card-title">{param.name}</span>
        </div>
        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(param.id); }} title="Remove">✕</button>
      </div>
      <div className="expand-hint">🔍 Click for details</div>
      {param.alert && (
        <div className={`card-alert card-alert--${param.alert.level}`}>
          {param.alert.level === "danger" ? "🔴" : "🟡"} {param.alert.message}
        </div>
      )}
      <div className="metric-value" style={{ color: info.color }}>{param.value}{param.unit}</div>
      <div className="graph-wrap">
        <MiniGraph history={param.history || []} color={info.color} />
      </div>
      <div className="info-block">
        <p className="info-desc">{info.description}</p>
        <span className="info-range">{info.range}</span>
      </div>
      <div className="status-row">
        <WifiSignal rssi={param.rssi} />
        <BatteryBar voltage={param.voltage} />
        <LastPing secondsAgo={param.pingAge} />
      </div>
    </div>
  );
}

// ── Board selector modal ──────────────────────────────────────────────────────

function BoardSelectorModal({ current, onSelect, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Select Board</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body board-list">
          {BOARDS.map((board) => (
            <div key={board.id}
              className={`board-option ${current.id === board.id ? "board-option--active" : ""}`}
              onClick={() => { onSelect(board); onClose(); }}
              style={{ "--board-color": board.color }}>
              <div className="board-option-icon" style={{ background: board.color }}>{board.icon}</div>
              <div className="board-option-info">
                <span className="board-option-name">{board.name}</span>
                {current.id === board.id && <span className="board-option-badge">Connected</span>}
              </div>
              {current.id === board.id && <span className="board-check">✓</span>}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Add parameter modal ───────────────────────────────────────────────────────

function AddModal({ onClose, onAdd }) {
  const [p, setP] = useState({
    name: "", value: "", unit: "", type: "temperature",
    rssi: -50, voltage: 3.9,
    thresholdMin: "", thresholdMax: "",
  });

  function handleAdd() {
    if (!p.name.trim() || !p.value.trim()) return;
    onAdd(p);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal" onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") onClose(); }}>
        <div className="modal-header">
          <h3>Add Parameter</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <label>Parameter Name</label>
          <input type="text" placeholder="e.g. Wind Speed" value={p.name} autoFocus
            onChange={(e) => setP({ ...p, name: e.target.value.toUpperCase() })} />
          <label>Value</label>
          <input type="text" placeholder="e.g. 14" value={p.value}
            onChange={(e) => setP({ ...p, value: e.target.value })} />
          <label>Unit</label>
          <input type="text" placeholder="e.g. km/h" value={p.unit}
            onChange={(e) => setP({ ...p, unit: e.target.value })} />
          <label>Type</label>
          <select value={p.type} onChange={(e) => setP({ ...p, type: e.target.value })}>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="rainfall">Rainfall</option>
            <option value="soil">Soil</option>
            <option value="wind">Wind</option>
            <option value="light">Light</option>
            <option value="proximity">Proximity</option>
            <option value="motion">Motion</option>
            <option value="other">Other</option>
          </select>
          <div className="modal-divider">⚠️ Alert Thresholds (optional)</div>
          <label>Min Threshold</label>
          <input type="number" placeholder="e.g. 10 — alert if value goes below"
            value={p.thresholdMin} onChange={(e) => setP({ ...p, thresholdMin: e.target.value })} />
          <label>Max Threshold</label>
          <input type="number" placeholder="e.g. 40 — alert if value goes above"
            value={p.thresholdMax} onChange={(e) => setP({ ...p, thresholdMax: e.target.value })} />
          <label>Wi-Fi RSSI (dBm)</label>
          <input type="number" placeholder="-50" value={p.rssi}
            onChange={(e) => setP({ ...p, rssi: parseInt(e.target.value) || -50 })} />
          <label>Battery Voltage (V)</label>
          <input type="number" step="0.1" placeholder="3.9" value={p.voltage}
            onChange={(e) => setP({ ...p, voltage: parseFloat(e.target.value) || 3.7 })} />
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-add" onClick={handleAdd} disabled={!p.name.trim() || !p.value.trim()}>Add</button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateHistory(baseValue, count = 20) {
  const base = parseFloat(baseValue) || 0;

  const history = [];
  let current = base * 0.9;

  for (let i = 0; i < count; i++) {
    current += (base - current) * 0.15;
    current += (Math.random() - 0.5) * 0.5;

    history.push(current.toFixed(1));
  }

  return history;
}

const THRESHOLDS = {
  temperature: { min: 15, max: 38 },
  humidity:    { min: 40, max: 85 },
  rainfall:    { min: null, max: 25 },
  gas: {
  min: null,
  max: 400,
},
  soil:        { min: 30, max: 80 },
  wind:        { min: null, max: 35 },
  light:       { min: 100, max: 900 },
};

function checkThreshold(param) {
  const t = param.thresholdMin !== undefined
    ? { min: parseFloat(param.thresholdMin) || null, max: parseFloat(param.thresholdMax) || null }
    : THRESHOLDS[param.type];
  if (!t) return null;
  const val = parseFloat(param.value);
  if (t.max !== null && val > t.max)
    return { level: "danger", message: `${param.name} is too high: ${param.value}${param.unit}` };
  if (t.min !== null && val < t.min)
    return { level: "warning", message: `${param.name} is too low: ${param.value}${param.unit}` };
  return null;
}

// ── App ───────────────────────────────────────────────────────────────────────
function SettingsModal({
  darkMode,
  onToggleDark,
  alertsEnabled,
  onToggleAlerts,
  onClose,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          background: darkMode ? "#111827" : "#ffffff",
          color: darkMode ? "#f9fafb" : "#111827",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2 style={{ margin: 0 }}>⚙️ Settings</h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 22,
              cursor: "pointer",
              color: darkMode ? "#f9fafb" : "#111827",
            }}
          >
            ✕
          </button>
        </div>

        {/* Dark Mode */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 0",
            borderBottom: darkMode
              ? "1px solid #374151"
              : "1px solid #e5e7eb",
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>
              🌙 Dark Mode
            </div>

            <div
              style={{
                fontSize: 13,
                opacity: 0.7,
              }}
            >
              Switch dashboard theme
            </div>
          </div>

          <button
            onClick={() => onToggleDark(!darkMode)}
            style={{
              width: 70,
              height: 36,
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 700,
              background: darkMode
                ? "#10b981"
                : "#e5e7eb",
              color: darkMode
                ? "#fff"
                : "#374151",
            }}
          >
            {darkMode ? "ON" : "OFF"}
          </button>
        </div>

        {/* Alerts */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 18,
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>
              🚨 Alerts
            </div>

            <div
              style={{
                fontSize: 13,
                opacity: 0.7,
              }}
            >
              Enable sensor notifications
            </div>
          </div>

          <button
            onClick={() =>
              onToggleAlerts(!alertsEnabled)
            }
            style={{
              width: 70,
              height: 36,
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 700,
              background: alertsEnabled
                ? "#ef4444"
                : "#e5e7eb",
              color: alertsEnabled
                ? "#fff"
                : "#374151",
            }}
          >
            {alertsEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default function App() { 
  const [darkMode, setDarkMode] = useState(
  () => localStorage.getItem("darkMode") === "true"
);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showAlertPanel, setShowAlertPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(BOARDS[0]);
  const [alertLog, setAlertLog] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [detailParam, setDetailParam] = useState(null);
  const [parameters, setParameters] = useState([]);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [proximity, setProximity] = useState({ distance: 120, motion: false, rssi: -52, voltage: 4.0, pingAge: 2 });
  const [now, setNow] = useState(new Date());
  const [bgIndex, setBgIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const alertedRef = useRef({});

  // Apply dark mode to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  useEffect(() => {
  localStorage.setItem("alertsEnabled", alertsEnabled);
}, [alertsEnabled]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => { setBgIndex((p) => (p + 1) % SIDEBAR_IMAGES.length); setFadeIn(true); }, 600);
    }, 5000);
    return () => clearInterval(t);
  }, []);
useEffect(() => {
  const fetchSensorData = async () => {
    try {
      const response = await fetch(
       "https://smart-agri-backend-b2td.onrender.com/get-sensors"
      );

      const data = await response.json();
      
      const historyResponse = await fetch(
"https://smart-agri-backend-b2td.onrender.com/sensor-history"
);

const historyData = await historyResponse.json();

const temperatureHistory =
  historyData.map(item => item.temperature);

const humidityHistory =
  historyData.map(item => item.humidity);

const soilMoistureHistory =
  historyData.map(item => item.soil_moisture);

const soilTemperatureHistory =
  historyData.map(item => item.soil_temperature);

const phHistory =
  historyData.map(item => item.pH);

const conductivityHistory =
  historyData.map(item => item.soil_conductivity);

const nitrogenHistory =
  historyData.map(item => item.nitrogen);

const phosphorusHistory =
  historyData.map(item => item.phosphorus);

const potassiumHistory =
  historyData.map(item => item.potassium);

const timestamps =
  historyData.map(item => item.full_timestamp);
  
  setParameters([
  {
    id: 1,
    name: "AIR TEMPERATURE",
    value: String(data.temperature),
    unit: "°C",
    type: "temperature",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: temperatureHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 2,
    name: "AIR HUMIDITY",
    value: String(data.humidity),
    unit: "%",
    type: "humidity",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: humidityHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 3,
    name: "SOIL MOISTURE",
    value: String(data.soilMoisture),
    unit: "%",
    type: "soil",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: soilMoistureHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 4,
    name: "SOIL TEMPERATURE",
    value: String(data.soilTemperature),
    unit: "°C",
    type: "temperature",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: soilTemperatureHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 5,
    name: "SOIL PH",
value: String(
  historyData?.[historyData.length - 1]?.pH || 0
),
    unit: "",
    type: "ph",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: phHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 6,
    name: "SOIL CONDUCTIVITY",
    value: String(data.conductivity),
    unit: "µS/cm",
    type: "conductivity",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: conductivityHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 7,
    name: "NITROGEN",
    value: String(data.nitrogen),
    unit: "mg/kg",
    type: "nitrogen",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: nitrogenHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 8,
    name: "PHOSPHORUS",
    value: String(data.phosphorus),
    unit: "mg/kg",
    type: "phosphorus",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: phosphorusHistory,
    timestamps,
    timestamp: data.timestamp,
  },

  {
    id: 9,
    name: "POTASSIUM",
    value: String(data.potassium),
    unit: "mg/kg",
    type: "potassium",
    rssi: -50,
    voltage: 4.1,
    pingAge: 1,
    history: potassiumHistory,
    timestamps,
    timestamp: data.timestamp,
  },
]);

} catch (error) {
  console.error(error);
}
};
  fetchSensorData();

  const interval = setInterval(fetchSensorData, 3000);

  return () => clearInterval(interval);
}, []);
  useEffect(() => {
    if (!alertsEnabled) return;
    parameters.forEach((param) => {
      const alert = checkThreshold(param);
      if (alert) {
        const key = `${param.id}-${alert.level}`;
        const n = new Date();
        const timeDiff = alertedRef.current[key] ? (n - alertedRef.current[key]) / 1000 : Infinity;
        if (timeDiff > 30) {
          alertedRef.current[key] = n;
          const entry = { id: Date.now() + Math.random(), title: param.name, message: alert.message, level: alert.level, time: n.toLocaleTimeString("en-IN") };
          setAlertLog((prev) => [...prev, entry]);
          setToasts((prev) => [...prev.slice(-2), entry]);
          setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== entry.id)), 5000);
        }
      }
    });
    if (proximity.motion) {
      const key = "proximity-motion";
      const n = new Date();
      const timeDiff = alertedRef.current[key] ? (n - alertedRef.current[key]) / 1000 : Infinity;
      if (timeDiff > 15) {
        alertedRef.current[key] = n;
        const entry = { id: Date.now() + Math.random(), title: "PROXIMITY SENSOR", message: "⚠️ Motion detected in the field!", level: "danger", time: n.toLocaleTimeString("en-IN") };
        setAlertLog((prev) => [...prev, entry]);
        setToasts((prev) => [...prev.slice(-2), entry]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== entry.id)), 5000);
      }
    }
    if (proximity.distance < 30) {
      const key = "proximity-distance";
      const n = new Date();
      const timeDiff = alertedRef.current[key] ? (n - alertedRef.current[key]) / 1000 : Infinity;
      if (timeDiff > 20) {
        alertedRef.current[key] = n;
        const entry = { id: Date.now() + Math.random(), title: "PROXIMITY SENSOR", message: `Object very close: ${proximity.distance} cm`, level: "warning", time: n.toLocaleTimeString("en-IN") };
        setAlertLog((prev) => [...prev, entry]);
        setToasts((prev) => [...prev.slice(-2), entry]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== entry.id)), 5000);
      }
    }
  }, [parameters, proximity]);

  const formatDate = (d) => d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const formatTime = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  function handleAddParameter(p) {
    setParameters((prev) => [...prev, { ...p, id: Date.now(), pingAge: 1, history: generateHistory(p.value) }]);
  }

  function handleRemoveParameter(id) {
    setParameters((prev) => prev.filter((p) => p.id !== id));
  }

  const parametersWithAlerts = parameters.map((p) => ({ ...p, alert: checkThreshold(p) }));
  const totalAlerts = alertLog.length;

  const liveDetailParam =
  detailParam && detailParam.id
    ? parameters.find((p) => p.id === detailParam.id) || detailParam
    : detailParam;

  return (
    <>
      <AlertToast alerts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onAdd={handleAddParameter} />}
      {showBoardModal && <BoardSelectorModal current={selectedBoard} onSelect={setSelectedBoard} onClose={() => setShowBoardModal(false)} />}
      {showAlertPanel && <AlertPanel log={alertLog} onClear={() => setAlertLog([])} onClose={() => setShowAlertPanel(false)} />}
      {showSettings && (
  <SettingsModal
    darkMode={darkMode}
    onToggleDark={(v) => setDarkMode(v)}
    alertsEnabled={alertsEnabled}
    onToggleAlerts={(v) => setAlertsEnabled(v)}
    onClose={() => setShowSettings(false)}
  />
)}
      {detailParam && (
  <DetailModal
    param={liveDetailParam}
    onClose={() => setDetailParam(null)}
  />
)}

     {detailParam === "camera" && (
  <CameraDetailModal
    boardName={selectedBoard.name}
    onClose={() => setDetailParam(null)}
  />
)}

{detailParam === "proximity" && (
  <ProximityDetailModal
    proximity={proximity}
    onClose={() => setDetailParam(null)}
  />
)}

{detailParam &&
  detailParam !== "camera" &&
  detailParam !== "proximity" && (
    <DetailModal
      param={liveDetailParam}
      onClose={() => setDetailParam(null)}
    />
)}
      <div className="app">
        <header className="header">
          <h1>smart agriculture</h1>
          <div className="header-right">
            <AlertBell count={totalAlerts} onClick={() => setShowAlertPanel(true)} />
            <button className="board-badge" onClick={() => setShowBoardModal(true)}>
              <span className="board-badge-icon" style={{ background: selectedBoard.color }}>{selectedBoard.icon}</span>
              {selectedBoard.short}
              <span className="board-badge-chevron">▾</span>
            </button>
            <div className="menu">
              <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
              {menuOpen && (
                <div className="dropdown">
                  <button onClick={() => { setShowAddModal(true); setMenuOpen(false); }}>Add Parameter</button>
                  <button onClick={() => { setShowBoardModal(true); setMenuOpen(false); }}>Change Board</button>
                  <button onClick={() => { setShowAlertPanel(true); setMenuOpen(false); }}>View Alerts</button>
                  <button onClick={() => { setShowSettings(true); setMenuOpen(false); }}>Settings</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content">
          <aside className="sidebar">
            <div className={`sidebar-bg ${fadeIn ? "sidebar-bg--visible" : ""}`}
              style={{ backgroundImage: `url(${SIDEBAR_IMAGES[bgIndex]})` }} />
            <div className="sidebar-overlay" />
            <div className="sidebar-content">
              <h2>ABOUT THE PROJECT</h2>
              <p>Real-time monitoring of temperature, humidity, rainfall and soil moisture using {selectedBoard.name}, Firebase and React.</p>
              <div className="connected-board">
                <div className="connected-dot" />
                <span>Connected to {selectedBoard.name}</span>
              </div>
              {totalAlerts > 0 && (
                <div className="sidebar-alert-summary" onClick={() => setShowAlertPanel(true)}>
                  <span>🔔</span>
                  <span>{totalAlerts} alert{totalAlerts > 1 ? "s" : ""} recorded</span>
                  <span className="sidebar-alert-arrow">→</span>
                </div>
              )}
              <div className="calendar">
                <div className="calendar-icon">📅</div>
                <div className="calendar-date">{formatDate(now)}</div>
                <div className="calendar-time">{formatTime(now)}</div>
              </div>
            </div>
          </aside>

          <main className="grid">
            <CameraCard boardName={selectedBoard.name} onClick={() => setDetailParam("camera")} />
            <ProximityCard
              distance={proximity.distance}
              motionDetected={proximity.motion}
              rssi={proximity.rssi}
              voltage={proximity.voltage}
              pingAge={proximity.pingAge}
              onClick={() => setDetailParam("proximity")}
            />
            {parametersWithAlerts.map((param) => (
              <ParamCard key={param.id} param={param} onRemove={handleRemoveParameter} onClick={() => setDetailParam(param)} />
            ))}
            <div className="card add-card" onClick={() => setShowAddModal(true)}>
              <div className="add-card-inner">
                <span className="add-icon">+</span>
                <span>Add Parameter</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
