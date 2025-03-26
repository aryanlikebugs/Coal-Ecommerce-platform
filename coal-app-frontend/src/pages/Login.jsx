import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup"; // Import the Popup component

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for popup error message
  const navigate = useNavigate(); // Navigation hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post("http://localhost:5000/coal-india/login", formData);


      if (response.status === 200) {
        console.log(response, '+++++++++++++++');
        const email = formData.email; 
        const userType = response.data.userType; // Get user role from API response
        
        if (userType === "admin") {
          navigate("/admin-dashboard"); // Navigate to admin dashboard
        } else {
          navigate("/customer-dashboard",{ state: { email } }); // Navigate to customer dashboard
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again."); // Show popup on error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      {/* Popup Component for Error Messages */}
      <Popup message={errorMessage} onClose={() => setErrorMessage("")} />
    </div>
  );
};

export default Login;

