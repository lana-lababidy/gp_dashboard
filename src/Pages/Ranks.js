
// import React from "react";
// import {PieChart,Pie,Cell,BarChart,Bar,XAxis,YAxis,Tooltip, ResponsiveContainer,} from "recharts";
// import { Award, School, Gift } from "lucide-react";

// // Mock Data
// const donationCategories = [
//   { name: "Material", value: 420 },
//   { name: "In-kind", value: 280 },
//   { name: "Volunteer", value: 150 },
// ];

// const topSchools = [
//   { school: "Al-Rabee Primary", requests: 92, value: 35000 },
//   { school: "Al-Noor Secondary", requests: 70, value: 22000 },
//   { school: "Al-Mustaqbal Model", requests: 55, value: 18000 },
//   { school: "Al-Rayan Private", requests: 40, value: 12000 },
//   { school: "Success School", requests: 28, value: 8000 },
// ];

// const topDonors = [
//   { donor: "Ahmad Khalil", donations: 24, favorite: "Material" },
//   { donor: "Sarah Yusuf", donations: 18, favorite: "In-kind" },
//   { donor: "Mohammad Ali", donations: 15, favorite: "Volunteer" },
//   { donor: "Laila Khaled", donations: 12, favorite: "Material" },
//   { donor: "Rami Adnan", donations: 9, favorite: "In-kind" },
// ];

// const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

//   function Ranks() {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-gray-700">
//         Rank & Categories
//       </h2>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-blue-500 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between">
//           <div className="flex items-center justify-between">
//             <p className="text-sm opacity-90">Top donor this month</p>
//             <Award size={28} />
//           </div>
//           <h3 className="text-xl font-semibold mt-2">Sarah Yusuf</h3>
//           <p className="text-lg font-bold">$15,000</p>
//         </div>

//         <div className="bg-green-500 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between">
//           <div className="flex items-center justify-between">
//             <p className="text-sm opacity-90">Top school</p>
//             <School size={28} />
//           </div>
//           <h3 className="text-xl font-semibold mt-2">Al-Rabee Primary</h3>
//           <p className="text-lg font-bold">92 requests</p>
//         </div>

//         <div className="bg-orange-500 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between">
//           <div className="flex items-center justify-between">
//             <p className="text-sm opacity-90">Most common type</p>
//             <Gift size={28} />
//           </div>
//           <h3 className="text-xl font-semibold mt-2">Material</h3>
//           <p className="text-lg font-bold">420 donations</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Pie Chart */}
//         <div className="bg-white rounded-xl shadow-md p-5">
//           <p className="text-gray-500 text-sm mb-4 font-semibold">
//             Donations by category
//           </p>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={donationCategories}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                 >
//                   {donationCategories.map((entry, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-xl shadow-md p-5">
//           <p className="text-gray-500 text-sm mb-4 font-semibold">
//             Top schools ranking
//           </p>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={topSchools}>
//                 <XAxis dataKey="school" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="requests" fill="#3b82f6" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Tables */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Donors Table */}
//         <div className="bg-white rounded-xl shadow-md p-5">
//           <p className="text-gray-700 text-sm mb-4 font-semibold">
//             Top 10 donors
//           </p>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border border-gray-200 rounded-lg">
//               <thead className="bg-blue-500 text-white">
//                 <tr>
//                   <th className="py-2 px-3 text-left">Donor</th>
//                   <th className="py-2 px-3 text-left">Donations</th>
//                   <th className="py-2 px-3 text-left">Favorite</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {topDonors.map((d, i) => (
//                   <tr
//                     key={i}
//                     className={`${
//                       i % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-gray-100 transition`}
//                   >
//                     <td className="py-2 px-3">{d.donor}</td>
//                     <td className="py-2 px-3">{d.donations}</td>
//                     <td className="py-2 px-3">{d.favorite}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Schools Table */}
//         <div className="bg-white rounded-xl shadow-md p-5">
//           <p className="text-gray-700 text-sm mb-4 font-semibold">
//             Top 10 schools
//           </p>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border border-gray-200 rounded-lg">
//               <thead className="bg-green-500 text-white">
//                 <tr>
//                   <th className="py-2 px-3 text-left">School</th>
//                   <th className="py-2 px-3 text-left">Requests</th>
//                   <th className="py-2 px-3 text-left">Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {topSchools.map((s, i) => (
//                   <tr
//                     key={i}
//                     className={`${
//                       i % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-gray-100 transition`}
//                   >
//                     <td className="py-2 px-3">{s.school}</td>
//                     <td className="py-2 px-3">{s.requests}</td>
//                     <td className="py-2 px-3">${s.value.toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default Ranks;