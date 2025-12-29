export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  content: {
    type: 'paragraph' | 'heading' | 'list' | 'image';
    content?: string;
    items?: string[];
    src?: string;
    alt?: string;
    level?: 2 | 3;
  }[];
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "como-armar-rutina-skincare-perfecta",
    title: "Cómo Armar tu Rutina de Skincare Perfecta",
    excerpt: "Descubre los pasos fundamentales para crear una rutina de cuidado facial personalizada que realmente funcione para tu tipo de piel.",
    author: {
      name: "Dra. Ana Martínez"
    },
    date: "15 Dic 2024",
    readTime: "5 min de lectura",
    coverImage: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&auto=format&fit=crop&q=80",
    category: "Skincare",
    content: [
      {
        type: 'heading',
        level: 2,
        content: '¿Por qué necesitas una rutina de skincare?'
      },
      {
        type: 'paragraph',
        content: 'Una rutina de cuidado facial bien estructurada es la clave para mantener una piel saludable, radiante y protegida. No se trata solo de usar productos al azar, sino de crear un sistema que funcione específicamente para tu tipo de piel y necesidades.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Los pasos fundamentales'
      },
      {
        type: 'paragraph',
        content: 'Una rutina básica pero efectiva debe incluir cuatro pasos esenciales: limpieza, tonificación, tratamiento y protección. Cada uno cumple una función específica que complementa los demás.'
      },
      {
        type: 'list',
        items: [
          'Limpieza: Retira impurezas, maquillaje y exceso de grasa',
          'Tonificación: Equilibra el pH de la piel y prepara para los siguientes pasos',
          'Tratamiento: Serums o concentrados según tus necesidades (hidratación, anti-edad, manchas)',
          'Protección: Crema hidratante durante el día con SPF obligatorio'
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: 'Rutina de día vs rutina de noche'
      },
      {
        type: 'paragraph',
        content: 'Durante el día, tu piel necesita protección contra agentes externos como la radiación UV, contaminación y estrés oxidativo. Por la noche, aprovecha el proceso natural de regeneración celular para usar productos más concentrados y nutritivos.'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
        alt: 'Productos de skincare organizados'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Adapta la rutina a tu tipo de piel'
      },
      {
        type: 'paragraph',
        content: 'No existe una rutina única para todos. Identifica si tu piel es grasa, seca, mixta o sensible, y elige productos formulados específicamente para tus características.'
      },
      {
        type: 'list',
        items: [
          'Piel grasa: Limpiadores en gel, serums con niacinamida, hidratantes oil-free',
          'Piel seca: Limpiadores cremosos, ácido hialurónico, cremas nutritivas',
          'Piel mixta: Combina productos según las zonas de tu rostro',
          'Piel sensible: Productos hipoalergénicos, sin fragancias, con ingredientes calmantes'
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: 'Consejos finales'
      },
      {
        type: 'paragraph',
        content: 'La constancia es clave. Dale a tu piel al menos 4-6 semanas para adaptarse a una nueva rutina antes de evaluar resultados. Introduce productos nuevos de uno en uno para identificar qué funciona mejor para ti. Y recuerda: menos es más. No necesitas 10 productos, solo los correctos para ti.'
      }
    ]
  },
  {
    id: "2",
    slug: "beneficios-vitamina-c-para-piel",
    title: "Los Increíbles Beneficios de la Vitamina C para tu Piel",
    excerpt: "Conoce por qué la vitamina C se ha convertido en el ingrediente estrella del skincare y cómo incorporarla correctamente.",
    author: {
      name: "Dra. Ana Martínez"
    },
    date: "10 Dic 2024",
    readTime: "4 min de lectura",
    coverImage: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80",
    category: "Ingredientes",
    content: [
      {
        type: 'heading',
        level: 2,
        content: '¿Qué es la vitamina C?'
      },
      {
        type: 'paragraph',
        content: 'La vitamina C, también conocida como ácido ascórbico, es un poderoso antioxidante que protege la piel del daño causado por los radicales libres y estimula la producción de colágeno.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Beneficios principales'
      },
      {
        type: 'list',
        items: [
          'Ilumina el tono de la piel y reduce manchas oscuras',
          'Estimula la producción de colágeno para una piel más firme',
          'Protege contra el daño ambiental y los radicales libres',
          'Reduce la apariencia de líneas finas y arrugas',
          'Unifica el tono de la piel y mejora la textura'
        ]
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80',
        alt: 'Serum de vitamina C'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Cómo usar la vitamina C'
      },
      {
        type: 'paragraph',
        content: 'Para obtener mejores resultados, aplica tu serum de vitamina C por las mañanas después de limpiar y tonificar, pero antes de tu crema hidratante y protector solar. Comienza con una concentración del 10% si es tu primera vez.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Consejos de almacenamiento'
      },
      {
        type: 'paragraph',
        content: 'La vitamina C es sensible a la luz y el aire. Guarda tu producto en un lugar fresco y oscuro, preferiblemente en un envase opaco. Si notas que el serum cambia a un color marrón oscuro, es señal de que se ha oxidado y debes reemplazarlo.'
      }
    ]
  },
  {
    id: "3",
    slug: "guia-proteccion-solar-diaria",
    title: "Guía Completa: Protección Solar Diaria",
    excerpt: "Todo lo que necesitas saber sobre el protector solar, el producto más importante de tu rutina de skincare.",
    author: {
      name: "Dra. Ana Martínez"
    },
    date: "5 Dic 2024",
    readTime: "6 min de lectura",
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    category: "Protección Solar",
    content: [
      {
        type: 'heading',
        level: 2,
        content: '¿Por qué usar protector solar todos los días?'
      },
      {
        type: 'paragraph',
        content: 'La radiación UV es responsable del 80% del envejecimiento prematuro de la piel. Usar protector solar diariamente, incluso en días nublados, es la mejor inversión para prevenir arrugas, manchas y daño celular.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Tipos de protectores solares'
      },
      {
        type: 'list',
        items: [
          'Físicos o minerales: Reflejan los rayos UV (óxido de zinc, dióxido de titanio)',
          'Químicos: Absorben la radiación UV y la transforman en calor',
          'Híbridos: Combinan filtros físicos y químicos para mejor protección'
        ]
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop&q=80',
        alt: 'Aplicación de protector solar'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Cómo aplicar correctamente'
      },
      {
        type: 'paragraph',
        content: 'La cantidad importa: necesitas aproximadamente 2mg por cm² de piel. Para el rostro, esto equivale a media cucharadita. Aplica 15-20 minutos antes de la exposición solar y reaplica cada 2-3 horas.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Factores a considerar'
      },
      {
        type: 'list',
        items: [
          'SPF mínimo de 30 para uso diario',
          'Protección de amplio espectro (UVA y UVB)',
          'Resistente al agua si vas a nadar o sudar',
          'Textura adecuada para tu tipo de piel',
          'Sin efecto blanqueador si tienes piel oscura'
        ]
      },
      {
        type: 'paragraph',
        content: 'Recuerda que el protector solar es el último paso de tu rutina de skincare matutina, pero el primero en importancia para la salud a largo plazo de tu piel.'
      }
    ]
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts;
};
