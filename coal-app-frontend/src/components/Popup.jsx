// eslint-disable-next-line react/prop-types
const Popup = ({ message, onClose }) => {
    if (!message) return null; // If there's no message, don't render the popup
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg w-80 text-center">
          <p className="text-red-600 font-semibold">{message}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Popup;
  