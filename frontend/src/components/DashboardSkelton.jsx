const SkeletonBox = () => (
    <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
  );
  
  const DashboardSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <SkeletonBox />
        <SkeletonBox />
        <SkeletonBox />
      </div>
    );
  };
  
  export default DashboardSkeleton;
  