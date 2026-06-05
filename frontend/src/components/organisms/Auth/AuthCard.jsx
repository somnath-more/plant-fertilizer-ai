import { Shield } from "lucide-react";
import FertilizerLogo from "../../../assets/images/PlantFertilizerAI.svg";
import Icon from "../../atoms/Icon";
import { authStyles } from "../../../theme/themeStyles";

const AuthCard = ({ title, subtitle, icon, children, footer }) => {
  return (
    <main className={authStyles.page}>
      <section className={authStyles.container}>
        <div className={authStyles.card}>
          <div className="text-center mb-6">
            <div className={authStyles.logoWrap}>
              {icon || <Icon src={FertilizerLogo} alt="Logo" className="w-9 h-9" />}
            </div>

            <h1 className={authStyles.title}>{title}</h1>
            <p className={authStyles.subtitle}>{subtitle}</p>
          </div>

          {children}

          {footer}

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-inter">
              <Shield size={12} />
              <span>Secure SSL Encryption</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthCard;
