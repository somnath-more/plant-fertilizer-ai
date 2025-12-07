import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "../src/store/useUserStore";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const { login } = useUserStore();
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Auth0 login
    if (isAuthenticated && auth0User) {
      login({
        name: auth0User.name,
        email: auth0User.email,
        userId: auth0User.sub,
        roles: ["USER"],
      });
    }

    // Normal backend login
    if (!isAuthenticated && token) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        login(JSON.parse(localUser));
      }
    }
  }, [isAuthenticated, auth0User, token, login]);

  if (isLoading) return null;

  if (isAuthenticated || token) return children;

  return <Navigate to="/login" replace />;
}
