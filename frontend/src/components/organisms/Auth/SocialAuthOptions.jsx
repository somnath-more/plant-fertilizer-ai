import GoogleIcon from "../../../assets/images/GoogleIcon.svg";
import GithubIcon from "../../../assets/images/githubIcon.svg";
import FacebookIcon from "../../../assets/images/facebookIcon.svg";
import LinkedInIcon from "../../../assets/images/LinkedinIcon.svg";
import Icon from "../../atoms/Icon";

const providers = [
  { connection: "google-oauth2", label: "Google", icon: GoogleIcon },
  { connection: "github", label: "Github", icon: GithubIcon },
  { connection: "facebook", label: "Facebook", icon: FacebookIcon },
  { connection: "linkedin", label: "LinkedIn", icon: LinkedInIcon },
];

const SocialAuthOptions = ({ label = "or continue with", onProviderClick }) => {
  return (
    <div className="flex flex-col items-center gap-3 mt-4 border-t pt-4 border-gray-200 text-sm text-gray-600 font-inter">
      <span>{label}</span>
      <div className="flex items-center gap-3">
        {providers.map((provider) => (
          <Icon
            key={provider.connection}
            src={provider.icon}
            onIconClick={() => onProviderClick(provider.connection)}
            alt={provider.label}
            className="cursor-pointer w-5 h-5"
          />
        ))}
      </div>
    </div>
  );
};

export default SocialAuthOptions;
