import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BestSellersCarousel } from "@/components/BestSellersCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Product Carousel */}
      <ProductCarousel />
      
      {/* Best Sellers Carousel */}
      <BestSellersCarousel />
      
      {/* Main content */}
    </div>
  );
};

export default Index;