import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { baseStyles, variants } from "../../theme/themeStyles";
import Input from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {

    e.preventDefault();
    if (otp.length < 6) {
      alert("Enter a valid OTP");
      return;
    }
    navigate("/reset-password", { state });
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-xl border border-gray-200">

        <div className="w-16 h-16 mx-auto rounded-xl bg-green-500 flex items-center justify-center text-white mb-4">
          <ShieldCheck size={28} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 font-poppins">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 text-sm">
          We’ve sent a 6-digit code to <b>{state.email}</b>
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-4">

          <Input
            label="Enter OTP"
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button
            type="submit"
            size="small"
            variant="contained"
            className={`${baseStyles} ${variants.primary} w-full`}
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
