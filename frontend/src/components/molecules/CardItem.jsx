import { Camera, ShoppingCart, MessageSquare, User, LogIn, LogOut, Package, BookOpen, Search, Upload, Send, Plus, Minus, X, ChevronRight, Leaf, Sparkles, CheckCircle, AlertCircle, TrendingUp, Award, Shield, Zap } from 'lucide-react';
import { Button } from '../atoms/Button';



export const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center gap-5 py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors rounded-xl px-3">
    <div className="w-24 h-24 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-md">
      <Package size={40} className="text-green-600" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 font-poppins text-lg">{item.name}</h4>
      <p className="text-sm text-gray-600 font-inter mt-1">₹{item.price} each</p>
    </div>
    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
      <Button variant="secondary" size="sm" onClick={() => onUpdateQuantity(item, -1)}>
        <Minus size={14} />
      </Button>
      <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
      <Button variant="secondary" size="sm" onClick={() => onUpdateQuantity(item, 1)}>
        <Plus size={14} />
      </Button>
    </div>
    <div className="w-28 text-right">
      <p className="font-bold text-gray-900 font-poppins text-xl">₹{item.price * item.quantity}</p>
    </div>
    <Button variant="danger" size="sm" onClick={() => onRemove(item.id)}>
      <X size={16} />
    </Button>
  </div>
);