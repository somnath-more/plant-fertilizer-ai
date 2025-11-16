import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { ChatMessage } from "../components/molecules/ChatMessage";
import { Button } from "../components/atoms/Button";

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
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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
export default ChatbotPage;