import { Navigate } from "react-router-dom";
import { useUserStore } from "../src/store/useUserStore";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const { login } = useUserStore();

  useEffect(() => {
    if (token) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        login(JSON.parse(localUser));
      }
    }
  }, [token, login]);

  if (token) return children;

  return <Navigate to="/login" replace />;
}
