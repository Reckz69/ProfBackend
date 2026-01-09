import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  LogOut, 
  Compass, 
  Home as HomeIcon, 
  Info, 
  ChevronDown, 
  Search, 
  Zap,
  User as UserIcon
} from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-[#050505]/40 backdrop-blur-2xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* --- LEFT: BRAND SINGULARITY --- */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700"></div>
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-white text-black font-black text-2xl italic rotate-3 group-hover:rotate-[15deg] transition-transform duration-500 shadow-2xl">
                  X
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  PROJECT<span className="text-indigo-500">X</span>
                </span>
                <span className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase">Aesthetic Engine</span>
              </div>
            </Link>

            {/* --- CENTER DOCK: NAVIGATION --- */}
            <div className="hidden lg:flex items-center p-1 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/5">
              {[
                { name: "Home", path: "/", icon: <HomeIcon size={14} /> },
                { name: "Explore", path: "/explore", icon: <Compass size={14} /> },
                { name: "About", path: "/about", icon: <Info size={14} /> },
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                      isActive 
                        ? "text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10" 
                        : "text-slate-500 hover:text-indigo-400"
                    }`
                  }
                >
                  {item.icon} {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* --- RIGHT: CREATOR HUB --- */}
          <div className="flex items-center gap-6">
            
            {/* Artistic Search Icon */}
            <button className="p-3 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                <Search size={20} />
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                {/* HUD Style Studio Button */}
                <Link 
                  to="/dashboard" 
                  className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] group shadow-[0_0_30px_rgba(79,70,229,0.1)]"
                >
                  <Zap size={14} className="group-hover:animate-pulse" />
                  Studio
                </Link>

                {/* Profile Portal */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 p-1.5 rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group"
                  >
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                        <img
                            src={user?.avataar || `https://ui-avatars.com/api/?name=${user?.username}`}
                            alt="Profile"
                            className="relative w-10 h-10 rounded-xl object-cover border border-white/10"
                        />
                    </div>
                    <ChevronDown size={14} className={`text-slate-500 transition-transform duration-500 mr-1 ${isProfileOpen ? 'rotate-180 text-white' : ''}`} />
                  </button>

                  {/* Glassmorphic Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-6 w-64 bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-3 z-[110] animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="px-5 py-4 border-b border-white/5 mb-2">
                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">Transmission Active</p>
                        <p className="text-sm font-bold text-white truncate">{user?.fullName || user?.username}</p>
                      </div>

                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                      >
                        <LayoutDashboard size={18} className="text-indigo-500" /> Control Center
                      </Link>
                      
                      <button 
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }} 
                        className="w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-2xl transition-all mt-1"
                      >
                        <LogOut size={18} /> Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="relative group px-8 py-3.5 overflow-hidden rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.3em] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-indigo-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors">Join Grid</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;