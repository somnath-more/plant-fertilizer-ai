import { useEffect, useState } from "react";
import {
  BookmarkPlus,
  BookOpen,
  Eye,
  Heart,
  PenLine,
  Search,
  Sparkles,
} from "lucide-react";
import { Alert, CircularProgress } from "@mui/material";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";
import CreateBlog from "../components/organisms/CreateBlog";
import {
  getAllBlogs,
  getStaffPicks,
  likeBlog,
} from "../services/api/blogService";
import { baseStyles, sizes, variants } from "../theme/themeStyles";

const recommendedTopics = [
  "Soil Health",
  "Organic",
  "Fertilizers",
  "Pest Control",
  "Composting",
  "Plant Nutrition",
];

const formatPublishedDate = (date) => {
  if (!date) return "Just now";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const BlogArticleRow = ({ article, onLike }) => (
  <article className="grid grid-cols-[1fr_160px] gap-7 border-b border-gray-200 py-9 first:pt-0 max-sm:grid-cols-1">
    <div className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-600 font-inter">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
          <BookOpen size={15} />
        </span>
        <span>In OrganicFert</span>
        <span>by {article.author || "Garden Team"}</span>
        <span>{formatPublishedDate(article.publishedAt || article.createdAt)}</span>
      </div>

      <h3 className="mb-2 font-poppins text-2xl font-extrabold leading-tight text-gray-950 transition-colors hover:text-green-700">
        {article.title}
      </h3>
      <p className="mb-5 line-clamp-2 font-inter text-base leading-relaxed text-gray-600">
        {article.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <Badge variant="success">{article.category}</Badge>
        <span>{article.readTime || "1 min read"}</span>
        <span className="inline-flex items-center gap-1">
          <Eye size={15} /> {article.views || 0}
        </span>
        <button
          type="button"
          onClick={() => onLike(article.id)}
          className="inline-flex items-center gap-1 transition hover:text-rose-600"
          aria-label={`Like ${article.title}`}
        >
          <Heart size={15} /> {article.likes || 0}
        </button>
        <button className="ml-auto rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-green-700">
          <BookmarkPlus size={19} />
        </button>
      </div>
    </div>

    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded bg-gradient-to-br from-green-100 via-lime-50 to-cyan-100 max-sm:w-full">
      {article.imageUrl ? (
        <img src={article.imageUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <BookOpen size={52} className="text-green-700" />
      )}
    </div>
  </article>
);

const BlogSidebar = ({ selectedCategory, onCategoryChange, rankingsRefresh }) => {
  const [ranking, setRanking] = useState("views");
  const [staffPicks, setStaffPicks] = useState([]);
  const [picksLoading, setPicksLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadStaffPicks = async () => {
      setPicksLoading(true);
      const response = await getStaffPicks(ranking, 3);
      if (!active) return;
      setStaffPicks(response.status && Array.isArray(response.data) ? response.data : []);
      setPicksLoading(false);
    };
    loadStaffPicks();
    return () => {
      active = false;
    };
  }, [ranking, rankingsRefresh]);

  return (
  <aside className="sticky top-32 hidden h-fit border-l border-gray-200 pl-9 lg:block">
    <section className="mb-11">
      <h3 className="mb-6 font-poppins text-base font-extrabold text-gray-950">
        Staff Picks
      </h3>
      <div className="mb-6 flex gap-2">
        {[
          ["views", "Most read"],
          ["likes", "Most liked"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setRanking(value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              ranking === value ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {picksLoading && <p className="text-sm text-gray-500">Loading picks...</p>}
        {!picksLoading && staffPicks.length === 0 && (
          <p className="text-sm text-gray-500">No ranked blogs yet.</p>
        )}
        {!picksLoading && staffPicks.map((pick) => (
          <article key={pick.id}>
            <p className="mb-2 text-sm text-gray-600">{pick.author || "Garden Team"}</p>
            <h4 className="font-poppins text-base font-extrabold leading-snug text-gray-950">
              {pick.title}
            </h4>
            <p className="mt-2 flex items-center gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1"><Eye size={14} /> {pick.views || 0}</span>
              <span className="inline-flex items-center gap-1"><Heart size={14} /> {pick.likes || 0}</span>
            </p>
          </article>
        ))}
      </div>
    </section>

    <section className="mb-11">
      <h3 className="mb-6 font-poppins text-base font-extrabold text-gray-950">
        Recommended topics
      </h3>
      <div className="flex flex-wrap gap-3">
        {recommendedTopics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => onCategoryChange(topic)}
            className={`rounded-full px-4 py-2 font-inter text-sm font-semibold transition ${
              selectedCategory === topic
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </section>

    <section>
      <h3 className="mb-5 font-poppins text-base font-extrabold text-gray-950">
        Who to follow
      </h3>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
          <Sparkles size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-poppins text-sm font-extrabold text-gray-950">
            The Soil Lab
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            Practical notes for healthier beds and better harvests.
          </p>
        </div>
        <Button
          variant="outlined"
          size="small"
          className="!rounded-full !border-gray-900 !px-4 !py-1 !text-gray-950"
        >
          Follow
        </Button>
      </div>
    </section>
  </aside>
  );
};

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableCategories, setAvailableCategories] = useState(recommendedTopics);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    const loadBlogs = async () => {
      setLoading(true);
      setFeedError("");
      const response = await getAllBlogs(selectedCategory);

      if (!active) return;
      if (response.status) {
        const blogs = Array.isArray(response.data) ? response.data : [];
        setArticles(blogs);
        if (selectedCategory === "All") {
          setAvailableCategories((current) => [
            ...new Set([
              ...current,
              ...blogs.map((blog) => blog.category).filter(Boolean),
            ]),
          ]);
        }
      } else {
        setArticles([]);
        setFeedError(response.message);
      }
      setLoading(false);
    };

    loadBlogs();
    return () => {
      active = false;
    };
  }, [selectedCategory, refreshKey]);

  const handlePublished = () => {
    setIsWriting(false);
    setSelectedCategory("All");
    setRefreshKey((value) => value + 1);
  };

  const handleLike = async (blogId) => {
    const response = await likeBlog(blogId);
    if (!response.status) {
      setFeedError(response.message);
      return;
    }
    setArticles((current) => current.map((article) =>
      article.id === blogId ? response.data : article
    ));
    setRefreshKey((value) => value + 1);
  };

  if (isWriting) {
    return (
      <CreateBlog
        onCancel={() => setIsWriting(false)}
        onPublished={handlePublished}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_360px] gap-10 px-6 py-10 max-lg:block">
        <main className="min-w-0">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h2 className="font-poppins text-3xl font-extrabold text-gray-950">
                Gardening Blog
              </h2>
              <p className="mt-2 font-inter text-base text-gray-600">
                Expert tips, guides, and field notes for organic growing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden rounded-full p-3 text-gray-600 transition hover:bg-gray-100 hover:text-green-700 sm:inline-flex">
                <Search size={20} />
              </button>
              <Button
                variant="contained"
                onClick={() => setIsWriting(true)}
                startIcon={<PenLine size={18} />}
                className={`${baseStyles} ${variants.primary} ${sizes.sm}`}
              >
                Write
              </Button>
            </div>
          </div>

          <div className="mb-8 flex gap-8 border-b border-gray-200 font-inter text-sm">
            <button className="border-b border-gray-950 pb-4 font-semibold text-gray-950">
              For you
            </button>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {["All", ...availableCategories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 font-inter text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800"
                }`}
              >
                {category === "All" ? "All latest" : category}
              </button>
            ))}
          </div>

          <div>
            {loading && (
              <div className="flex justify-center py-16">
                <CircularProgress color="success" />
              </div>
            )}
            {!loading && feedError && <Alert severity="error">{feedError}</Alert>}
            {!loading && !feedError && articles.length === 0 && (
              <p className="py-16 text-center font-inter text-gray-500">
                No published blogs found in this category.
              </p>
            )}
            {!loading && !feedError && articles.map((article) => (
              <BlogArticleRow key={article.id} article={article} onLike={handleLike} />
            ))}
          </div>
        </main>

        <BlogSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          rankingsRefresh={refreshKey}
        />
      </div>
    </div>
  );
};

export default BlogPage;
