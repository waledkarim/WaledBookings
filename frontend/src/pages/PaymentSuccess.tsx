import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../contexts/BookingContext';

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const { removeBookingValues } = useBookingContext();
  removeBookingValues();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50 p-5">
        <div className="flex flex-col items-start">
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