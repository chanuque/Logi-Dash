import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, Package, AlertTriangle, CheckCircle, LayoutDashboard, LogOut, List, BarChart3, Plus, X, User, Lock, Loader2, Inbox } from 'lucide-react';

// --- LOGIN COMPONENT ---
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@logidash.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to backend. Is your server running on port 5000?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Truck className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Logi-Dash</h2>
        <p className="text-center text-gray-500 mb-8">Supply Chain Intelligence Platform</p>
        
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
          <button 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Authenticating...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Demo: admin@logidash.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

// --- MODAL COMPONENT ---
const AddShipmentModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      id: formData.get('id'),
      origin: formData.get('origin'),
      dest: formData.get('dest'),
      status: formData.get('status'),
      eta: formData.get('eta'),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add New Shipment</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tracking ID</label>
            <input name="id" required placeholder="TRK-XXXX" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <input name="origin" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input name="dest" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>In Transit</option>
              <option>Customs Hold</option>
              <option>Delivered</option>
              <option>Exception</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ETA</label>
            <input name="eta" type="date" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2">
            Confirm Shipment
          </button>
        </form>
      </div>
    </div>
  );
};

// --- STAT CARD COMPONENT ---
const StatCard = ({ title, value, icon: Icon, color, trend, loading }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-gray-800 flex items-center gap-2">
        {loading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : value}
      </h3>
      <p className="text-xs mt-2 font-medium text-green-600">{trend} from last week</p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

// --- EMPTY STATE COMPONENT ---
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
    <div className="bg-gray-50 p-4 rounded-full mb-4">
      <Inbox className="w-8 h-8 text-gray-300" />
    </div>
    <p className="text-lg font-medium text-gray-500">No shipments found</p>
    <p className="text-sm">Add a new shipment to get started.</p>
  </div>
);

// --- MAIN APP ---
const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [shipments, setShipments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH DATA FROM BACKEND
  const fetchData = async () => {
    setLoading(true);
    try {
      const shipmentRes = await fetch('http://localhost:5000/api/shipments');
      const ordersRes = await fetch('http://localhost:5000/api/orders');
      
      if (shipmentRes.ok && ordersRes.ok) {
        setShipments(await shipmentRes.json());
        setOrders(await ordersRes.json());
      }
    } catch (err) {
      console.error("Backend Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  // ADD SHIPMENT TO BACKEND
  const handleAddShipment = async (newOrder) => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (res.ok) {
        fetchData(); // Refresh data immediately
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("Failed to connect to server");
    }
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      setUser(null);
      setShipments([]);
      setOrders([]);
    }
  };

  // 1. SHOW LOGIN SCREEN IF NOT LOGGED IN
  if (!user) return <LoginScreen onLogin={setUser} />;

  // 2. SHOW DASHBOARD IF LOGGED IN
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2">
          <Truck className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold tracking-wider">LOGI<span className="text-blue-400">DASH</span></h1>
            <p className="text-xs text-gray-400">v1.0 Pro</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {['dashboard', 'shipments', 'analytics'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {tab === 'dashboard' && <LayoutDashboard className="w-5 h-5" />}
              {tab === 'shipments' && <List className="w-5 h-5" />}
              {tab === 'analytics' && <BarChart3 className="w-5 h-5" />}
              {tab}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full px-4 py-2 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-white/90">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab} Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Welcome, {user.name}</span>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-blue-200">CG</div>
          </div>
        </header>

        <div className="p-8">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Active Shipments" value={orders.length} loading={loading} icon={Package} color="bg-blue-500" trend="+12%" />
                <StatCard title="Avg. Transit" value="4.2 Days" loading={loading} icon={Truck} color="bg-emerald-500" trend="-0.5" />
                <StatCard title="Exceptions" value="3" loading={loading} icon={AlertTriangle} color="bg-orange-500" trend="+2%" />
                <StatCard title="On-Time" value="98.5%" loading={loading} icon={CheckCircle} color="bg-indigo-500" trend="+0.8%" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-gray-700">Shipment Velocity</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={shipments}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={{fill: '#F3F4F6'}} />
                        <Bar dataKey="shipments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-gray-700">Recent Activity</h3>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
                    ) : orders.length === 0 ? (
                      <EmptyState />
                    ) : (
                      orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                          <div className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{order.id}</p>
                            <p className="text-xs text-gray-500">{order.status} • {order.origin}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SHIPMENTS VIEW */}
          {activeTab === 'shipments' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Shipment Manifest</h3>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
                  <Plus className="w-4 h-4" /> New Shipment
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>
              ) : orders.length === 0 ? (
                <EmptyState />
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr><th className="px-6 py-3">ID</th><th className="px-6 py-3">Origin</th><th className="px-6 py-3">Dest</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">ETA</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4">{order.origin}</td>
                        <td className="px-6 py-4">{order.dest}</td>
                        <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{order.status}</span></td>
                        <td className="px-6 py-4">{order.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          
          {/* ANALYTICS VIEW */}
          {activeTab === 'analytics' && (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-gray-300 animate-in fade-in">
              <BarChart3 className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600">Analytics Module</h3>
              <p className="text-gray-400">Advanced forecasting coming in v2.0</p>
            </div>
          )}
        </div>
      </main>

      {/* MODAL OVERLAY */}
      <AddShipmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddShipment} />
    </div>
  );
};

export default App;