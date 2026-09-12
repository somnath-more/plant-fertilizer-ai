import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/organisms/SignUp/SignUp";
import useAlert from "../hooks/useAlert";
import { exchangeOAuthToken, registerUser } from "../services/api/authService";
import { useUserStore } from "../store/useUserStore";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const { success, error } = useAlert();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {
      name: values.name ? "" : "Name is required",
      email: values.email ? "" : "Email is required",
      password: values.password ? "" : "Password is required",
      confirmPassword: values.confirmPassword ? "" : "Confirm Password is required",
    };

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((message) => !message);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const { message, status } = await registerUser(values);

      if (!status) {
        error(message);
        return;
      }

      success(message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (idToken) => {
    setLoading(true);
    try {
      const result = await exchangeOAuthToken(idToken);
      if (!result.status) {
        error(result.message);
        return;
      }
      const userObj = { ...result.data };
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(userObj));
      login(userObj);
      success(result.message);
      navigate("/home", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUp
      values={values}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleRegister}
      onLogin={() => navigate("/login")}
      onSocialAuth={handleGoogleAuth}
    />
  );
};

export default SignupPage;
