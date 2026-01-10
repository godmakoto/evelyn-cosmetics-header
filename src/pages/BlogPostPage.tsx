import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPostBySlug } from "@/data/blogPosts";
import { Calendar } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug || "");

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Meta information */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 md:mb-12 leading-tight">
          {post.title}
        </h1>

        {/* Cover Image */}
        <div className="w-full aspect-video md:aspect-[2/1] rounded-2xl overflow-hidden mb-8 md:mb-12 bg-secondary">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.map((block, index) => {
            switch (block.type) {
              case 'heading':
                if (block.level === 2) {
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-display font-semibold text-foreground mt-12 mb-4 first:mt-0">
                      {block.content}
                    </h2>
                  );
                } else if (block.level === 3) {
                  return (
                    <h3 key={index} className="text-xl md:text-2xl font-display font-semibold text-foreground mt-8 mb-3">
                      {block.content}
                    </h3>
                  );
                }
                return null;

              case 'paragraph':
                return (
                  <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {block.content}
                  </p>
                );

              case 'list':
                return (
                  <ul key={index} className="space-y-3 mb-8 ml-6">
                    {block.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-base md:text-lg text-muted-foreground leading-relaxed list-disc marker:text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                );

              case 'image':
                return (
                  <div key={index} className="w-full aspect-video rounded-2xl overflow-hidden my-8 md:my-12 bg-secondary">
                    <img
                      src={block.src}
                      alt={block.alt || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
