const StatCard = ({ title, value }) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-800">
          {value}
        </h2>
      </div>
    );
  };
  
  export default StatCard;
  