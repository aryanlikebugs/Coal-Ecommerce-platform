import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup"; // Import the Popup component

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "customer",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate(); // Navigation hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/coal-india/sign-up",formData); 
      console.log("Form Data:", response);
     

      if (response.status === 200) {
        navigate("/login"); // Redirect to login page on success
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again."); // Set error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

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

        <label className="block mb-2">User Type:</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>

      {/* Popup Component */}
      <Popup message={errorMessage} onClose={() => setErrorMessage("")} />
    </div>
  );
};

export default Signup;

