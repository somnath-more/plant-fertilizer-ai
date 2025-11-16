import { Award, Search, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/atoms/Button';
import { FeatureCard } from '../components/molecules/FeatureCard';
import { Input } from '../components/atoms/Input';
import { ProductCard } from '../components/molecules/ProductCard';
export const HomePage = ({ products, onAddToCart, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-poppins leading-tight">
              Grow Your Garden <span className="text-green-200">Naturally</span>
            </h2>
            <p className="text-xl text-green-100 mb-8 font-inter leading-relaxed">
              Premium organic fertilizers powered by AI recommendations for healthier plants and sustainable growth
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="glass" size="lg" onClick={() => onNavigate("ai-diagnosis")}>
                <Sparkles size={20} />
                Try AI Diagnosis
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate("shop")}>
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={Sparkles}
            title="AI-Powered"
            description="Get personalized recommendations using advanced AI technology"
          />
          <FeatureCard
            icon={Shield}
            title="100% Organic"
            description="Certified organic products for safe and natural gardening"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Fast Growth"
            description="Scientifically proven formulas for optimal plant growth"
          />
          <FeatureCard
            icon={Award}
            title="Expert Support"
            description="24/7 chatbot assistance from fertilizer experts"
          />
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-6 font-poppins">Premium Products</h3>
          <Input
            placeholder="Search for organic fertilizers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};