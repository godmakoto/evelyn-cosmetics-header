import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/shop/ProductGrid";

const Tienda = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialBrandFilter = location.state?.brandFilter || null;
  const initialCategoryFilter = location.state?.categoryFilter || null;
  const initialSubcategoryFilter = location.state?.subcategoryFilter || null;
  const resetFiltersTimestamp = location.state?.resetFiltersTimestamp || null;
  const searchQuery = location.state?.searchQuery || null;
  const statusFilter = searchParams.get('status') || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />
      <main className="flex-1">
        <ProductGrid
          initialBrandFilter={initialBrandFilter}
          initialCategoryFilter={initialCategoryFilter}
          initialSubcategoryFilter={initialSubcategoryFilter}
          resetFiltersTimestamp={resetFiltersTimestamp}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Tienda;
