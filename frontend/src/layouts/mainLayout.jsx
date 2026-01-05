import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <h1>Layout is Loading!</h1> {/* Add this */}
      <main className="max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;
