import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { CategoriesCarousel } from "@/components/CategoriesCarousel";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BestSellersCarousel } from "@/components/BestSellersCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Categories Carousel */}
      <CategoriesCarousel />
      
      {/* Best Sellers Carousel */}
      <BestSellersCarousel />
      
      {/* Product Carousel */}
      <ProductCarousel />
      
      {/* Main content */}
    </div>
  );
};

export default Index;