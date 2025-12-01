import { Navigate } from "react-router-dom";
import useAuth from "../src/hooks/useAuth";

export default function PublicRoute({ children }) {
  const isAuth = useAuth();

  if (isAuth) return <Navigate to="/home" replace />;

  return children;
}
