import { Navigate } from "react-router-dom";
import useAuth from "../src/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const isAuth = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
