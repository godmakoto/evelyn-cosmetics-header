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
      
      {/* Spacer to compensate for fixed header */}
      <div className="h-16 md:h-20 lg:h-24" />
      
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