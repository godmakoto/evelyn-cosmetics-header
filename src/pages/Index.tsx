import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { CategoriesCarousel } from "@/components/CategoriesCarousel";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BestSellersCarousel } from "@/components/BestSellersCarousel";
import { BackInStockCarousel } from "@/components/BackInStockCarousel";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import { SaleBanner } from "@/components/SaleBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Best Sellers Carousel */}
      <BestSellersCarousel />

      {/* Categories Carousel */}
      <CategoriesCarousel />

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Sale Banner */}
      <SaleBanner />

      {/* Back In Stock Carousel */}
      <BackInStockCarousel />

      {/* Brands Carousel */}
      <BrandsCarousel />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;