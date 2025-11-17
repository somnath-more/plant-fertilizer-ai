import { baseStyles, variants } from "../../theme";
import { sizes } from "../../theme";

export const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled, className = '' }) => {
 

  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
    >
      {children}
    </button>
  );
};