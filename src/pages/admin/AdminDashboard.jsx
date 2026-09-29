import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Images, 
  Home as HomeIcon, 
  MessageSquare, 
  Settings as SettingsIcon, 
  LogOut, 
  Camera, 
  ShieldCheck,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

// Tabs
import AdminPortfolio from './tabs/AdminPortfolio';
import AdminHome from './tabs/AdminHome';
import AdminMessages from './tabs/AdminMessages';
import AdminSettings from './tabs/AdminSettings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error(err);
    }
  }

  const navItems = [
    { id: 'home', label: 'Home Page & Slideshow', icon: HomeIcon },
    { id: 'portfolio', label: 'Portfolio Gallery Photos', icon: Images },
    { id: 'messages', label: 'Client Booking Enquiries', icon: MessageSquare },
    { id: 'settings', label: 'Studio Info & Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#241C18] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#241C18]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8D9B7A]/15 text-[#8D9B7A] rounded-xl flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold text-[#241C18]">SACHIN GHONGADE</h1>
                <span className="px-2 py-0.5 bg-[#8D9B7A]/15 text-[#8D9B7A] text-[10px] uppercase tracking-wider font-semibold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Admin Control Center
                </span>
              </div>
              <p className="text-[11px] text-[#241C18]/60 font-medium">Sachin Ghongade Photo Studio • Admin Panel</p>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10 text-xs text-[#241C18]/80">
              <User className="w-3.5 h-3.5 text-[#8D9B7A]" />
              <span className="font-medium truncate max-w-[150px]">{currentUser?.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border border-red-200"
              title="Sign out of Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-[#241C18]/10 shadow-sm sticky top-24 space-y-1">
            <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#241C18]/40">
              Admin Navigation Menu
            </div>
            
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8D9B7A] text-white shadow-md shadow-[#8D9B7A]/25'
                      : 'hover:bg-[#F8F5EF] text-[#241C18]/80 hover:text-[#241C18]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8D9B7A]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#241C18]/10 px-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-[#F8F5EF] hover:bg-[#F8F5EF]/80 text-[#241C18] text-xs font-medium rounded-xl flex items-center justify-center gap-2 border border-[#241C18]/10 transition-colors"
              >
                <span>View Live Website ↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-grow w-full min-w-0">
          <TabErrorBoundary key={activeTab}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'home' && <AdminHome onNavigateTab={(tab) => setActiveTab(tab)} />}
              {activeTab === 'portfolio' && <AdminPortfolio />}
              {activeTab === 'messages' && <AdminMessages />}
              {activeTab === 'settings' && <AdminSettings />}
            </motion.div>
          </TabErrorBoundary>
        </main>

      </div>
    </div>
  );
}

class TabErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Tab Error Boundary Caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-white rounded-2xl border border-amber-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            ⚠️
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241C18]">Section Needs Refresh</h3>
          <p className="text-xs text-[#241C18]/60">An unexpected error occurred while loading this tab.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-5 py-2.5 bg-[#8D9B7A] text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer"
          >
            Reload Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
