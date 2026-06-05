import { LogIn } from "lucide-react";
import { Button } from "../../atoms/Button";
import Input from "../../atoms/Input";
import AuthCard from "../Auth/AuthCard";
import SocialAuthOptions from "../Auth/SocialAuthOptions";
import { authStyles, baseStyles, sizes, variants } from "../../../theme/themeStyles";
import { fontFamily } from "../../../theme/customStyles";

const SignIn = ({
  values,
  errors,
  loading = false,
  onChange,
  onSubmit,
  onForgotPassword,
  onSignUp,
  onSocialAuth,
}) => {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your OrganicFert account"
      footer={
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 font-inter">
            Don&apos;t have an account?{" "}
            <button type="button" onClick={onSignUp} className={authStyles.linkButton}>
              Sign up free
            </button>
          </p>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <Input
          helperText={errors.email}
          error={Boolean(errors.email)}
          label="Email Address"
          size="small"
          type="email"
          isFocused
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="your@email.com"
        />

        <Input
          label="Password"
          size="small"
          type="password"
          error={Boolean(errors.password)}
          value={values.password}
          onChange={(event) => onChange("password", event.target.value)}
          placeholder="********"
          helperText={errors.password}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 text-green-600" />
            <span className="text-gray-600 font-inter">Remember me</span>
          </label>

          <button type="button" onClick={onForgotPassword} className={authStyles.linkButton}>
            Forgot password?
          </button>
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

        <SocialAuthOptions label="or sign in with" onProviderClick={onSocialAuth} />
      </form>
    </AuthCard>
  );
};

export default SignIn;
