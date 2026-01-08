import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;
