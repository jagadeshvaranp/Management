import React, { useState } from "react";

interface Props {
  onRegister: (username: string, password: string) => void;
  switchToLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister, switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Register</h2>
      <div className="text-center ">
        <h1 className="text-2xl font-bold ">
          <span className="text-cyan-600 text-3xl">Inventory</span>
          <span className="text-gray-800 text-3xl ">Pro</span>
        </h1>
        </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Register
      </button>
      <p className="text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
