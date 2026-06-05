import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SignUp from "../components/organisms/SignUp/SignUp";
import useAlert from "../hooks/useAlert";
import { registerUser } from "../services/api/authService";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
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

  const handleSocialAuth = (connection) => {
    loginWithRedirect({
      authorizationParams: {
        connection,
      },
    });
  };

  return (
    <SignUp
      values={values}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleRegister}
      onLogin={() => navigate("/login")}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default SignupPage;
