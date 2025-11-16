import { Camera, ShoppingCart, MessageSquare, User, LogIn, LogOut, Package, BookOpen, Search, Upload, Send, Plus, Minus, X, ChevronRight, Leaf, Sparkles, CheckCircle, AlertCircle, TrendingUp, Award, Shield, Zap } from 'lucide-react';


export const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      <Icon className="text-white" size={28} strokeWidth={1.5}  />
    </div>
    <h3 className="font-poppins font-bold text-lg text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm font-inter leading-relaxed">{description}</p>
  </div>
);