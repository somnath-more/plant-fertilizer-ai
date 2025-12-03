import { Badge, BookOpen, ChevronRight,PenLine } from "lucide-react";
import { Button } from "../components/atoms/Button";
import { useState } from "react";
import { ARTICLES } from "../utils";

const BlogPage = () => {
  const [articles] = useState(ARTICLES);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 relative">
          {/* Header */}
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 font-poppins">
              Gardening Blog
            </h2>
          </div>

          {/* Floating Write button */}
          <Button variant="contained" className="!absolute !right-0 !top-2 !bg-green-600 !text-white !p-3 !rounded-xl !shadow-lg !hover:bg-green-700 transition">
            <PenLine size={20} />
          </Button>

          <p className="text-xl text-gray-600 font-inter">
            Expert tips, guides, and insights for organic gardening success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 group-hover:scale-110 transition-transform duration-700"></div>
                <BookOpen
                  size={64}
                  className="text-green-600 relative z-10 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="info">{article.category}</Badge>
                  <span className="text-xs text-gray-500 font-inter">
                    • {article.readTime}
                  </span>
                </div>
                <h3 className="font-poppins font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 font-inter leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-inter">
                    {article.date}
                  </span>
                  <Button
                    size="small"
                    variant="outlined"
                    className={`font-inter font-semibold !rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 !border-2 !border-green-500 !text-green-600 hover:bg-green-50 !bg-white !px-4 !py-2 !text-sm`}
                  >
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
export default BlogPage;
