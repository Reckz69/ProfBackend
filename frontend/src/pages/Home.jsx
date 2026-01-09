import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Play, 
  TrendingUp, 
  Users, 
  Search, 
  ChevronRight,
  MonitorPlay,
  Zap,
  Globe,
  Radio,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 relative overflow-hidden">
      
      {/* --- GOD-LEVEL BACKGROUND ENGINE --- */}
      {/* 1. The Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 2. Kinetic Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_65%)] blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_65%)] blur-[120px]" />
      
      {/* 3. Floating Geometric Accents */}
      <div className="absolute top-[20%] right-[10%] w-[1px] h-64 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute top-1/2 left-0 w-32 h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* --- HERO SECTION: THE SINGULARITY --- */}
        <div className="relative mb-48">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-indigo-400 text-[10px] font-black tracking-[0.5em] uppercase mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Radio size={14} className="animate-pulse" /> Transmission V2.0 Active
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-[12vw] lg:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.75] mb-12 mix-blend-difference">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">The Power</span>
                <span className="block text-indigo-500 relative">
                    of Flow.
                    <Zap className="absolute -right-20 top-0 text-cyan-400 hidden lg:block animate-bounce-slow" size={80} />
                </span>
              </h1>

              <p className="text-xl md:text-3xl font-light text-slate-400 max-w-2xl leading-relaxed mb-12 tracking-tight">
                Beyond streaming. We've engineered a <span className="text-white font-bold italic">Neural Video Engine</span> for the next generation of digital architects.
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <Link
                  to="/explore"
                  className="group relative px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl overflow-hidden transition-all duration-500 hover:bg-indigo-600 hover:text-white"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Nexus <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
                
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-5 backdrop-blur-md">
                        <Search className="text-slate-500 mr-4" size={20} />
                        <input 
                            type="text" 
                            placeholder="Find Transmissions..." 
                            className="bg-transparent border-none outline-none text-sm font-bold w-64 placeholder:text-slate-700"
                        />
                    </div>
                </div>
              </div>
            </div>

            {/* Cinematic HUD Preview */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/10 group">
                 <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent z-10" />
                 <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt="Abstract Art"
                 />
                 <div className="absolute bottom-10 left-10 z-20">
                    <p className="text-[10px] font-black tracking-[0.5em] text-cyan-400 mb-2 uppercase">Featured Origin</p>
                    <h2 className="text-3xl font-black italic uppercase leading-none">Cyberpunk <br /> Synthesis</h2>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PERFORMANCE STATS: OS STYLE --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-48">
          <StatHUD icon={<MonitorPlay size={20} />} value="4K" label="Resolution" />
          <StatHUD icon={<Globe size={20} />} value="CDN" label="Global Edge" />
          <StatHUD icon={<TrendingUp size={20} />} value="LIVE" label="Real-time" />
          <StatHUD icon={<Zap size={20} />} value="0ms" label="Latency" />
        </div>

        {/* --- DYNAMIC CONTENT GRID --- */}
        <div className="space-y-16 relative">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div>
              <p className="text-indigo-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2">Algorithm Pick</p>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">Hyper <span className="text-slate-500">Trends</span></h2>
            </div>
            <Link to="/explore" className="group flex items-center gap-2 text-xs font-black tracking-widest uppercase text-slate-400 hover:text-white transition-colors">
              Enter the Nexus <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <VideoNexusCard 
                thumbnail="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000" 
                title="The Architecture of Tomorrow" 
                creator="Studio_X" 
                views="2.4M" 
            />
            <VideoNexusCard 
                thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000" 
                title="Reactive Engine Patterns" 
                creator="Dev_Core" 
                views="892K" 
            />
            <VideoNexusCard 
                thumbnail="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000" 
                title="Synthwave Visualizer Pro" 
                creator="Lumina" 
                views="1.1M" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- ARTISTIC SUB-COMPONENTS --- */

const StatHUD = ({ icon, value, label }) => (
  <div className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] transition-all duration-500">
    <div className="absolute top-4 right-4 text-indigo-500/30 group-hover:text-indigo-500 transition-colors">
        {icon}
    </div>
    <p className="text-4xl font-black italic tracking-tighter mb-1">{value}</p>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{label}</p>
  </div>
);

const VideoNexusCard = ({ thumbnail, title, creator, views }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 bg-[#161616] transition-all duration-700 group-hover:border-indigo-500/50 group-hover:-translate-y-3">
      <img src={thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
      
      {/* HUD OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
        <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Play size={20} fill="white" />
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase">Stream Now</span>
        </div>
      </div>
    </div>
    
    <div className="px-4">
        <h3 className="font-black italic text-xl uppercase tracking-tighter mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
            {title}
        </h3>
        <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{creator}</p>
            <p className="text-[10px] font-mono font-bold text-indigo-500/60">{views} TRANSMISSIONS</p>
        </div>
    </div>
  </div>
);

export default Home;