import { UserPlus } from "lucide-react";
import { Button } from "../../atoms/Button";
import Input from "../../atoms/Input";
import AuthCard from "../Auth/AuthCard";
import SocialAuthOptions from "../Auth/SocialAuthOptions";
import { authStyles, baseStyles, sizes, variants } from "../../../theme/themeStyles";
import { fontFamily } from "../../../theme/customStyles";

const SignUp = ({
  values,
  errors,
  loading = false,
  onChange,
  onSubmit,
  onLogin,
  onSocialAuth,
}) => {
  return (
    <AuthCard
      title="Organic Fertilizer AI"
      subtitle="Sign up for your OrganicFert account"
      footer={
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 font-inter">
            Already have an account?{" "}
            <button type="button" onClick={onLogin} className={authStyles.linkButton}>
              Sign in
            </button>
          </p>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <Input
          label="Username"
          type="text"
          size="small"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Username"
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <Input
          label="E-mail address"
          type="email"
          size="small"
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="your@email.com"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Input
          label="Password"
          type="password"
          size="small"
          value={values.password}
          onChange={(event) => onChange("password", event.target.value)}
          placeholder="********"
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          size="small"
          value={values.confirmPassword}
          onChange={(event) => onChange("confirmPassword", event.target.value)}
          placeholder="********"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
        />

        <Button
          type="submit"
          size="small"
          loading={loading}
          disabled={loading}
          variant="contained"
          style={{ fontFamily: fontFamily.poppins }}
          className={`${baseStyles} ${variants.primary} ${sizes.md} w-full mt-4`}
        >
          <UserPlus size={14} />
          Sign Up
        </Button>

        <SocialAuthOptions label="or sign up with" onProviderClick={onSocialAuth} />
      </form>
    </AuthCard>
  );
};

export default SignUp;
