import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Logo from "../assets/image3.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { checkPasswordResetInUrl } from "../utils/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetParams, setResetParams] = useState({ userId: null, secret: null });
  const navigate = useNavigate();
  const { confirmPasswordReset } = useAuth();

  useEffect(() => {
    const { userId, secret } = checkPasswordResetInUrl();
    if (!userId || !secret) {
      setError("Invalid or missing reset parameters. Please request a new password reset.");
    } else {
      setResetParams({ userId, secret });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const ok = await confirmPasswordReset(resetParams.userId, resetParams.secret, password, setError, setSuccess);
      if (ok) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!resetParams.userId || !resetParams.secret) {
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
            <div className="mt-2">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Invalid Reset Link
            </h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="mt-2">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Reset Your Password
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-100 focus:border-blue-500 text-base transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-200 flex-grow"></div>
            <span className="px-4 text-gray-400 text-sm font-medium">or</span>
            <div className="border-t border-gray-200 flex-grow"></div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="inline-block text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
