import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coal-eCommerce</h1>
        
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/signup" className="bg-stone-300 px-4 py-2 rounded">Sign Up</Link>
          <Link to="/login" className="bg-stone-300 px-4 py-2 rounded">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
