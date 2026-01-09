import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../api/dashboardApi";
import Loader from "../components/Loader";
import "../index.css";

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
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DashboardHeader />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analytics Overview
          </h2>
          <p className="text-gray-600">
            Track your channel performance and engagement metrics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Videos" 
            value={stats?.totalVideos ?? 0}
            icon="📹"
            gradient="from-blue-500 to-blue-600"
          />
          <StatCard 
            title="Total Views" 
            value={stats?.totalVideoViews ?? 0}
            icon="👁️"
            gradient="from-purple-500 to-purple-600"
          />
          <StatCard 
            title="Subscribers" 
            value={stats?.totalSubscribers ?? 0}
            icon="👥"
            gradient="from-green-500 to-green-600"
          />
        </div>

        {/* Additional Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard 
              title="Total Likes" 
              value={stats?.totalLikes ?? 0}
              icon="❤️"
              gradient="from-red-500 to-red-600"
            />
            <StatCard 
              title="Comment Likes" 
              value={stats?.commentLikes ?? 0}
              icon="💬"
              gradient="from-indigo-500 to-indigo-600"
            />
            <StatCard 
              title="Tweet Likes" 
              value={stats?.tweetLikes ?? 0}
              icon="🐦"
              gradient="from-cyan-500 to-cyan-600"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
