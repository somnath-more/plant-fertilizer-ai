import React from 'react';
import { Camera, ShoppingCart, MessageSquare, User, LogIn, LogOut, Package, BookOpen, Search, Upload, Send, Plus, Minus, X, ChevronRight, Leaf, Sparkles, CheckCircle, AlertCircle, TrendingUp, Award, Shield, Zap } from 'lucide-react';
import { Button } from '../atoms/Button';


export const Header = ({ user, onNavigate, cartCount, currentPage }) => (
  <header className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Leaf size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-poppins">OrganicFert</h1>
            <p className="text-xs text-gray-500 font-inter">Grow Naturally</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['home', 'ai-diagnosis', 'chatbot', 'blog'].map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`font-inter font-semibold transition-all duration-300 relative ${
                currentPage === page 
                  ? 'text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {page === 'home' ? 'Products' : page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              {currentPage === page && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
          >
            <ShoppingCart size={24} className="text-gray-700 group-hover:text-green-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900 font-inter">Hi, {user.name}</p>
                <p className="text-xs text-gray-500">Welcome back!</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('logout')}>
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => onNavigate('login')}>
              <LogIn size={16} />
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  </header>
);