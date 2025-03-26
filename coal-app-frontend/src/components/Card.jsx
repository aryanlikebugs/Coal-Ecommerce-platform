
const Card = ({ name, quantity, price, image, onOrder }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg w-64 text-center border">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600">Available: {quantity} tons</p>
      <p className="text-gray-800 font-semibold mt-2">Price: Rs.{price} per ton</p>
      
      <button
        onClick={onOrder}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded transition duration-200 ease-in-out 
                   hover:bg-green-600 hover:shadow-lg 
                   active:bg-green-700 active:scale-95"
      >
        Order 1 Ton
      </button>
    </div>
  );
};

export default Card;

  