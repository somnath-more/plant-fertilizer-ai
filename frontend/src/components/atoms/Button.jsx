
export const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled, className = '' }) => {
  const baseStyles = 'font-inter font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transform hover:-translate-y-0.5';
  const variants = {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300',
    outline: 'border-2 border-green-500 text-green-600 hover:bg-green-50 bg-white',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700',
    glass: 'bg-white/80 backdrop-blur-md text-gray-800 hover:bg-white/90 border border-white/20'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
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