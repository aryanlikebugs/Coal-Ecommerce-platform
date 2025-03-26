import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar /> {/* Add Navbar */}
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to Coal India</h1>
        <p className="text-lg text-gray-600 mb-6">Your one-stop solution for amazing features.</p>
        
        <div className="space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-stone-300 text-white px-6 py-3 rounded"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-stone-300 text-white px-6 py-3 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
