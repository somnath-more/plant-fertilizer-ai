import { Github, Icon, Leaf, LogIn, Shield } from 'lucide-react';
import { useState } from "react";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import  GoogleIcon from '../assets/images/googleIcon.jpg';

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: 'John Doe', email });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Leaf size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-2">Welcome Back</h2>
            <p className="text-gray-600 font-inter">Sign in to your OrganicFert account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                <span className="text-gray-600 font-inter">Remember me</span>
              </label>
              <a href="#" className="text-green-600 font-semibold hover:underline font-inter">Forgot password?</a>
            </div>
            
            <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
              <LogIn size={20} />
              Sign In
            </Button>
            {/* Google and Github Auth */}
            <div className="flex items-center flex-col gap-4 mt-4">
              <Button variant="outline" size="lg" className="flex-1 flex items-center justify-center gap-2">
               {/* <Icon className="text-gray-600" src={GoogleIcon} /> */}
                Sign in with Google
              </Button>
              <Button variant="outline" size="lg" className="flex-1 flex items-center justify-center gap-2">
                <Github size={20} className="text-gray-600" />
                Sign in with GitHub
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-inter">
              Don't have an account? <span className="text-green-600 font-bold cursor-pointer hover:underline">Sign up free</span>
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 font-inter">
              <Shield size={14} />
              <span>Secure SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};