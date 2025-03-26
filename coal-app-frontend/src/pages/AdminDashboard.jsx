import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState(9); // Defaulting as per requirement
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalShipments, setTotalShipments] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/coal-india/get-allOrders");
        const ordersData = response.data.orders;

        setOrders(ordersData);
        setTotalOrders(response.data.total_orders);
        setMonthlyOrders(response.data.total_orders)

        // Calculate shipped orders
        const shippedOrders = ordersData.filter((order) => order.order_status === "shipped").length;
        setTotalShipments(shippedOrders);

      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600">Admin Dashboard</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Order Stats */}
      <div className="grid grid-cols-3 gap-6 text-center my-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Monthly Orders</h2>
          <p className="text-2xl font-bold text-blue-600">{monthlyOrders}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Shipments</h2>
          <p className="text-2xl font-bold text-purple-600">{totalShipments}</p>
        </div>
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">Coal Type</th>
                <th className="border border-gray-300 px-4 py-2">Quantity (tons)</th>
                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{order.total_price}</td>
                  <td className={`border border-gray-300 px-4 py-2 font-semibold ${
                    order.order_status === "shipped" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {order.order_status || "Pending"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">N/A</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No orders available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
