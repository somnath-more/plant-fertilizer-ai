import { Camera, ShoppingCart, MessageSquare, User, LogIn, LogOut, Package, BookOpen, Search, Upload, Send, Plus, Minus, X, ChevronRight, Leaf, Sparkles, CheckCircle, AlertCircle, TrendingUp, Award, Shield, Zap } from 'lucide-react';



export const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slideIn`}>
    <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-md ${
      isUser 
        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
        : 'bg-white text-gray-800 border border-gray-200'
    }`}>
      <p className="text-sm font-inter leading-relaxed">{message}</p>
    </div>
  </div>
);
