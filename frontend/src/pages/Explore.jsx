import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Flame, Gamepad2, Music2, Clapperboard, Trophy, 
  ArrowRight, Play, Clock, Eye, Sparkles 
} from "lucide-react";
// Assuming you have an API call to get all videos
// import { getAllVideos } from "../api/videoApi"; 

const Explore = () => {
  const [videos, setVideos] = useState([]); // This will hold your actual data
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "All", icon: <Flame size={16} /> },
    { name: "Gaming", icon: <Gamepad2 size={16} /> },
    { name: "Music", icon: <Music2 size={16} /> },
    { name: "Movies", icon: <Clapperboard size={16} /> },
    { name: "Sports", icon: <Trophy size={16} /> },
  ];

  // Placeholder for your backend logic
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const res = await getAllVideos();
        // setVideos(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch explore content", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white selection:bg-indigo-500 relative overflow-hidden">
      
      {/* --- ARTISTIC DEPTH GRADIENTS --- */}
      {/* Primary Radial Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.12)_0%,_transparent_70%)] pointer-events-none animate-pulse" />
      {/* Bottom Secondary Glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-16 pb-20 relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            <Sparkles size={12} className="animate-spin-slow" /> Global Trends
          </div>
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">ProjectX</span> <br /> 
            Universe.
          </h1>
          <p className="text-slate-400 max-w-xl font-medium text-lg md:text-xl leading-relaxed">
            High-bitrate immersion curated for the next generation of digital architects.
          </p>
        </div>

        {/* --- CATEGORY SELECTOR --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                activeCategory === cat.name 
                ? "bg-indigo-600 border-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.4)] scale-105" 
                : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* --- VIDEO GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {/* If videos are empty, we can show a artistic skeleton or a "No videos" state */}
          {!loading && videos.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[3rem]">
               <p className="text-slate-600 font-black uppercase tracking-[0.5em]">No transmissions detected</p>
            </div>
          ) : (
            // Replace this with videos.map((video) => ...) when backend is ready
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="group relative">
                
                {/* THUMBNAIL WITH CINEMATIC GLOW */}
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#161616] transition-all duration-700 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] group-hover:-translate-y-3">
                  {/* Under-glow layer */}
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
                  
                  <img 
                    src={`https://picsum.photos/seed/${i + 88}/800/450`} 
                    alt="Video Transmission" 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  
                  {/* HUD STATS */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                    <div className="flex items-center justify-between font-mono text-[10px] font-black tracking-widest text-indigo-400">
                      <span className="flex items-center gap-1"><Eye size={12}/> {Math.floor(Math.random()*900)}K VIEWS</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {i}H AGO</span>
                    </div>
                  </div>

                  {/* GLASSMORPHIC PLAY ICON */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                      <Play size={28} fill="white" className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* CREATOR INFO */}
                <div className="mt-8 flex gap-5 px-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1.5px] flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
                    <div className="w-full h-full bg-[#0F0F0F] rounded-2xl overflow-hidden p-1">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover rounded-xl" alt="Avatar" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors duration-300">
                      ProjectX Technical Deep Dive: Vol. {i} — Immersive Streaming
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">Station_{i*10}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- FOOTER REDIRECT --- */}
        <div className="mt-40 relative py-24 px-12 rounded-[5rem] overflow-hidden border border-white/5 group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-cyan-500/10" />
          {/* Animated Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] group-hover:scale-125 transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Own the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Spotlight.</span>
            </h2>
            <p className="text-slate-400 max-w-lg font-medium text-lg mb-12">
              The algorithm prioritizes quality. Upload your vision and join the elite ranks of ProjectX creators.
            </p>
            <Link 
              to="/dashboard" 
              className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-3xl font-black uppercase text-xs tracking-[0.4em] hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Access Studio <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Explore;