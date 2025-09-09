import React from "react";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
  LineChart, Line
} from "recharts";

const dataBar = [
  { name: "Week 1", value: 20 },
  { name: "Week 2", value: 25 },
  { name: "Week 3", value: 22 },
  { name: "Week 4", value: 28 },
];


const dataPie = [
  { name: "Type A", value: 400, color: "#0088FE" },
  { name: "Type B", value: 300, color: "#00C49F" },
  { name: "Type C", value: 300, color: "#FFBB28" },
];

const dataLine = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 6 },
  { month: "Mar", value: 4 },
  { month: "Apr", value: 7 },
];

 function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card title="Donors" value="785" />
        <Card title="Beneficiary Organization" value="25" />
        <Card title="Total Tasks" value="120" />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card title="Completed Tasks" value="95" />
        <Card title="Most Funded Request" value="23" />
        <Card title="Completed Requests" value="1153" />
      </div>

      <div className="grid grid-cols-3 gap-6">
      
        <ChartCard title="Average Velysamy">
  <LineChart width={250} height={150} data={dataLine} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" tick={{ fill: "#8884d8" }} />
    <YAxis tick={{ fill: "#8884d8" }} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="value"
      stroke="#21a179" 
      strokeWidth={3}
      dot={{ stroke: "#21a179", strokeWidth: 3, r: 4 }}
      activeDot={{ r: 6 }}
    />
  </LineChart>
</ChartCard>


        <ChartCard title="Donations by Type">
          <PieChart width={250} height={150}>
            <Pie
              data={dataPie}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              label
            >
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartCard>

        <ChartCard title="Average Completion Time">
          <ChartCard title="Average Completion Time">
  <BarChart width={250} height={150} data={dataLine}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
</ChartCard>

        </ChartCard>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-center text-gray-700">{title}</p>
      <p className="text-center text-2xl font-bold">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <p className="mb-2 text-gray-700">{title}</p>
      {children}
    </div>
  );
}
export default Dashboard;        




