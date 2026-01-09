import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.js";
import { 
  UserPlus, Mail, Lock, User, 
  Loader2, ArrowRight, Camera, 
  Sparkles, ShieldCheck, Fingerprint, Atom
} from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "" });
  const [avataar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (avataar) data.append("avataar", avataar);

    try {
      await registerUser(data);
      toast.success("Station Registered. Welcome to the Network.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration sequence failed.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-16 relative overflow-hidden font-sans">
      
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="w-full max-w-[560px] z-10 relative">
        
        {/* --- HEADER HUD --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase mb-6">
            <Atom size={14} className="animate-spin-slow" /> Initialize Creator Protocol
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Register <span className="text-indigo-500">Station</span>
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Connect your identity to the ProjectX Grid.</p>
        </div>

        {/* --- MAIN INTERFACE CARD --- */}
        <div className="relative group/card">
          <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[3.5rem] opacity-30 group-hover/card:opacity-60 transition-opacity" />
          
          <div className="relative bg-[#0A0A0A]/90 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 border border-white/5 shadow-2xl overflow-hidden">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* --- AVATAR UPLINK --- */}
              <div className="flex flex-col items-center group/avataar">
                <div className="relative">
                  <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover/avataar:opacity-100 transition-opacity" />
                  <div className="relative w-28 h-28 rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover/avataar:border-indigo-500/50 rotate-3 group-hover/avataar:rotate-0">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover scale-110" />
                    ) : (
                      <User size={40} className="text-slate-700" />
                    )}
                    <label className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center opacity-0 group-hover/avataar:opacity-100 cursor-pointer transition-all">
                      <Camera size={24} className="text-white" />
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl text-black shadow-xl">
                    <UserPlus size={16} />
                  </div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mt-6">Visual Identifier</p>
              </div>

              {/* --- DATA INPUTS --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HUDInput label="Legal Alias" placeholder="JOHN DOE" icon={<User size={16}/>} onChange={(val) => setFormData({...formData, fullName: val})} />
                <HUDInput label="Network Tag" placeholder="CREATOR_01" icon={<Fingerprint size={16}/>} onChange={(val) => setFormData({...formData, username: val})} />
              </div>

              <HUDInput label="Uplink Email" placeholder="CORE@NETWORK.COM" icon={<Mail size={16}/>} type="email" onChange={(val) => setFormData({...formData, email: val})} />
              <HUDInput label="Access Key" placeholder="••••••••" icon={<Lock size={16}/>} type="password" onChange={(val) => setFormData({...formData, password: val})} />

              {/* --- ACTION BUTTON --- */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-indigo-600 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500" />
                <div className="relative w-full py-5 bg-white text-black group-hover/btn:text-white font-black uppercase text-xs tracking-[0.5em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-3">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      Initialize Origin
                      <ArrowRight size={18} className="group-hover/btn:translate-x-3 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* --- CROSS-LINK --- */}
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                Already Registered? <Link to="/login" className="text-white hover:text-indigo-400 underline decoration-indigo-500 underline-offset-4">Relink Station</Link>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECURITY FOOTER --- */}
        <div className="mt-12 flex justify-center opacity-30">
           <div className="flex items-center gap-3 px-5 py-2.5 border border-white/10 rounded-full bg-white/5">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Secure MERN Pipeline Active</span>
           </div>
        </div>
      </div>
    </div>
  );
};

/* --- ARTISTIC INPUT HELPER --- */
const HUDInput = ({ label, placeholder, icon, type = "text", onChange }) => (
  <div className="space-y-2.5">
    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 ml-1">{label}</label>
    <div className="relative group/in">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/in:text-indigo-400 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-6 py-4.5 bg-white/[0.03] border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 text-[11px] font-bold uppercase tracking-widest text-white placeholder:text-slate-800 transition-all"
        required
      />
    </div>
  </div>
);

export default Register;