import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SignIn from "../components/organisms/SignIn/SignIn";
import useAlert from "../hooks/useAlert";
import { loginUser } from "../services/api/authService";
import { useUserStore } from "../store/useUserStore";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { success, error } = useAlert();
  const { login } = useUserStore();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {
      email: values.email ? "" : "Email is required",
      password: values.password ? "" : "Password is required",
    };

    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const { status, message, data } = await loginUser(values);

      if (!status) {
        error(message);
        return;
      }

      const userObj = {
        name: data.name,
        email: data.email,
        roles: data.roles,
        userId: data.userId,
        token: data.token,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userObj));

      login(userObj);
      success(message);
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (connection) => {
    loginWithRedirect({
      authorizationParams: {
        connection,
      },
    });
  };

  return (
    <SignIn
      values={values}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleLogin}
      onForgotPassword={() => navigate("/forgot-password")}
      onSignUp={() => navigate("/register")}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default LoginPage;
