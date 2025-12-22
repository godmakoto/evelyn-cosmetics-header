import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/shop/ProductGrid";

const Tienda = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />
      <main className="flex-1">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Tienda;
