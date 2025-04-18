import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
    const navigate = useNavigate();
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-5">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">⚠️Payment Cancelled</h1>
        <p className="text-lg text-yellow-800 mb-8">You cancelled the payment. No worries—you can always book again.</p>
        <button
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
        >
          Return to Booking
        </button>
      </div>
    );
  };
  
  export default PaymentCancelled;