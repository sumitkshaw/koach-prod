import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function VerifySuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Email Verified!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your email has been successfully verified. You may now login to your account.
        </p>
        
        <div className="animate-pulse">
          <p className="text-gray-500 text-sm mb-4">
            Redirecting to Home Page in 3 seconds...
          </p>
        </div>
        
        
      </div>
    </div>
  );
}