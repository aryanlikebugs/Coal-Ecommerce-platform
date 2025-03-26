import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-lg text-gray-600 mt-4 text-center">
          Supplying Coal Throughout India.
        </p>
      </div>
    </div>
  );
};

export default About;
