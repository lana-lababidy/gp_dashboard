import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

 function ChartCard({ data, title }) {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-gray-700 font-bold mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default ChartCard;