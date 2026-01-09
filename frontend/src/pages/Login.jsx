import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, Loader2, ArrowRight, Sparkles, ShieldCheck, Fingerprint } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await loginUser({ email, password });
      const userData = res.data?.data?.user || res.data?.data;
      
      login(userData);
      toast.success(`Access Granted: Welcome ${userData.username}`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 relative overflow-hidden font-sans">
      
      {/* --- GOD-LEVEL BACKGROUND ENGINE --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Animated Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)] blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] blur-[120px]" />
      
      {/* Structural Accents */}
      <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full max-w-[480px] z-10 relative">
        
        {/* --- BRANDING HUD --- */}
        <div className="flex flex-col items-center mb-12 group">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all duration-700" />
            <div className="relative w-20 h-20 bg-white text-black rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-[15deg] transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
               <span className="font-black text-4xl italic tracking-tighter">X</span>
            </div>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
            Project<span className="text-indigo-500">X</span> <span className="text-slate-700">Auth</span>
          </h1>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
             <Fingerprint size={12} className="text-indigo-400" /> Biometric Identity Link Active
          </div>
        </div>

        {/* --- LOGIN NEXUS CARD --- */}
        <div className="relative group/card">
          {/* Outer Glow Edge */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[3rem] opacity-50" />
          
          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-white/5 overflow-hidden">
            {/* Inner Decorative Mesh */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              {/* Input: Email */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Universal ID</label>
                <div className="relative group/input">
                  <Mail className="absolute left-5 top-4.5 text-slate-600 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="CREATOR@PROJECTX.COM"
                    className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 text-sm font-bold uppercase tracking-widest text-white placeholder:text-slate-800 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Input: Password */}
              <div className="space-y-3">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Access Key</label>
                  <Link to="/forgot" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-white transition-colors">Recover</Link>
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-5 top-4.5 text-slate-600 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 text-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-indigo-600 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500" />
                <div className="relative w-full py-5 bg-white text-black group-hover/btn:text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl transition-colors duration-500 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Verify Identity
                      <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Footer Logic */}
            <div className="mt-12 flex flex-col items-center gap-6">
               <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                  New Transmissions? <Link to="/register" className="text-white hover:text-indigo-400 underline decoration-indigo-500 underline-offset-4">Register Station</Link>
               </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-10 flex flex-col items-center gap-4 opacity-40">
           <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full">
              <ShieldCheck size={14} className="text-indigo-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Quantum-Encrypted Session</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;