import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
const Index = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Product Carousel */}
      <ProductCarousel />
      
      {/* Main content */}
      
    </div>;
};
export default Index;