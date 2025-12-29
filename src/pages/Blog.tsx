import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cómo identificar tu tipo de piel",
    excerpt: "El primer paso para la salud es entender las necesidades únicas de tu piel. Descubre nuestra guía completa para analizar tu barrera cutánea.",
    content: "Identificar correctamente tu tipo de piel es fundamental para crear una rutina de cuidado efectiva. Existen cuatro tipos principales: normal, seca, grasa y mixta. La piel normal tiene un equilibrio perfecto de hidratación, mientras que la piel seca necesita nutrición adicional. La piel grasa produce exceso de sebo y la mixta combina zonas grasas y secas.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop",
    date: "15 Dic 2024",
    category: "Guías",
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Cómo armar tu rutina",
    excerpt: "Esenciales AM vs PM. Una guía paso a paso para aplicar activos, hidratantes y protectores solares de manera efectiva para resultados.",
    content: "Una rutina efectiva de skincare incluye limpieza, tonificación, tratamiento y protección. En la mañana, enfócate en protección solar y antioxidantes. Por la noche, es el momento ideal para tratamientos intensivos y reparadores.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
    date: "12 Dic 2024",
    category: "Rutinas",
    readTime: "7 min"
  },
  {
    id: "3",
    title: "Diferencias entre industrias de producto",
    excerpt: "Entendiendo qué ingredientes justifican el precio y dónde puedes ahorrar sin sacrificar calidad en tus productos.",
    content: "No todos los productos caros son mejores, ni todos los económicos son de baja calidad. Aprende a leer ingredientes, entender concentraciones y distinguir entre marketing y ciencia real para tomar decisiones informadas.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop",
    date: "10 Dic 2024",
    category: "Educación",
    readTime: "6 min"
  },
  {
    id: "4",
    title: "Cómo escoger un producto",
    excerpt: "Navegando entre las abrumadoras opciones para pieles sensibles y reactivas. Aprende a leer etiquetas como un dermatólogo.",
    content: "Al elegir productos, considera tu tipo de piel, preocupaciones específicas y objetivos. Lee la lista de ingredientes (los primeros 5 son los más importantes), busca productos con formulaciones limpias y evita irritantes conocidos si tienes piel sensible.",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=400&fit=crop",
    date: "8 Dic 2024",
    category: "Guías",
    readTime: "8 min"
  },
  {
    id: "5",
    title: "La Ciencia de la Hidratación",
    excerpt: "Por qué la hidratación es clave para el antienvejecimiento y la textura. Profundizando en Ácido Hialurónico, Glicerina y Ceramidas.",
    content: "La hidratación no solo previene la sequedad, sino que también fortalece la barrera cutánea y previene el envejecimiento prematuro. El ácido hialurónico atrae agua, la glicerina la retiene, y las ceramidas sellan la humedad.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
    date: "5 Dic 2024",
    category: "Ciencia",
    readTime: "10 min"
  },
  {
    id: "6",
    title: "Mitos sobre protección solar",
    excerpt: "Desmintiendo conceptos erróneos comunes sobre el SPF, la reaplicación y los dañinos mitos que ponen en riesgo tu piel todo el año.",
    content: "El protector solar no es solo para el verano ni para días soleados. Los rayos UV penetran nubes y ventanas, causando daño acumulativo. Necesitas reaplicar cada 2 horas y usar cantidad suficiente (equivalente a una cucharadita para el rostro).",
    image: "https://images.unsplash.com/photo-1556228852-80246e2faa38?w=600&h=400&fit=crop",
    date: "3 Dic 2024",
    category: "Educación",
    readTime: "6 min"
  },
  {
    id: "7",
    title: "Retinoides Explicados",
    excerpt: "El estándar de oro para el antienvejecimiento. Cómo empezar a usar derivados de la Vitamina A sin irritar tu barrera cutánea.",
    content: "Los retinoides son los ingredientes más estudiados para combatir el envejecimiento. Comienza con retinol en baja concentración, úsalo 2-3 veces por semana al principio, y siempre combínalo con protector solar durante el día.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=400&fit=crop",
    date: "1 Dic 2024",
    category: "Activos",
    readTime: "9 min"
  },
  {
    id: "8",
    title: "Cómo identificar productos originales",
    excerpt: "Guía completa para distinguir productos auténticos de falsificaciones y proteger tu piel de ingredientes potencialmente dañinos.",
    content: "Verifica sellos de autenticidad, códigos de barras, textura del empaque, ortografía correcta, y compra solo de distribuidores autorizados. Los productos falsificados pueden contener ingredientes peligrosos.",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=600&h=400&fit=crop",
    date: "28 Nov 2024",
    category: "Guías",
    readTime: "7 min"
  },
  {
    id: "9",
    title: "Rutina de noche: Pasos esenciales",
    excerpt: "Maximiza la reparación nocturna con la secuencia correcta de productos para despertar con una piel radiante y descansada.",
    content: "La rutina nocturna es crucial porque la piel se repara durante el sueño. Incluye doble limpieza, exfoliación suave (2-3 veces/semana), sérums activos, contorno de ojos, hidratante rica y tratamientos específicos.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=400&fit=crop",
    date: "25 Nov 2024",
    category: "Rutinas",
    readTime: "8 min"
  },
  {
    id: "10",
    title: "Vitamina C: El antioxidante esencial",
    excerpt: "Beneficios, formulaciones y cómo incorporar este poderoso ingrediente en tu rutina matutina para luminosidad y protección.",
    content: "La Vitamina C es un antioxidante que protege contra radicales libres, ilumina la piel y estimula la producción de colágeno. Busca formulaciones estables (ácido L-ascórbico) en concentraciones del 10-20%.",
    image: "https://images.unsplash.com/photo-1556228578-dd339a5b7082?w=600&h=400&fit=crop",
    date: "22 Nov 2024",
    category: "Activos",
    readTime: "7 min"
  }
];

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
          <article className="mb-8 lg:mb-12 bg-white rounded-lg overflow-hidden shadow-sm border border-[#e5e5e5] hover:shadow-md transition-shadow">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img
                  src={heroPost.image}
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
                <button className="flex items-center gap-2 text-[#222] font-medium hover:gap-3 transition-all group">
                  Leer Artículo
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </article>

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {gridPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#e5e5e5] hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={post.image}
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
                  <button className="flex items-center gap-2 text-sm text-[#222] font-medium hover:gap-3 transition-all group">
                    Leer artículo
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
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
