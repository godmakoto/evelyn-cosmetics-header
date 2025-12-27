import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Contenido de la página del producto - Vacío por ahora */}
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Página de producto (contenido pendiente)</p>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
