import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tienda = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-[120px] md:pt-[140px]">
        {/* Contenido de la tienda - próximamente */}
      </main>
      <Footer />
    </div>
  );
};

export default Tienda;
