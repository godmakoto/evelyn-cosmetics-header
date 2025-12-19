import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { CategoriesCarousel } from "@/components/CategoriesCarousel";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BestSellersCarousel } from "@/components/BestSellersCarousel";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Invisible placeholder - same height as header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Best Sellers Carousel */}
      <BestSellersCarousel />
      
      {/* Categories Carousel */}
      <CategoriesCarousel />
      
      {/* Product Carousel */}
      <ProductCarousel />
      
      {/* Brands Carousel */}
      <BrandsCarousel />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;