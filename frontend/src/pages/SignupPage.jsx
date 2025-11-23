import { Github, Leaf, LogIn, SearchIcon, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/atoms/Button";
import GoogleIcon from "../assets/images/GoogleIcon.svg";
import GithubIcon from "../assets/images/githubIcon.svg";
import FacebookIcon from "../assets/images/facebookIcon.svg";
import LinkedInIcon from "../assets/images/LinkedinIcon.svg";
import FertilizerLogo from "../assets/images/PlantFertilizerAI.svg";
import Icon from "../components/atoms/Icon";
import Input from "../components/atoms/Input";
import { useAuth0 } from "@auth0/auth0-react";
import { baseStyles, variants, sizes } from "../theme/themeStyles";
import { fontFamily } from "../theme/customStyles";

const SignupPage = ({ onRegister, onLogin }) => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let isValid = true;
    if (email === "") {
      setHelperText((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    }

    if (password === "") {
      setHelperText((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    }
    if (confirmPassword === "") {
      setHelperText((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required",
      }));
      isValid = false;
    }
    if (password !== confirmPassword) {
      setHelperText((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (name === "") {
      setHelperText((prev) => ({ ...prev, name: "Name is required" }));
      isValid = false;
    }
    if (isValid) {
      onRegister({ name, email, password, confirmPassword });
    }
    setLoading(false);
  };
  const handleAuthLogin = (connection) => {
    if (connection) {
      console.log(connection);
      loginWithRedirect({
        connection: connection,
      });
    } else {
      loginWithRedirect();
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-6 flex items-center justify-center">
      <div className="max-w-[400px] w-full mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icon src={FertilizerLogo} alt="Logo" className="w-9 h-9" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-1">
              Organic Fertilizer AI
            </h2>

            <p className="text-gray-600 text-sm font-inter">
              Sign up for your OrganicFert account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Username"
              type="text"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              error={helperText.name !== ""}
              helperText={helperText.name}
            />
            <Input
              label="E-mail address"
              type="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              error={helperText.email !== ""}
              helperText={helperText.email}
            />

            <Input
              label="Password"
              type="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={helperText.password !== ""}
              helperText={helperText.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              size="small"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              error={helperText.confirmPassword !== ""}
              helperText={helperText.confirmPassword}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 text-green-600" />
                <span className="text-gray-600 font-inter">Remember me</span>
              </label>

              <a
                href="#"
                className="text-green-600 font-semibold hover:underline font-inter"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              size="small"
              loading={loading}
              variant="contained"
              color="inherit"
              disabled={loading}
              style={{ fontFamily: fontFamily.poppins }}
              className={`${baseStyles} ${variants.primary} ${sizes.md} w-full mt-4`}
            >
              <LogIn size={14} />
              Sign Up
            </Button>

            <div className="flex flex-col items-center gap-3 mt-4 border-t pt-4 border-gray-200 text-sm">
              or sign in with
              <div className="flex items-center gap-3">
                <Icon
                  src={GoogleIcon}
                  onIconClick={() => handleAuthLogin("google-oauth2")}
                  alt="Google"
                  className="cursor-pointer w-5 h-5"
                />
                <Icon
                  src={GithubIcon}
                  onIconClick={() => handleAuthLogin("github")}
                  alt="Github"
                  className="cursor-pointer w-5 h-5"
                />
                <Icon
                  src={FacebookIcon}
                  onIconClick={() => handleAuthLogin("facebook")}
                  alt="Facebook"
                  className="cursor-pointer w-5 h-5"
                />
                <Icon
                  src={LinkedInIcon}
                  onIconClick={() => handleAuthLogin("linkedin")}
                  alt="LinkedIn"
                  className="cursor-pointer w-5 h-5"
                />
              </div>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 font-inter">
              Already have an account?{" "}
              <span
                onClick={handleLogin}
                className="text-green-600 font-bold hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-inter">
              <Shield size={12} />
              <span>Secure SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
