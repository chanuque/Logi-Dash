const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- MOCK DATABASE ---
let shipmentData = [
  { name: 'Mon', shipments: 12, delays: 2 },
  { name: 'Tue', shipments: 19, delays: 1 },
  { name: 'Wed', shipments: 15, delays: 4 },
  { name: 'Thu', shipments: 22, delays: 2 },
  { name: 'Fri', shipments: 28, delays: 5 },
  { name: 'Sat', shipments: 14, delays: 1 },
  { name: 'Sun', shipments: 8, delays: 0 },
];

let recentOrders = [
  { id: 'TRK-9012', origin: 'Colombo, LK', dest: 'London, UK', status: 'In Transit', eta: '2023-11-20' },
  { id: 'TRK-9013', origin: 'Chennai, IN', dest: 'Colombo, LK', status: 'Customs Hold', eta: '2023-11-18' },
  { id: 'TRK-9014', origin: 'Singapore, SG', dest: 'Kandy, LK', status: 'Delivered', eta: '2023-11-15' },
  { id: 'TRK-9015', origin: 'Colombo, LK', dest: 'Dubai, UAE', status: 'In Transit', eta: '2023-11-22' },
];

// --- ROUTES ---

// 1. LOGIN API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Simple mock validation (In real app, check DB)
    if (email === 'admin@logidash.com' && password === 'admin123') {
        res.json({ success: true, user: { name: 'Chanuque G.', role: 'Ops Manager' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// 2. GET DATA
app.get('/api/shipments', (req, res) => res.json(shipmentData));
app.get('/api/orders', (req, res) => res.json(recentOrders));

// 3. ADD SHIPMENT
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    // Validation: Ensure ID exists
    if (!newOrder.id) return res.status(400).json({ message: "Missing ID" });
    
    recentOrders.unshift(newOrder); // Add to top
    console.log("📦 Shipment Created:", newOrder.id);
    res.json({ message: "Order added", order: newOrder });
});

app.listen(PORT, () => {
    console.log(`🔥 Backend Server running on http://localhost:${PORT}`);
});