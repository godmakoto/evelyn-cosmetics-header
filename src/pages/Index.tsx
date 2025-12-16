import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Placeholder content to demonstrate sticky header */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground">
            Bienvenida a Evelyn Cosmetics
          </h1>
          <p className="text-lg text-muted-foreground font-body">
            Tu destino para el cuidado de la piel y dermocosmética de alta calidad.
          </p>
        </div>
        
        {/* Spacer to test sticky header */}
        <div className="mt-16 space-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-64 bg-secondary/50 rounded-2xl flex items-center justify-center border border-border"
            >
              <span className="text-muted-foreground font-body">
                Contenido de ejemplo - Sección {i}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
