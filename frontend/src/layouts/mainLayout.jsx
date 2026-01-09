// MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />
      {/* pt-28 (112px) pushes the content down. 
          The Navbar is h-16 (64px), so this gives you 
          plenty of breathing room.
      */}
      <main className="pt-28 pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;