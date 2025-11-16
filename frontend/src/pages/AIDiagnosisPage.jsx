import { CheckCircle, Sparkles, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";

export const AIDiagnosisPage = () => {
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