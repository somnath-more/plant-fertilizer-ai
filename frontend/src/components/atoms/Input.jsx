
export const Input = ({ label, type = 'text', value, onChange, placeholder, icon: Icon }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-inter transition-all duration-200 bg-white shadow-sm hover:shadow-md ${Icon ? 'pl-12' : ''}`}
      />
    </div>
  </div>
);