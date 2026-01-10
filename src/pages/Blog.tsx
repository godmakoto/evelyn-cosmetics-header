import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "@/data/blogPosts";

const blogPosts = getAllBlogPosts();

const Blog = () => {
  // Desktop: 1 hero + 6 cards = 7, Mobile: 1 hero + 3 cards = 4
  const [visibleCount, setVisibleCount] = useState(() => {
    return window.innerWidth >= 1024 ? 7 : 4;
  });

  const heroPost = blogPosts[0];
  const gridPosts = blogPosts.slice(1, visibleCount);
  const hasMorePosts = visibleCount < blogPosts.length;

  const loadMore = () => {
    // En desktop cargar 6 más, en mobile 3 más
    const increment = window.innerWidth >= 1024 ? 6 : 3;
    setVisibleCount(prev => Math.min(prev + increment, blogPosts.length));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />

      <main className="flex-1 py-8 lg:py-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Title */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="h-[1px] bg-[#ddd] flex-1 max-w-[200px]"></div>
              <h1 className="text-2xl lg:text-3xl font-medium text-[#222] mx-6">
                BLOG
              </h1>
              <div className="h-[1px] bg-[#ddd] flex-1 max-w-[200px]"></div>
            </div>
            <p className="text-[#666] text-sm lg:text-base max-w-2xl mx-auto">
              Descubre consejos expertos, rutinas personalizadas y guías completas para el cuidado de tu piel
            </p>
          </div>

          {/* Hero Post */}
          <Link to={`/blog/${heroPost.slug}`}>
            <article className="mb-8 lg:mb-12 bg-white rounded-lg overflow-hidden shadow-sm border border-[#e5e5e5] hover:shadow-md transition-shadow">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={heroPost.coverImage}
                    alt={heroPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-[#999]">{heroPost.date}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#222] mb-4">
                    {heroPost.title}
                  </h2>
                  <p className="text-[#666] text-base lg:text-lg leading-relaxed mb-6">
                    {heroPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#222] font-medium hover:gap-3 transition-all group">
                    Leer Artículo
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          </Link>

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {gridPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#e5e5e5] hover:shadow-md transition-shadow cursor-pointer h-full">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-[#999]">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#222] mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#222] font-medium hover:gap-3 transition-all group">
                      Leer artículo
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {hasMorePosts && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#222] text-white font-medium rounded-lg hover:bg-[#333] transition-colors"
              >
                Cargar más artículos
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
