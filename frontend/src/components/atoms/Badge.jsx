export const Badge = ({ children, variant = 'success' }) => {
  const variants = {
    success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200',
    warning: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200',
    danger: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200',
    info: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200'
  };
  
  return (
    <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${variants[variant]} shadow-sm`}>
      {children}
    </span>
  );
};