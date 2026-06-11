import { useState } from "react";
import {
  BookmarkPlus,
  BookOpen,
  MessageCircle,
  PenLine,
  Search,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";
import CreateBlog from "../components/organisms/CreateBlog";
import { ARTICLES } from "../utils";
import { baseStyles, sizes, variants } from "../theme/themeStyles";

const staffPicks = [
  "How compost tea changes root biology",
  "The simple watering rhythm most gardens need",
  "Why leaf color is your first soil test",
];

const recommendedTopics = [
  "Soil Health",
  "Organic",
  "Fertilizers",
  "Pest Control",
  "Composting",
  "Plant Nutrition",
];

const BlogArticleRow = ({ article }) => (
  <article className="grid grid-cols-[1fr_160px] gap-7 border-b border-gray-200 py-9 first:pt-0 max-sm:grid-cols-1">
    <div className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-600 font-inter">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
          <BookOpen size={15} />
        </span>
        <span>In OrganicFert</span>
        <span>by Garden Team</span>
        <span>{article.date}</span>
      </div>

      <h3 className="mb-2 font-poppins text-2xl font-extrabold leading-tight text-gray-950 transition-colors hover:text-green-700">
        {article.title}
      </h3>
      <p className="mb-5 line-clamp-2 font-inter text-base leading-relaxed text-gray-600">
        {article.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <Badge variant="success">{article.category}</Badge>
        <span>{article.readTime}</span>
        <span className="inline-flex items-center gap-1">
          <ThumbsUp size={15} /> 2K
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle size={15} /> 45
        </span>
        <button className="ml-auto rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-green-700">
          <BookmarkPlus size={19} />
        </button>
      </div>
    </div>

    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded bg-gradient-to-br from-green-100 via-lime-50 to-cyan-100 max-sm:w-full">
      <BookOpen size={52} className="text-green-700" />
    </div>
  </article>
);

const BlogSidebar = () => (
  <aside className="sticky top-32 hidden h-fit border-l border-gray-200 pl-9 lg:block">
    <section className="mb-11">
      <h3 className="mb-6 font-poppins text-base font-extrabold text-gray-950">
        Staff Picks
      </h3>
      <div className="space-y-6">
        {staffPicks.map((pick, index) => (
          <article key={pick}>
            <p className="mb-2 text-sm text-gray-600">Garden Team</p>
            <h4 className="font-poppins text-base font-extrabold leading-snug text-gray-950">
              {pick}
            </h4>
            <p className="mt-2 text-sm text-gray-500">{index + 2}d ago</p>
          </article>
        ))}
      </div>
      <button className="mt-6 font-inter text-sm font-semibold text-green-700">
        See the full list
      </button>
    </section>

    <section className="mb-11">
      <h3 className="mb-6 font-poppins text-base font-extrabold text-gray-950">
        Recommended topics
      </h3>
      <div className="flex flex-wrap gap-3">
        {recommendedTopics.map((topic) => (
          <button
            key={topic}
            className="rounded-full bg-gray-100 px-4 py-2 font-inter text-sm font-semibold text-gray-700 transition hover:bg-green-100 hover:text-green-800"
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

const BlogPage = () => {
  const [articles] = useState(ARTICLES);
  const [isWriting, setIsWriting] = useState(false);

  if (isWriting) {
    return (
      <CreateBlog
        onCancel={() => setIsWriting(false)}
        onPublished={() => setIsWriting(false)}
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
            <button className="pb-4 font-semibold text-gray-500 transition hover:text-gray-950">
              Featured
            </button>
          </div>

          <div>
            {articles.map((article) => (
              <BlogArticleRow key={article.id} article={article} />
            ))}
          </div>
        </main>

        <BlogSidebar />
      </div>
    </div>
  );
};

export default BlogPage;
