import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./slices/userSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("loggedUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(loginUser(parsed));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthLoader;
