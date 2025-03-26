import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminDashboard from "../pages/AdminDashboard"; // Admin dashboard page
import CustomerDashboard from "../pages/CustomerDashboard"; // Customer dashboard page
import MyOrders from "../pages/MyOrders";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
