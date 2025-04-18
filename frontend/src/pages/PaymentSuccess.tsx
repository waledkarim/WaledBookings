import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="p-5">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Payment Successful!</h1>
        <p className="text-lg text-green-800 mb-8">Thank you for booking with WaledBookings.</p>
      </div>
      <button
        onClick={() => navigate('/my-bookings')} 
        className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
      >
        Click to see all of your bookings
      </button>
    </div>
  );
};

export default PaymentSuccess;