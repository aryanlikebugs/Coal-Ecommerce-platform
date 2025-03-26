import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
// import { useLocation } from "react-router-dom";

const CustomerDashboard = () => {
  const [coalData, setCoalData] = useState([]);
  const [myOrders, setMyOrders] = useState(
    JSON.parse(localStorage.getItem("myOrders")) || []
  ); // Load orders from localStorage
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

  useEffect(() => {

    axios
      .get("http://localhost:5000/coal-india/get-all-products") // Replace with actual API
      .then((response) => {
        
        setCoalData(response.data);
      })
      .catch(() => {
        setError("Failed to load coal data. Please try again.");
      });
  }, []);

  // Function to handle order
  const handleOrder = (item) => {
    const updatedOrders = [...myOrders];
    const existingOrder = updatedOrders.find((order) => order.name === item.name);

    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      updatedOrders.push({ ...item, quantity: 1 });
    }

    setMyOrders(updatedOrders);
    localStorage.setItem("myOrders", JSON.stringify(updatedOrders)); // Store in localStorage
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
          Customer Dashboard
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-wrap justify-center gap-6">
          {coalData.length > 0 ? (
            coalData.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                img={item.imageUrl} 
                onOrder={() => handleOrder(item)}
              />
            ))
          ) : (
            !error && <p className="text-gray-500 text-center">Loading data...</p>
          )}
        </div>

        {/* Button to Navigate to My Orders Page */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/my-orders",  { state: { email } })}
            className="bg-blue-500 text-white px-6 py-3 rounded"
          >
            View My Orders ({myOrders.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

