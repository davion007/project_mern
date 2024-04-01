import React,{useRef, useEffect, } from 'react';
import Chart from 'chart.js/auto';

import PieChart from '../component/Dashboard/PieChart';
import BarChart from '../component/Dashboard/BarChart';

const Dashboard = () => {
  const salesData = [
    { id: 1, productName: "Men's", price: 49.99, quantity: 10 },
    { id: 2, productName: "Women's", price: 49.99, quantity: 50 },
    { id: 3, productName: "Kids", price: 39.99, quantity: 91 },
    { id: 4, productName: "Jeans", price: 39.99, quantity: 47 },
    { id: 5, productName: "Sarees", price: 39.99, quantity: 102 },
    { id: 6, productName: "Summer", price: 39.99, quantity: 69 },
    { id: 7, productName: "Winter", price: 39.99, quantity: 25 },
    
    // Add more sales data as needed
  ];

  // "Men's",
  // "Women's",
  // "Kids",
  // "Jeans",
  // "Sarees",
  // "Summer",
  // "Winter",

  const totalSales = salesData.length;
  const totalRevenue = salesData.reduce((acc, sale) => acc + sale.price * sale.quantity, 0);

  return (
    <div className="bg-light p-4">
      <h1 className="text-2xl font-bold mb-4">CRM Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-2">Total Sales</h2>
          <p className="text-3xl font-bold">{totalSales}</p>
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-2">Popular Products</h2>
          <PieChart data={salesData} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Recent Sales</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Product Type</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Price</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td className="py-2 px-4">{sale.id}</td>
                <td className="py-2 px-4">{sale.productName}</td>
                <td className="py-2 px-4">${sale.price.toFixed(2)}</td>
                <td className="py-2 px-4">{sale.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Sales by Product</h2>
        <BarChart data={salesData} />
      </div>
    </div>
  );
};

export default Dashboard;