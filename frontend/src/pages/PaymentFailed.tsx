import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-4xl font-bold text-red-700 mb-4">❌ Payment Failed</h1>
      <p className="text-lg text-red-800 mb-8">Something went wrong. Please try again or contact support.</p>
      <button
        onClick={() => navigate('/')} 
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailed;