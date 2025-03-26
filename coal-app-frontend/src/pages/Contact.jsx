import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-4 text-center">
          Email: contact@ccl.com
        </p>
      </div>
    </div>
  );
};

export default Contact;
