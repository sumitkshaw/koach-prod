import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Logo from "../assets/image3.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await resetPassword(email, setError, setSuccess);
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="absolute top-8 left-8 flex flex-col items-start">
          <button
            onClick={() => navigate("/login")}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Logo */}
          <div className="mt-2">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />{" "}
            {/* Adjust height if needed */}
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Forgot your password?
          </h1>

          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            Please enter your registered Email address 
            <br />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-100 focus:border-blue-500 text-base transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm bg-green-50 p-3 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-200 flex-grow"></div>
            <span className="px-4 text-gray-400 text-sm font-medium">or</span>
            <div className="border-t border-gray-200 flex-grow"></div>
          </div>

          <a
            href="/login"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
          >
            Remember password? Login
          </a>
        </div>
      </div>
    </div>
  );
}
