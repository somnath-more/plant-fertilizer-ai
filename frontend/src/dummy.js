import React, { useState, useEffect } from 'react';
import { Camera, ShoppingCart, MessageSquare, User, LogIn, LogOut, Package, BookOpen, Search, Upload, Send, Plus, Minus, X, ChevronRight, Leaf, Sparkles, CheckCircle, AlertCircle, TrendingUp, Award, Shield, Zap } from 'lucide-react';



// ORGANISMS


// TEMPLATES & PAGES


const AIDiagnosisPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setDiagnosis(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDiagnosis({
      disease: 'Leaf Blight',
      confidence: 87,
      severity: 'Moderate',
      recommendations: [
        'Apply Neem Oil Spray twice weekly',
        'Remove affected leaves immediately',
        'Use our Organic NPK Fertilizer to boost plant immunity',
        'Ensure proper drainage to prevent moisture buildup'
      ],
      suggestedProducts: ['Neem Oil Concentrate', 'Organic NPK 10-10-10', 'Bio Fungicide']
    });
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 font-poppins">AI Plant Disease Diagnosis</h2>
          </div>
          <p className="text-xl text-gray-600 font-inter">Upload a photo and get instant AI-powered diagnosis with treatment recommendations</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
          <div className="mb-8">
            <label className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-green-50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {selectedImage ? (
                <img src={selectedImage} alt="Plant" className="h-full object-contain relative z-10" />
              ) : (
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Upload size={40} className="text-white" />
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2 font-poppins">Upload Plant Image</p>
                  <p className="text-sm text-gray-500 font-inter">Click to browse or drag and drop</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          
          {selectedImage && (
            <Button
              onClick={handleAnalyze}
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full mb-8"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Plant
                </>
              )}
            </Button>
          )}
          
          {diagnosis && (
            <div className="space-y-6 animate-slideIn">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 font-poppins mb-2">{diagnosis.disease}</h3>
                    <p className="text-lg text-gray-700 font-inter">
                      AI Confidence: <span className="font-bold text-green-600">{diagnosis.confidence}%</span>
                    </p>
                  </div>
                  <Badge variant={diagnosis.severity === 'Moderate' ? 'warning' : 'danger'}>
                    {diagnosis.severity} Severity
                  </Badge>
                </div>
              </div>
              
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 font-poppins flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={28} />
                  Treatment Recommendations
                </h4>
                <ul className="space-y-4">
                  {diagnosis.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 font-inter leading-relaxed pt-1">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">Recommended Products</h4>
                <div className="flex flex-wrap gap-3">
                  {diagnosis.suggestedProducts.map((product, idx) => (
                    <Badge key={idx} variant="info">{product}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! 👋 I\'m your organic fertilizer expert. How can I help you today?', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const botResponses = [
      'For tomatoes, I recommend our Organic NPK 10-10-10 fertilizer. Apply 2 tablespoons per plant every 2 weeks during growing season for optimal growth! 🍅',
      'Yellowing leaves often indicate nitrogen deficiency. Try our Fish Emulsion fertilizer which is rich in nitrogen and works quickly to restore that vibrant green color! 🌿',
      'Neem oil is excellent for pest control! Mix 2 tablespoons per liter of water and spray on affected plants every 7 days. It\'s safe and effective! 🛡️',
      'For flowering plants, use our Bone Meal fertilizer which is high in phosphorus. This promotes healthy blooms and strong root development. Your flowers will thank you! 🌸'
    ];
    
    const botMessage = {
      id: Date.now() + 1,
      text: botResponses[Math.floor(Math.random() * botResponses.length)],
      isUser: false
    };
    
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="text-white" size={24} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 font-poppins">Fertilizer Expert Chat</h2>
          </div>
          <p className="text-xl text-gray-600 font-inter">Get instant personalized recommendations for your plants</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="h-[500px] overflow-y-auto p-8 bg-gradient-to-br from-gray-50 to-white">
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}
            {loading && (
              <div className="flex justify-start mb-4 animate-slideIn">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-md border border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t-2 border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about fertilizers, plant care, diseases..."
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-inter transition-all duration-200 shadow-sm"
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} size="lg">
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-12 font-poppins">Shopping Cart</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <p className="text-2xl text-gray-600 font-inter mb-6">Your cart is empty</p>
            <Button variant="primary" size="lg">
              <Search size={20} />
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Cart Items ({cart.length})</h3>
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-inter">Subtotal</span>
                    <span className="text-gray-900 font-semibold font-poppins">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-inter">Shipping</span>
                    <span className="text-gray-900 font-semibold font-poppins">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3">
                      <p className="text-xs text-green-700 font-inter">
                        Add ₹{(500 - subtotal).toFixed(2)} more for FREE shipping! 🎉
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 font-poppins">Total</span>
                      <span className="text-3xl font-bold text-green-600 font-poppins">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={onCheckout} variant="primary" size="lg" className="w-full mb-4">
                  <CheckCircle size={20} />
                  Proceed to Checkout
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-inter">
                  <Shield size={16} />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: 'Benefits of Organic Farming for Soil Health',
      excerpt: 'Discover how organic fertilizers improve soil structure, promote beneficial microorganisms, and create sustainable growing environments...',
      date: '2025-11-10',
      category: 'Soil Health',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Complete Guide to NPK Ratios',
      excerpt: 'Learn how to choose the right NPK ratio for different plants and growth stages. Understanding nitrogen, phosphorus, and potassium needs...',
      date: '2025-11-08',
      category: 'Fertilizers',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Natural Pest Control Methods',
      excerpt: 'Effective organic solutions for common garden pests without harmful chemicals. Protect your plants the natural way...',
      date: '2025-11-05',
      category: 'Pest Control',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Composting 101: Turn Waste into Gold',
      excerpt: 'Master the art of composting and create nutrient-rich organic matter for your garden. Step-by-step guide for beginners...',
      date: '2025-11-03',
      category: 'Composting',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Seasonal Fertilizing Calendar',
      excerpt: 'When and how to fertilize your plants throughout the year for optimal growth and blooms in every season...',
      date: '2025-11-01',
      category: 'Gardening Tips',
      readTime: '4 min read'
    },
    {
      id: 6,
      title: 'Micronutrients: The Hidden Champions',
      excerpt: 'Understanding the role of iron, zinc, and other micronutrients in plant health and how to address deficiencies...',
      date: '2025-10-28',
      category: 'Plant Nutrition',
      readTime: '6 min read'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 font-poppins">Gardening Blog</h2>
          </div>
          <p className="text-xl text-gray-600 font-inter">Expert tips, guides, and insights for organic gardening success</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <div key={article.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 group-hover:scale-110 transition-transform duration-700"></div>
                <BookOpen size={64} className="text-green-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="info">{article.category}</Badge>
                  <span className="text-xs text-gray-500 font-inter">• {article.readTime}</span>
                </div>
                <h3 className="font-poppins font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 font-inter leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-inter">{article.date}</span>
                  <Button variant="outline" size="sm">
                    Read More <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



// MAIN APP
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: 'Organic NPK 10-10-10',
      description: 'Balanced all-purpose fertilizer perfect for vegetables and flowers',
      price: 499,
      stock: 25
    },
    {
      id: 2,
      name: 'Neem Oil Concentrate',
      description: 'Natural pest control and fungicide for healthy plants',
      price: 349,
      stock: 40
    },
    {
      id: 3,
      name: 'Bone Meal Fertilizer',
      description: 'High phosphorus content for strong roots and blooms',
      price: 299,
      stock: 30
    },
    {
      id: 4,
      name: 'Fish Emulsion',
      description: 'Quick-release nitrogen boost for lush green growth',
      price: 399,
      stock: 20
    },
    {
      id: 5,
      name: 'Vermicompost Premium',
      description: 'Rich organic matter from earthworm castings',
      price: 249,
      stock: 50
    },
    {
      id: 6,
      name: 'Seaweed Extract',
      description: 'Natural growth stimulant with trace minerals',
      price: 449,
      stock: 0
    }
  ]);
  
  const handleNavigate = (page) => {
    if (page === 'logout') {
      setUser(null);
      setCurrentPage('home');
    } else {
      setCurrentPage(page);
    }
  };
  
  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };
  
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const handleUpdateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };
  
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  const handleCheckout = () => {
    alert('🎉 Order placed successfully! Thank you for choosing OrganicFert. Your plants will love you!');
    setCart([]);
    setCurrentPage('home');
  };
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      
      <Header
        user={user}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        currentPage={currentPage}
      />
      
      {currentPage === 'home' && (
        <HomePage products={products} onAddToCart={handleAddToCart} />
      )}
      
      {currentPage === 'ai-diagnosis' && <AIDiagnosisPage />}
      
      {currentPage === 'chatbot' && <ChatbotPage />}
      
      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
      
      {currentPage === 'blog' && <BlogPage />}
      
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;