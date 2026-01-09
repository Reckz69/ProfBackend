import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800">
        <Navbar />
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default MainLayout;
