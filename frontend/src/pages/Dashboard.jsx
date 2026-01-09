import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import Loader from "../components/Loader";
import { 
  Video, 
  Eye, 
  Users, 
  Heart, 
  MessageSquare, 
  Twitter, 
  TrendingUp, 
  BarChart2, 
  ArrowUpRight
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.data);
      } catch (error) {
        console.error("Dashboard stats error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-slate-200 px-6 py-10 relative overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[0%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">
              <BarChart2 size={14} />
              Performance Insight
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">Studio Dashboard</h2>
            <p className="text-slate-500 font-medium">Welcome back! Here’s what’s happening with your channel.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
              Customize
            </button>
            <button className="px-5 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all">
              Upload Video
            </button>
          </div>
        </div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Uploads" value={stats?.totalVideos} icon={<Video size={22} />} accent="indigo" />
          <StatCard label="Channel Views" value={stats?.totalVideoViews} icon={<Eye size={22} />} accent="blue" />
          <StatCard label="Subscribers" value={stats?.totalSubscribers} icon={<Users size={22} />} accent="cyan" />
        </div>

        {/* Engagement Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Engagement Overview</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InteractionCard label="Video Likes" value={stats?.totalLikes} icon={<Heart size={18} />} trend="+5.2%" />
            <InteractionCard label="Comment Likes" value={stats?.commentLikes} icon={<MessageSquare size={18} />} trend="+2.1%" />
            <InteractionCard label="Tweet Engagement" value={stats?.tweetLikes} icon={<Twitter size={18} />} trend="+12%" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Internal Component: Main Stats */
const StatCard = ({ label, value, icon, accent }) => {
  const themes = {
    indigo: "from-indigo-500/20 to-transparent text-indigo-400 border-indigo-500/20",
    blue: "from-blue-500/20 to-transparent text-blue-400 border-blue-500/20",
    cyan: "from-cyan-500/20 to-transparent text-cyan-400 border-cyan-500/20"
  };

  return (
    <div className="relative group bg-white/5 border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all hover:border-white/20">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${themes[accent]} blur-3xl opacity-20 -mr-16 -mt-16`} />
      <div className="relative flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-2xl bg-white/5 border ${themes[accent]} shadow-2xl`}>{icon}</div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-4xl font-black text-white tabular-nums">{value?.toLocaleString() ?? 0}</h3>
        </div>
      </div>
    </div>
  );
};

/* Internal Component: Small Metrics */
const InteractionCard = ({ label, value, icon, trend }) => (
  <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-all">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-white/5 text-slate-400 group-hover:text-white transition-colors">{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-tight">{label}</p>
        <h4 className="text-xl font-bold text-white tabular-nums">{value?.toLocaleString() ?? 0}</h4>
      </div>
    </div>
    <div className="text-right">
      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
        <TrendingUp size={10} /> {trend}
      </span>
    </div>
  </div>
);

export default Dashboard;