const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Full-Stack Construction...");

// Helper to create directory
const createDir = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log(`📂 Created ${dir}`);
    }
};

// Helper to write file
const writeFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${filePath}`);
};

// --- 1. SETUP BACKEND ---
createDir('backend');

const backendPackage = {
  "name": "logi-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
};

// Note: We use double backslashes to escape template literals correctly for the written file
const serverCode = `
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- MOCK DATABASE ---
const shipmentData = [
  { name: 'Mon', shipments: 12, delays: 2 },
  { name: 'Tue', shipments: 19, delays: 1 },
  { name: 'Wed', shipments: 15, delays: 4 },
  { name: 'Thu', shipments: 22, delays: 2 },
  { name: 'Fri', shipments: 28, delays: 5 },
  { name: 'Sat', shipments: 14, delays: 1 },
  { name: 'Sun', shipments: 8, delays: 0 },
];

const recentOrders = [
  { id: 'TRK-9012', origin: 'Colombo, LK', dest: 'London, UK', status: 'In Transit', eta: '2023-11-20' },
  { id: 'TRK-9013', origin: 'Chennai, IN', dest: 'Colombo, LK', status: 'Customs Hold', eta: '2023-11-18' },
  { id: 'TRK-9014', origin: 'Singapore, SG', dest: 'Kandy, LK', status: 'Delivered', eta: '2023-11-15' },
  { id: 'TRK-9015', origin: 'Colombo, LK', dest: 'Dubai, UAE', status: 'In Transit', eta: '2023-11-22' },
];

// --- API ENDPOINTS ---
app.get('/api/shipments', (req, res) => {
    res.json(shipmentData);
});

app.get('/api/orders', (req, res) => {
    res.json(recentOrders);
});

app.listen(PORT, () => {
    console.log(\`🔥 Backend Server running on http://localhost:\${PORT}\`);
});
`;

writeFile('backend/package.json', JSON.stringify(backendPackage, null, 2));
writeFile('backend/server.js', serverCode);


// --- 2. SETUP FRONTEND ---
createDir('frontend');
createDir('frontend/src');

const frontendPackage = {
  "name": "logi-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^5.0.0"
  }
};

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Logi-Dash Full Stack</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body { background-color: #f9fafb; }`;

const appJsx = `import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, Package, AlertTriangle, CheckCircle, LayoutDashboard, LogOut, Search, Bell } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
      <p className="text-xs mt-2 font-medium text-green-600">{trend} from last week</p>
    </div>
    <div className={\`p-3 rounded-lg \${color}\`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const App = () => {
  const [shipments, setShipments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from our Backend API
    const fetchData = async () => {
      try {
        const shipmentRes = await fetch('http://localhost:5000/api/shipments');
        const ordersRes = await fetch('http://localhost:5000/api/orders');
        
        if (!shipmentRes.ok || !ordersRes.ok) throw new Error('Backend not connected');
        
        const shipmentData = await shipmentRes.json();
        const ordersData = await ordersRes.json();
        
        setShipments(shipmentData);
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Backend Error:", err);
        setError("⚠️ Backend disconnected. Ensure server.js is running on port 5000.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6"><h1 className="text-xl font-bold tracking-wider">LOGI<span className="text-blue-400">DASH</span></h1></div>
        <nav className="flex-1 px-4 py-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"><LayoutDashboard className="w-5 h-5" />Dashboard</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">Operations Overview</h2>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">CG</div>
        </header>

        <div className="p-8 space-y-8">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Active Shipments" value={loading ? "..." : "1,248"} icon={Package} color="bg-blue-500" trend="+12%" />
            <StatCard title="Avg. Transit" value={loading ? "..." : "4.2 Days"} icon={Truck} color="bg-emerald-500" trend="-0.5" />
            <StatCard title="Exceptions" value={loading ? "..." : "23"} icon={AlertTriangle} color="bg-orange-500" trend="+2%" />
            <StatCard title="On-Time" value={loading ? "..." : "98.5%"} icon={CheckCircle} color="bg-indigo-500" trend="+0.8%" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Weekly Shipment Volume (Live Data)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shipments}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="shipments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="delays" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100"><h3 className="text-lg font-bold text-gray-700">Recent Shipments</h3></div>
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500"><tr><th className="px-6 py-3">Tracking ID</th><th className="px-6 py-3">Origin</th><th className="px-6 py-3">Status</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.origin}</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;`;

// WRITE FILES
writeFile('frontend/package.json', JSON.stringify(frontendPackage, null, 2));
writeFile('frontend/vite.config.js', viteConfig);
writeFile('frontend/tailwind.config.js', tailwindConfig);
writeFile('frontend/postcss.config.js', postcssConfig);
writeFile('frontend/index.html', indexHtml);
writeFile('frontend/src/main.jsx', mainJsx);
writeFile('frontend/src/index.css', indexCss);
writeFile('frontend/src/App.jsx', appJsx);

console.log("🎉 CONSTRUCTION COMPLETE!");
console.log("Now you must run TWO terminals:");
console.log("1. cd backend -> npm install -> npm start");
console.log("2. cd frontend -> npm install -> npm run dev");