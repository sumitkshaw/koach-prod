import { useState, useEffect } from "react";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image3.png";
import { useAuth } from "../../utils/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function SignUpForm({ onSwitchToLogin, onClose, initialUserType = "mentee", enableToggle = true }) {
    const [userType, setUserType] = useState(initialUserType);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user, signup, loginWithGoogle, loginWithLinkedIn } = useAuth();
    // const { showToast } = useToast(); // Not needed here anymore if we delay it

    useEffect(() => {
        if (user) {
            setError("You are already logged in.");
        }
    }, [user]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (user) return;
        setIsLoading(true);
        setError("");

        try {
            const type = userType === 'mentor' ? 'mentor' : undefined;
            // Set toast message for dashboard to pick up
            localStorage.setItem("welcome_toast", `Welcome to Koach, ${name}!`);

            await signup(name, email, password, navigate, setError, type);
            if (onClose) onClose();
        } catch (error) {
            console.error("Sign-up error:", error);
            setError("Sign-up failed. Please try again.");
            localStorage.removeItem("welcome_toast"); // Cleanup if failed
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            // Set toast message (generic since name isn't known yet locally, though OAuthCallback will handle it)
            // OAuthCallback will likely handle the toast for OAuth flows actually.
            // But let's set it here just in case the redirect is instant handled by AuthContext without full reload
            localStorage.setItem("welcome_toast", "Welcome to Koach!");
            await loginWithGoogle(navigate, true, userType === 'mentor' ? 'mentor' : undefined);
            if (onClose) onClose();
        } catch (error) {
            console.error("Google sign-up error:", error);
            setError("Google sign-up failed.");
            localStorage.removeItem("welcome_toast");
        }
    };

    const handleLinkedInSignUp = async () => {
        try {
            localStorage.setItem("welcome_toast", "Welcome to Koach!");
            await loginWithLinkedIn(navigate, true, userType === 'mentor' ? 'mentor' : undefined);
            if (onClose) onClose();
        } catch (error) {
            console.error("LinkedIn sign-up error:", error);
            setError("LinkedIn sign-up unavailable.");
            localStorage.removeItem("welcome_toast");
        }
    };

    return (
        <div className="w-full flex flex-col py-6 px-4">
            <div className="text-center mb-5 flex-shrink-0">
                <img src={Logo} alt="Koach Logo" className="h-10 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-blue-700">
                    {userType === 'mentor' ? "Mentor Sign Up" : "Create Account"}
                </h2>
            </div>

            {/* Toggle Tabs */}
            {enableToggle && (
                <div className="bg-gray-100 p-1 rounded-lg mb-5 flex-shrink-0">
                    <div className="grid grid-cols-2 gap-1">
                        <button
                            onClick={() => setUserType("mentee")}
                            className={`py-1.5 text-sm font-semibold rounded-md transition-all ${userType === "mentee"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setUserType("mentor")}
                            className={`py-1.5 text-sm font-semibold rounded-md transition-all ${userType === "mentor"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Mentor
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-3 flex-shrink-0">
                <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        required
                    />
                </div>

                <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        placeholder={userType === 'mentor' ? "mentor@example.com" : "student@example.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        required
                    />
                </div>

                {error && (
                    <div className="flex items-center text-red-500 text-xs bg-red-50 p-2 rounded">
                        <AlertCircle size={14} className="mr-1.5" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm mt-1"
                >
                    {isLoading ? "Creating..." : (userType === 'mentor' ? "Sign Up as Mentor" : "Sign Up")}
                </button>
            </form>

            <div className="mt-4 flex-shrink-0">
                <div className="flex items-center mb-3">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="mx-3 text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleGoogleSignUp}
                        className="flex items-center justify-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">Google</span>
                    </button>
                    <button
                        onClick={handleLinkedInSignUp}
                        className="flex items-center justify-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="#0077B5" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">LinkedIn</span>
                    </button>
                </div>

                <p className="text-center mt-4 text-xs text-gray-500">
                    Already have an account?{" "}
                    <button onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
}
