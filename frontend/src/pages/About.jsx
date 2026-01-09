import { 
  Cpu, Layers, ShieldCheck, BarChart3, Zap, ArrowRight, 
  Server, Monitor, Sparkles, Box, Radio, Trello
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 pb-32 relative overflow-hidden font-sans">
      
      {/* --- GOD-LEVEL AMBIENT BACKGROUND --- */}
      {/* Cinematic Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Floating Interactive Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_60%)] blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_60%)] blur-[120px]" />
      
      {/* Grid Floor Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* --- KINETIC HERO SECTION --- */}
        <div className="mb-40 text-center md:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-indigo-400 text-[10px] font-black tracking-[0.5em] uppercase mb-10 animate-bounce-slow">
            <Sparkles size={14} className="text-cyan-400" /> System Genesis v2.0
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-black italic tracking-tighter uppercase leading-[0.75] mb-12">
            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">Infinite</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">ProjectX.</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-end justify-between">
            <p className="text-slate-400 max-w-xl text-xl md:text-2xl font-light leading-relaxed tracking-tight">
              A high-precision video engine forged in the MERN stack, designed to bridge the gap between <span className="text-white font-bold">creative vision</span> and <span className="text-white font-bold">global scale.</span>
            </p>
            <div className="hidden md:block h-px w-32 bg-gradient-to-r from-indigo-500 to-transparent mb-4" />
          </div>
        </div>

        {/* --- BENTO ARCHITECTURE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-48">
          
          {/* Main Engine: Frontend */}
          <div className="lg:col-span-2 group relative h-[500px] rounded-[4rem] overflow-hidden bg-gradient-to-b from-white/10 to-transparent p-[1px] hover:scale-[1.01] transition-all duration-700">
            <div className="absolute inset-0 bg-[#0A0A0A] rounded-[4rem]" />
            <div className="relative h-full p-12 flex flex-col justify-between overflow-hidden">
               {/* Decorative Element */}
               <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/40 transition-colors duration-1000" />
               
               <div className="z-10">
                 <Monitor size={48} className="text-indigo-500 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                 <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Neural Interface</h3>
                 <p className="text-slate-500 font-medium">Built with React 18 & Framer Motion for liquid-smooth interactions.</p>
               </div>

               <div className="z-10 grid grid-cols-2 gap-4">
                  <TechLabel label="Virtual DOM" />
                  <TechLabel label="Tailwind Core" />
                  <TechLabel label="Context Rehydration" />
                  <TechLabel label="GPU Acceleration" />
               </div>
            </div>
          </div>

          {/* Core Heart: Backend */}
          <div className="lg:col-span-2 group relative h-[500px] rounded-[4rem] overflow-hidden bg-gradient-to-b from-white/10 to-transparent p-[1px] hover:scale-[1.01] transition-all duration-700">
            <div className="absolute inset-0 bg-[#0A0A0A] rounded-[4rem]" />
            <div className="relative h-full p-12 flex flex-col justify-between">
               <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/30 transition-colors duration-1000" />
               
               <div>
                 <Server size={48} className="text-cyan-400 mb-8" />
                 <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Core Singularity</h3>
                 <p className="text-slate-500 font-medium">Node.js event-loop architecture handling millions of concurrent transmissions.</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <TechLabel label="Express.js" />
                  <TechLabel label="JWT Encryption" />
                  <TechLabel label="Cloudinary SDK" />
                  <TechLabel label="MongoDB Atlas" />
               </div>
            </div>
          </div>
        </div>

        {/* --- PERFORMANCE HUD SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-48">
          <FeatureHUD 
            icon={<ShieldCheck size={32} />} 
            title="Ironclad Security" 
            desc="Stateless Auth via HTTP-only Cookies & JWT."
            color="indigo"
          />
          <FeatureHUD 
            icon={<Radio size={32} />} 
            title="Active Streaming" 
            desc="Low-latency VOD processing for instant playback."
            color="cyan"
          />
          <FeatureHUD 
            icon={<Box size={32} />} 
            title="Asset Pipeline" 
            desc="Automatic optimization for 4K video assets."
            color="purple"
          />
        </div>

        {/* --- THE GOD CTA --- */}
        <div className="relative py-32 rounded-[5rem] overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-600 group-hover:bg-indigo-500 transition-colors duration-700" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="relative z-10 text-center px-6">
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-10 leading-none">
              The Future <br /> Is <span className="text-black">ProjectX.</span>
            </h2>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 rounded-3xl font-black uppercase text-xs tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
            >
              Enter the Studio <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

/* --- ARTISTIC HELPERS --- */

const TechLabel = ({ label }) => (
  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{label}</span>
  </div>
);

const FeatureHUD = ({ icon, title, desc, color }) => (
  <div className="group flex flex-col items-center text-center">
    <div className={`w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-${color}-500/50 transition-all duration-700 relative`}>
      <div className={`absolute inset-0 bg-${color}-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className={`text-${color}-400 relative z-10`}>{icon}</div>
    </div>
    <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">{title}</h4>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default About;