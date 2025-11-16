import React, { useState } from "react";
import { User, Lock, Package } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  onLogin: (username: string, password: string) => void;
  switchToRegister: () => void;
}

const LoginForm: React.FC<Props> = ({ onLogin, switchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="  from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Inventory Pro
          </h1>
          <p className="text-gray-600">Welcome back! Please login to continue</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:shadow-3xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 hover:border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 hover:border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={switchToRegister}
                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-200"
              >
                Register now
              </button>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 Inventory Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;