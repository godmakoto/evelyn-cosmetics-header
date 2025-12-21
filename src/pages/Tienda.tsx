import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tienda = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Contenido de la tienda irá aquí */}
      </main>
      <Footer />
    </div>
  );
};

export default Tienda;
