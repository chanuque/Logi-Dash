🚚 Logi-Dash: Supply Chain Analytics Platform

A full-stack logistics dashboard designed to visualize shipment velocity, track exceptions, and manage delivery performance in real-time.

🚀 Features

Real-Time Analytics: Visualizes active shipments, transit times, and on-time delivery rates.

Secure Authentication: Role-based login system (Demo Mode).

Shipment Management: Interactive table to view, filter, and add new shipments.

Interactive Charts: Dynamic data visualization powered by Recharts.

Export Capability: Download shipment manifests as CSV.

🛠️ Tech Stack

Frontend:

React.js (Vite)

Tailwind CSS (Styling)

Lucide React (Icons)

Recharts (Data Visualization)

Backend:

Node.js

Express.js (REST API)

CORS (Middleware)

📦 Installation & Setup Guide

This project uses a Monorepo structure, meaning both the Frontend and Backend are in this single repository. You will need to run two terminals simultaneously.

Prerequisites

Node.js (v16 or higher) installed.

Step 1: Clone the Repository

git clone [https://github.com/chanuque/Logi-Dash.git](https://github.com/chanuque/Logi-Dash.git)
cd logi-dash


Step 2: Install Dependencies

You must install dependencies for both the backend and frontend folders.

1. Backend Setup:

cd backend
npm install


2. Frontend Setup:
(Open a new terminal or go back to root)

cd ../frontend
npm install


🏃‍♂️ How to Run

To run the full application, you need two separate terminals open.

Terminal 1: Start the Backend API

cd backend
npm start


You should see: 🔥 Backend Server running on http://localhost:5000

Terminal 2: Start the Frontend UI

cd frontend
npm run dev


You should see: ➜ Local: http://localhost:5173

Open your browser and go to: http://localhost:5173

🔑 Demo Credentials

To access the dashboard, use the following demo account:

Email: admin@logidash.com

Password: admin123

🔮 Future Roadmap

[ ] Integration with MongoDB for persistent storage.

[ ] User role management (Admin vs. Driver).

[ ] Real-time map integration (Google Maps API).

Built by Chanuque