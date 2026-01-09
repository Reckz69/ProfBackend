import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../api/dashboardApi";

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

  if (loading) {
    return <p className="p-6 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DashboardHeader />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Videos" value={stats.totalVideos} />
        <StatCard title="Total Views" value={stats.totalViews} />
        <StatCard title="Subscribers" value={stats.totalSubscribers} />
      </div>
    </div>
  );
};

export default Dashboard;
