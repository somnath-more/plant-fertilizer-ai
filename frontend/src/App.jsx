import { useState } from 'react';
import './App.css'
import { Header } from './components/organisms/Header';
import { HomePage } from './pages/HomePage';

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
  
  // const handleUpdateQuantity = (id, delta) => {
  //   setCart(cart.map(item => {
  //     if (item.id === id) {
  //       const newQuantity = Math.max(1, item.quantity + delta);
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   }));
  // };
  
  // const handleRemoveFromCart = (id) => {
  //   setCart(cart.filter(item => item.id !== id));
  // };
  
  // const handleCheckout = () => {
  //   alert('🎉 Order placed successfully! Thank you for choosing OrganicFert. Your plants will love you!');
  //   setCart([]);
  //   setCurrentPage('home');
  // };
  
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
      
      {/* {currentPage === 'ai-diagnosis' && <AIDiagnosisPage />}
      
      {currentPage === 'chatbot' && <ChatbotPage />}
      
      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
      
      {currentPage === 'blog' && <BlogPage />} */}
      
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;
