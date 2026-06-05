export const baseStyles = "!font-poppins !font-semibold !rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transform hover:-translate-y-0.5";

export const variants = {
  primary: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700",
  secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300",
  outline: "border-2 border-green-500 text-green-600 hover:bg-green-50 bg-white",
  danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700",
  glass: "!bg-white/80 !backdrop-blur-md !text-gray-800 hover:bg-white/90 border border-white/20",
};

export const sizes = {
  sm: "!px-4 !py-2 !text-sm",
  md: "!px-6 !py-3 !text-base",
  lg: "!px-8 !py-4 !text-lg",
};

export const authStyles = {
  page: "min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-6 flex items-center justify-center",
  container: "max-w-[400px] w-full mx-auto px-4",
  card: "bg-white rounded-xl shadow-xl p-8 border border-gray-200",
  logoWrap: "w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg",
  title: "text-3xl font-bold text-gray-900 font-poppins mb-1",
  subtitle: "text-gray-600 text-sm font-inter",
  linkButton: "text-green-600 font-bold hover:underline cursor-pointer font-inter bg-transparent border-0 p-0",
};
