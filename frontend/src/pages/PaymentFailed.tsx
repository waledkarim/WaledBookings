import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {

  const navigate = useNavigate();
  const hotelId = sessionStorage.getItem("hotelId");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 p-5">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-red-700 mb-4 text-left">❌Payment Failed</h1>
        <p className="text-lg text-red-800 mb-8">Something went wrong.</p>
      </div>
      <button
        onClick={() => navigate(`/hotel/${hotelId}/booking`)} 
        className="py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailed;