interface StatCardProps {
    title: string;
    value: string;
    icon: string;
  }
  
  const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-[#161B70]">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
  
  export default StatCard;
  