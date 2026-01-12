import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, FileText, Zap, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useProduct, Product } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/constants";
import { getFirstCategory, getAllCategories, hasCategory } from "@/utils/productHelpers";

// Helper function to convert Supabase Product to ProductDetail format
const convertToProductDetail = (product: Product) => {
  const images = [
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4,
    product.image_5,
    product.image_6,
    product.image_7,
  ].filter(Boolean) as string[];

  return {
    id: product.id,
    name: product.title,
    brand: product.brand || "Sin marca",
    price: product.offer_price || product.regular_price,
    originalPrice: product.offer_price ? product.regular_price : undefined,
    category: getFirstCategory(product) || "Sin categoría",
    description: product.description || product.long_description || "",
    images: images.length > 0 ? images : [DEFAULT_PRODUCT_IMAGE],
    fullDescription: product.long_description || product.description || "",
    howToUse: product.usage_instructions || "Consulte las instrucciones del producto.",
    ingredients: product.ingredients || "Consulte el empaque del producto.",
  };
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, items, setIsCartOpen } = useCart();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Desktop drag state for image gallery
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);

  // Fetch product from Supabase
  const { data: productData, isLoading: isLoadingProduct } = useProduct(id);
  const { data: allProducts } = useProducts();

  // Convert to ProductDetail format
  const product = productData ? convertToProductDetail(productData) : null;

  // Get related products by category (buscar en todos los arrays de categorías)
  const relatedProducts = allProducts && productData
    ? allProducts
        .filter(p => {
          if (p.id === productData.id || p.is_hidden) return false;

          // Obtener todas las categorías del producto actual
          const currentCategories = getAllCategories(productData);

          // Verificar si el producto relacionado comparte alguna categoría
          return currentCategories.some(cat => hasCategory(p, cat));
        })
        .slice(0, 6)
        .map(convertToProductDetail)
    : [];

  // Image gallery carousel for mobile - MUST be called before any conditional returns
  const [imageEmblaRef, imageEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps"
  });

  // Related products carousel setup - MUST be called before any conditional returns
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: false
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onImageSelect = useCallback(() => {
    if (!imageEmblaApi) return;
    setSelectedImage(imageEmblaApi.selectedScrollSnap());
  }, [imageEmblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedCarouselIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Si el producto no existe y ya terminó de cargar, redirigir
  useEffect(() => {
    if (!isLoadingProduct && !product) {
      navigate("/");
    }
  }, [product, navigate, isLoadingProduct]);

  // Reset selected image and scroll to top when product changes
  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Detect tablet
  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  // Image carousel effect
  useEffect(() => {
    if (!imageEmblaApi) return;
    imageEmblaApi.on("select", onImageSelect);
    onImageSelect();
    return () => {
      imageEmblaApi.off("select", onImageSelect);
    };
  }, [imageEmblaApi, onImageSelect]);

  // Related products carousel effect
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Si está cargando o el producto no existe, mostrar loading o null
  if (isLoadingProduct || !product) {
    return null;
  }

  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.images[0],
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined
      });
    }
  };

  const handleRelatedProductAddToCart = (relatedProduct: typeof relatedProducts[0]) => {
    const isRelatedInCart = items.some(item => item.id === relatedProduct.id);
    if (isRelatedInCart) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: relatedProduct.id,
        name: relatedProduct.name,
        image: relatedProduct.images[0],
        originalPrice: relatedProduct.originalPrice || relatedProduct.price,
        discountedPrice: relatedProduct.originalPrice ? relatedProduct.price : undefined
      });
    }
  };

  const isProductInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const handleRelatedCardClick = (productId: string) => {
    navigate(`/producto/${productId}`);
  };

  const handleBrandClick = () => {
    navigate('/tienda', { state: { brandFilter: product.brand } });
  };

  // Desktop image gallery mouse drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    startX.current = e.clientX;
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    dragDistance.current = e.clientX - startX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 50;

    if (Math.abs(dragDistance.current) > threshold) {
      if (dragDistance.current > 0) {
        // Dragged right - go to previous image
        setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
      } else {
        // Dragged left - go to next image
        setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0);
      }
    }

    dragDistance.current = 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile: Full-width image carousel - Outside main container */}
      <div className="lg:hidden">
        <div className="overflow-hidden mb-4" ref={imageEmblaRef}>
          <div className="flex">
            {product.images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="aspect-square bg-secondary">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 px-4">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                imageEmblaApi?.scrollTo(index);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                index === selectedImage
                  ? "w-8 bg-foreground"
                  : "w-2 bg-border"
              )}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-8 md:py-12">
        {/* Product Section - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

          {/* Left Column - Image Gallery */}
          <div className="w-full">
            {/* Mobile carousel moved outside - this div kept for layout consistency */}
            <div className="lg:hidden">
              {/* Mobile content now rendered above, outside main container */}
            </div>

            {/* Desktop: Thumbnails + Main Image */}
            <div className="hidden lg:flex gap-4">
              {/* Thumbnails column */}
              <div className="flex flex-col gap-3 w-24">
                {product.images.slice(0, 5).map((image, index) => {
                  const isLastVisible = index === 4 && product.images.length > 5;
                  const remainingImages = product.images.length - 6;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "aspect-square rounded-lg overflow-hidden border-2 transition-all relative",
                        index === selectedImage
                          ? "border-foreground"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {isLastVisible && remainingImages > 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-3xl font-bold">+ {remainingImages}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main image */}
              <div
                className="flex-1 aspect-square overflow-hidden rounded-2xl bg-secondary cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Brand */}
            <button
              onClick={handleBrandClick}
              className="text-sm text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground transition-colors text-left w-fit"
            >
              {product.brand}
            </button>

            {/* Product Name */}
            <h1 className="text-xl md:text-4xl font-display font-semibold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg md:text-3xl font-bold text-foreground">
                {product.price.toFixed(1)} Bs
              </span>
              {product.originalPrice && (
                <span className="text-base md:text-xl text-muted-foreground line-through">
                  {product.originalPrice.toFixed(1)} Bs
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              variant={isInCart ? "outline" : "default"}
              size="lg"
              className="w-full rounded-full gap-2 text-base py-6 mb-6"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-5 h-5" />
              {isInCart ? "Ver carrito" : "Agregar"}
            </Button>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Accordion Section - Below both columns */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {/* Description */}
            <AccordionItem value="description" className="border-b border-border">
              <AccordionTrigger className="text-foreground hover:text-foreground/80 py-5">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="text-base font-medium">Descripción del Producto</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pt-2">
                {product.fullDescription}
              </AccordionContent>
            </AccordionItem>

            {/* How to Use */}
            <AccordionItem value="how-to-use" className="border-b border-border">
              <AccordionTrigger className="text-foreground hover:text-foreground/80 py-5">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span className="text-base font-medium">Modo de Uso</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pt-2 whitespace-pre-line">
                {product.howToUse}
              </AccordionContent>
            </AccordionItem>

            {/* Ingredients */}
            <AccordionItem value="ingredients" className="border-b border-border">
              <AccordionTrigger className="text-foreground hover:text-foreground/80 py-5">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-base font-medium">Ingredientes</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pt-2">
                {product.ingredients}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related Products Carousel */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
              Productos relacionados
            </h2>

            <div className={cn("relative", isMobile || isTablet ? "px-0" : "px-14")}>
              {/* Navigation Arrows - Desktop Only */}
              {!isMobile && !isTablet && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:bg-secondary transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:bg-secondary transition-colors"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </>
              )}

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {relatedProducts.map(relProduct => (
                    <div
                      key={relProduct.id}
                      className={cn(
                        "flex-shrink-0 px-2",
                        isMobile ? "w-[72%]" : isTablet ? "w-[38%]" : "lg:w-[30%] xl:w-[28%] w-1/3"
                      )}
                    >
                      <div
                        className="bg-background border border-border rounded-xl h-full flex flex-col overflow-hidden cursor-pointer"
                        onClick={() => handleRelatedCardClick(relProduct.id)}
                      >
                        {/* Product Image */}
                        <div className="overflow-hidden bg-secondary aspect-square">
                          <img
                            src={relProduct.images[0]}
                            alt={relProduct.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className={cn("flex-1 flex flex-col", isMobile ? "p-4 pt-3" : "p-5 pt-4 lg:p-6 lg:pt-4")}>
                          {/* Brand */}
                          {relProduct.brand && (
                            <span className="text-xs text-muted-foreground mb-1">
                              {relProduct.brand}
                            </span>
                          )}

                          {/* Name */}
                          <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                            {relProduct.name}
                          </h3>

                          {/* Prices */}
                          <div className="flex items-center gap-2 mb-4 mt-auto">
                            <span className="text-lg font-semibold text-foreground">
                              Bs {relProduct.price.toFixed(1)}
                            </span>
                            {relProduct.originalPrice && relProduct.originalPrice > relProduct.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                Bs {relProduct.originalPrice.toFixed(1)}
                              </span>
                            )}
                          </div>

                          {/* Add Button */}
                          <Button
                            variant={isProductInCart(relProduct.id) ? "outline" : "default"}
                            className="w-full rounded-full gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRelatedProductAddToCart(relProduct);
                            }}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            {isProductInCart(relProduct.id) ? "Ver carrito" : "Agregar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "h-2 md:h-2.5 rounded-full",
                      "transition-all duration-300",
                      index === selectedCarouselIndex
                        ? "bg-foreground w-6 md:w-8"
                        : "w-2 md:w-2.5 bg-border hover:bg-muted-foreground"
                    )}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
