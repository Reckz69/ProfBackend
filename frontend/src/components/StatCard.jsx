const StatCard = ({ title, value, icon, gradient = "from-blue-500 to-blue-600" }) => {
  return (
    <div className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradient}`}></div>
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
            {title}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h2>
        </div>
        
        {icon && (
          <div className={`ml-4 p-3 rounded-xl bg-linear-to-br ${gradient} text-white text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        )}
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
        <div className={`w-full h-full bg-linear-to-br ${gradient} rounded-full blur-2xl`}></div>
      </div>
    </div>
  );
};

export default StatCard;
  