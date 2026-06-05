import React from "react";
import { Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fontFamily } from "../theme/customStyles";
import { authStyles, baseStyles, sizes, variants } from "../theme/themeStyles";
import Input from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate("/verify-otp", { state: { email } });
    };
  return (
    <div className={authStyles.page}>
      <div className={authStyles.container}>
        <div className={authStyles.card}>

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail size={26} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-1">
              Forgot Password
            </h2>

            <p className="text-gray-600 text-sm font-inter">
              Enter your email and we’ll send you reset instructions
            </p>
          </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleForgotPassword}>
            <Input
              label="Email Address"
              size="small"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              size="small"
              variant="contained"
              style={{ fontFamily: fontFamily.poppins }}
              className={`${baseStyles} ${variants.primary} ${sizes.md} w-full mt-4`}
            >
              Send Reset Link
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 font-inter">
              Remember your password?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-green-600 font-bold hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>

          {/* Footer */}
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

export default ForgotPassword;
