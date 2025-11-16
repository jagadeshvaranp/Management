import React, { useState } from "react";

interface Props {
  onRegister: (username: string, password: string) => void;
  switchToLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister, switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onRegister(username, password);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      
      <div onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Register
        </h2>
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-indigo-600 text-4xl">Inventory</span>
            <span className="text-gray-800 text-4xl">Pro</span>
          </h1>
        </div>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
          required
        />
        
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e as any);
          }}
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Registering...</span>
            </>
          ) : (
            "Register"
          )}
        </button>
        
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <span className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer hover:underline transition-colors duration-200" onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;