import React, { useState } from "react";

function Wallet() {
  const [balance, setBalance] = useState(1500);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 500, date: "2025-08-20", status: "Approved" },
    { id: 2, type: "Withdraw", amount: 200, date: "2025-08-22", status: "Approved" },
    { id: 3, type: "Withdraw", amount: 300, date: "2025-08-29", status: "Pending" },
  ]);

  // Approve request
  const handleApprove = (id) => {
    setTransactions(transactions.map(tx => {
      if (tx.id === id) {
        if (tx.type === "Deposit") {
          setBalance(balance + tx.amount);
        } else if (tx.type === "Withdraw") {
          setBalance(balance - tx.amount);
        }
        return { ...tx, status: "Approved" };
      }
      return tx;
    }));
  };

  // Reject request
  const handleReject = (id) => {
    setTransactions(transactions.map(tx =>
      tx.id === id ? { ...tx, status: "Rejected" } : tx
    ));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Wallet Management</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg rounded-2xl p-8 mb-10 text-center text-white">
        <h2 className="text-xl font-semibold">Current Balance</h2>
        <p className="text-5xl font-extrabold mt-3">{balance} $</p>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Transactions</h2>
        <table className="min-w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{tx.date}</td>
                <td className="p-3 font-medium">{tx.type}</td>
                <td className="p-3 font-semibold">{tx.amount} $</td>
                <td
                  className={`p-3 font-bold 
                    ${tx.status === "Approved" ? "text-green-600" : 
                      tx.status === "Rejected" ? "text-red-600" : 
                      "text-yellow-500"}`}
                >
                  {tx.status}
                </td>
                <td className="p-3">
                  {tx.status === "Pending" && (
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => handleApprove(tx.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(tx.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {tx.status !== "Pending" && (
                    <span className="text-gray-400 italic">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default Wallet;
