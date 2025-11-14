import React, { useState } from "react";
import { User, Lock } from "lucide-react";

interface Props {
  onLogin: (username: string, password: string) => void;
  switchToRegister: () => void;
}

const LoginForm: React.FC<Props> = ({ onLogin, switchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border-t-4 border-t-blue-500">
      
         <div className="text-center ">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-cyan-600 text-3xl">Inventory</span>
          <span className="text-gray-800 text-3xl ">Pro1</span>
        </h1>
        </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 mt-3 text-gray-400" size={20} />
          <label htmlFor="" className="font-bold mt-9 text-sm">username</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 mt-3 text-gray-400" size={20} />
            <label htmlFor="" className="font-bold text-sm">password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;