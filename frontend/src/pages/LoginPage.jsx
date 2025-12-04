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
import { baseStyles, sizes, variants } from "../theme/themeStyles";
import { fontFamily } from "../theme/customStyles";

const LoginPage = ({ onLogin, onSignUp,   onForgortPasswordClick }) => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let isValid = true;
    if (email === "") {
      setHelperText((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    }
    if (password === "") {
      setHelperText((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    }
    if (isValid) {
      onLogin({  email,password });
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

  const handleSignUp = (e) => {
    e.preventDefault();
    onSignUp();
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
              Welcome Back
            </h2>

            <p className="text-gray-600 text-sm font-inter">
              Sign in to your OrganicFert account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              helperText={helperText.email}
              error={helperText.email !== ""}
              label="Email Address"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />

            <Input
              label="Password"
              size="small"
              type="password"
              error={helperText.password !== ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              helperText={helperText.password}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 text-green-600" />
                <span className="text-gray-600 font-inter">Remember me</span>
              </label>

              <span
                onClick={onForgortPasswordClick}
                className="text-green-600 font-semibold hover:underline font-inter cursor-pointer"
              >
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              size="small"
              loading={loading}
              disabled={loading}
              variant="contained"
              style={{ fontFamily: fontFamily.poppins }}
              className={`${baseStyles} ${variants.primary} ${sizes.md} w-full mt-4`}
            >
              <LogIn size={14} />
              Sign In
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
              Don't have an account?{" "}
              <span
                onClick={handleSignUp}
                className="text-green-600 font-bold hover:underline cursor-pointer"
              >
                Sign up free
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

export default LoginPage;
