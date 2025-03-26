import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [cartOrders, setCardOrders] = useState([]);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
      const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
    const [placedOrders, setPlacedOrders] = useState([]); // ✅ No localStorage, now API-based

    const location = useLocation();
    const email = location.state?.email; 

  // Fetch placed orders from API on page load
  useEffect(() => {
    
    const a = JSON.parse(localStorage.getItem('myOrders')) || []
    setCardOrders(a)
    
    const fetchOrders = async () => {
      try {
        console.log(typeof(email, '*******************'));
        
        const response = await axios.get(`http://localhost:5000/coal-india/get-orders/${email}`);


        console.log(response, 'respons^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6e');
        

        
        setOrders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        // setError("Failed to load placed orders.");
      }
    };

    fetchOrders();
  }, []);

    const closePopup = () => {
    setShowPopup(false);
    setError("");
  };

    // ✅ API call to place order
  const handlePlaceOrder = async () => {
    if (!addressLine1 || !mobileNumber) {
      setError("Please fill in all required fields.");
      return;
    }
// console.log(cartOrders, '++++++++++++++++++++++');

const payload = cartOrders.forEach((item)=>{
  
  item.address = addressLine1+ " " + addressLine2,
  item.mobileNumber = mobileNumber,
  item.email = email
  item.total_price = item.quantity * item.price
  item.status = 'Order Placed'
})


    try {
      const response = await axios.post(" http://localhost:5000/coal-india/place-order", {
        cartOrders
      });

      

      if (response.status === 200) {
        alert("Order placed successfully!");
        setOrders([]);
        localStorage.removeItem("myOrders");
        setShowPopup(false);
        window.location.reload();

        //  Refresh placed orders after placing a new one
        // const updatedOrders = await axios.get(`http://localhost:5000/coal-india/get-orders/${email}`);
        // setPlacedOrders(updatedOrders.data.orders);
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      setError("Error placing order. Please check your internet connection.");
    }
  };

  const openPlaceOrderPopup = () => {
    if (cartOrders.length === 0) {
      setError("No items in the cart to place an order.");
      return;
    }
    setError("");
    setShowPopup(true);
  };


  // Handle Order Cancellation
  const handleCancelOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  // Handle Track Order Button
  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowMap(true);
  };

  const cancelCartOrder= () =>{
    localStorage.setItem("myOrders", JSON.stringify([]));
    window.location.reload();

  }

  return (
    <div className="container mx-auto py-10">

<h1 className="text-3xl font-bold text-center text-blue-600">My Orders</h1>

{error && <p className="text-red-500 text-center">{error}</p>}

{/* ✅ Cart Orders (Cards) */}
{cartOrders.length > 0 ? (
  <div>
    <h2 className="text-2xl font-semibold text-center mb-4">Cart Orders</h2>
    <div className="flex flex-wrap justify-center gap-6">
      {cartOrders.map((order, index) => (
        <div key={index} className="bg-white shadow-lg p-4 rounded-lg w-64 text-center border">
          <h2 className="text-xl font-bold mb-2">{order.name}</h2>
          <p className="text-gray-600">Quantity: {order.quantity} tons</p>
          <p className="text-gray-800 font-semibold mt-2">
            Total Price: ${order.quantity * order.price}
          </p>
        </div>
      ))}
    </div>

    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={openPlaceOrderPopup}
        className="px-6 py-3 rounded text-white bg-green-500 hover:bg-green-600"
      >
        Place Order
      </button>

      <button
        onClick={cancelCartOrder}
        className="px-6 py-3 rounded text-white bg-red-500 hover:bg-green-600"
      >
        Cancel Order
      </button>
    </div>
  </div>
) : (
  <p className="text-gray-500 text-center">No orders in the cart.</p>
)}

{/* Order Placement Popup */}
{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4 text-center">Enter Your Details</h2>

      <input
        type="text"
        placeholder="Address Line 1"
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        required
      />

      <input
        type="text"
        placeholder="Address Line 2 (Optional)"
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        required
      />

      <div className="flex justify-between">
        <button onClick={closePopup} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-4 py-2 rounded">
          Confirm Order
        </button>
      </div>
    </div>
  </div>
)}

      <h1 className="text-3xl font-bold text-center text-blue-600">My Placed Orders</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {orders.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">Coal Type</th>
                <th className="border border-gray-300 px-4 py-2">Quantity (tons)</th>
                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                {/* <th className="border border-gray-300 px-4 py-2">Date</th> */}
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">Rs.{order.price * order.quantity}</td>
                  <td className={`border border-gray-300 px-4 py-2 font-semibold ${
                    order.status === "Shipped" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {order.status  || 'Pending'}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">{new Date(order.date).toLocaleDateString()}</td> */}
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition mr-2"
                      onClick={() => handleTrackOrder(order)}
                    >
                      Track
                    </button>
                    {/* <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No placed orders available.</p>
      )}

      {/* ✅ Order Tracking Popup (Dummy Map) */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-xl font-bold text-center">Tracking Order #{selectedOrder?.id}</h2>
            <p className="text-gray-600 text-center mb-4">Estimated Delivery: 2-3 Days</p>

            {/* Dummy Map */}
            <div className="bg-gray-200 w-full h-48 flex justify-center items-center">
              <p className="text-gray-500">📍 Tracking Map Not Available</p>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                onClick={() => setShowMap(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;