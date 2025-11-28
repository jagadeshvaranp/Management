import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";

interface Props {
  onRegister: (username: string, password: string) => void;
  switchToLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister, switchToLogin }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // save to Redux
    dispatch(addUser({ username, password }));

    setTimeout(() => {
      onRegister(username, password);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6">

        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 rounded-xl"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-xl"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 text-white p-3 rounded-xl"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-indigo-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
