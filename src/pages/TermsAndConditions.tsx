import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "terminos-generales",
    title: "Términos y Condiciones Generales",
    items: [
      {
        title: "Términos y Condiciones Generales",
        content: "Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso. Evelyn Cosmetics se reserva el derecho de modificar estos términos en cualquier momento. Es responsabilidad del usuario revisar periódicamente estos términos para estar informado de cualquier cambio."
      },
      {
        title: "Información Sobre el Sitio Web",
        content: "Este sitio web es operado por Evelyn Cosmetics. Los productos ofrecidos están sujetos a disponibilidad y pueden ser discontinuados en cualquier momento sin previo aviso. Nos esforzamos por mostrar los colores y las imágenes de nuestros productos con la mayor precisión posible, sin embargo, no podemos garantizar que la visualización de cualquier color en su monitor sea precisa."
      },
      {
        title: "Marcas y Propiedad Intelectual",
        content: "Todas las marcas, logotipos, imágenes y contenidos presentes en este sitio web son propiedad de Evelyn Cosmetics o de sus respectivos propietarios. Queda prohibida su reproducción, distribución o uso sin autorización expresa."
      },
      {
        title: "Enlaces Externos",
        content: "Este sitio web puede contener enlaces a sitios de terceros. Evelyn Cosmetics no es responsable del contenido, políticas de privacidad o prácticas de sitios web de terceros. El uso de enlaces externos es bajo su propio riesgo."
      },
      {
        title: "Foros Públicos y de Usuario",
        content: "Las opiniones expresadas en comentarios y reseñas son exclusivamente de los usuarios y no reflejan necesariamente la opinión de Evelyn Cosmetics. Nos reservamos el derecho de moderar, editar o eliminar contenido inapropiado."
      },
      {
        title: "Uso Específico",
        content: "Este sitio web está destinado exclusivamente para uso personal y no comercial. Queda prohibido el uso de robots, scrapers o cualquier medio automatizado para acceder al sitio sin nuestro permiso expreso."
      }
    ]
  },
  {
    id: "politica-cambios",
    title: "Política de Cambios, Devoluciones y Garantías",
    items: [
      {
        title: "Política de Cambios",
        content: "Aceptamos cambios de productos en un plazo de 30 días desde la fecha de compra, siempre que el producto se encuentre en su empaque original, sin usar y con todas sus etiquetas. Los productos en oferta o de venta final no son elegibles para cambio."
      },
      {
        title: "Política de Devoluciones",
        content: "Las devoluciones se aceptan dentro de los 30 días posteriores a la compra. El producto debe estar sin abrir, sin usar y en su empaque original. Una vez recibido y verificado el producto, procesaremos el reembolso en un plazo de 5 a 10 días hábiles."
      },
      {
        title: "Garantías",
        content: "Todos nuestros productos cuentan con garantía del fabricante. En caso de defectos de fabricación, contacte con nuestro servicio al cliente dentro de los primeros 30 días de compra para iniciar el proceso de garantía."
      },
      {
        title: "Productos Dañados",
        content: "Si recibe un producto dañado, por favor contáctenos inmediatamente con fotografías del producto y del empaque. Procederemos con el reemplazo o reembolso según corresponda."
      },
      {
        title: "Excepciones",
        content: "Por razones de higiene y seguridad, no aceptamos devoluciones de productos que hayan sido abiertos, usados o que no estén en su empaque original sellado."
      },
      {
        title: "Proceso de Devolución",
        content: "Para iniciar una devolución, contacte a nuestro servicio al cliente a través de WhatsApp. Le proporcionaremos las instrucciones necesarias y la dirección de devolución. Los costos de envío de devolución corren por cuenta del cliente, excepto en casos de error por nuestra parte o productos defectuosos."
      }
    ]
  },
  {
    id: "politica-privacidad",
    title: "Política de Privacidad y Tratamiento de Datos Personales",
    items: [
      {
        title: "Recopilación de Datos",
        content: "Recopilamos información personal que usted nos proporciona voluntariamente al realizar una compra, crear una cuenta o contactarnos. Esta información puede incluir nombre, dirección de correo electrónico, dirección de envío y número de teléfono."
      },
      {
        title: "Uso de la Información",
        content: "Utilizamos su información personal para procesar pedidos, mejorar nuestros servicios, enviar actualizaciones sobre productos y ofertas (si ha optado por recibirlas), y cumplir con obligaciones legales."
      },
      {
        title: "Protección de Datos",
        content: "Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o alteración. Sin embargo, ningún método de transmisión por Internet es 100% seguro."
      },
      {
        title: "Compartir Información",
        content: "No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para procesar su pedido (ej. servicios de envío) o cuando lo requiera la ley."
      },
      {
        title: "Sus Derechos",
        content: "Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos a través de nuestros canales de atención al cliente."
      },
      {
        title: "Cookies",
        content: "Utilizamos cookies para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio."
      }
    ]
  },
  {
    id: "envio-express",
    title: "Términos y Condiciones Envío Express",
    items: [
      {
        title: "Disponibilidad del Servicio",
        content: "El servicio de envío express está disponible en áreas urbanas seleccionadas. La disponibilidad se confirmará al momento de realizar el pedido según su código postal."
      },
      {
        title: "Tiempos de Entrega",
        content: "El envío express garantiza la entrega en 24-48 horas hábiles para pedidos realizados antes de las 12:00 PM. Los pedidos realizados después de este horario serán procesados al día siguiente."
      },
      {
        title: "Costos Adicionales",
        content: "El servicio de envío express tiene un costo adicional que se calculará automáticamente al momento del checkout según la zona de entrega y el peso del paquete."
      },
      {
        title: "Seguimiento del Pedido",
        content: "Recibirá un número de seguimiento por correo electrónico una vez que su pedido haya sido despachado. Podrá rastrear su paquete en tiempo real a través de nuestro sistema de seguimiento."
      },
      {
        title: "Condiciones Especiales",
        content: "Los días festivos y fines de semana no se cuentan como días hábiles. En caso de condiciones climáticas adversas o situaciones de fuerza mayor, los tiempos de entrega pueden verse afectados."
      },
      {
        title: "Responsabilidad",
        content: "Evelyn Cosmetics no se hace responsable por demoras causadas por información de entrega incorrecta proporcionada por el cliente o por la ausencia del destinatario en el domicilio."
      }
    ]
  },
  {
    id: "informacion-sitio",
    title: "Información Sobre el Sitio Web",
    items: [
      {
        title: "Descripción del Servicio",
        content: "Evelyn Cosmetics es una plataforma de comercio electrónico dedicada a la venta de productos de cosmética y cuidado personal de marcas reconocidas internacionalmente. Ofrecemos un catálogo curado de productos de alta calidad."
      },
      {
        title: "Registro de Cuenta",
        content: "Para realizar compras, no es necesario crear una cuenta. Sin embargo, crear una cuenta le permite guardar direcciones, ver el historial de pedidos y recibir ofertas exclusivas."
      },
      {
        title: "Precios y Disponibilidad",
        content: "Todos los precios están expresados en Bolivianos (Bs) e incluyen impuestos aplicables. Los precios y la disponibilidad de productos están sujetos a cambios sin previo aviso."
      },
      {
        title: "Métodos de Pago",
        content: "Actualmente procesamos pedidos a través de WhatsApp donde podrá coordinar los métodos de pago disponibles, incluyendo transferencias bancarias y pagos en efectivo contra entrega."
      },
      {
        title: "Confirmación de Pedido",
        content: "Recibirá una confirmación de su pedido a través de WhatsApp. Esta confirmación incluirá los detalles del pedido, el monto total y la información de envío."
      },
      {
        title: "Servicio al Cliente",
        content: "Nuestro equipo de servicio al cliente está disponible para atender sus consultas a través de WhatsApp. Nos esforzamos por responder todas las consultas en un plazo de 24 horas hábiles."
      }
    ]
  },
  {
    id: "responsabilidad",
    title: "Responsabilidad y Uso Específico",
    items: [
      {
        title: "Responsabilidad del Usuario",
        content: "El usuario es responsable de mantener la confidencialidad de su información de cuenta y de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente de cualquier uso no autorizado."
      },
      {
        title: "Limitación de Responsabilidad",
        content: "Evelyn Cosmetics no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestros productos o servicios."
      },
      {
        title: "Uso Apropiado",
        content: "Los productos vendidos son para uso cosmético personal. No nos hacemos responsables del uso inadecuado de los productos o de reacciones alérgicas. Se recomienda realizar una prueba de parche antes del primer uso."
      },
      {
        title: "Acuerdo Completo",
        content: "Estos términos y condiciones constituyen el acuerdo completo entre usted y Evelyn Cosmetics con respecto al uso de este sitio web y reemplazan todos los acuerdos anteriores."
      },
      {
        title: "Alteración de Términos",
        content: "Evelyn Cosmetics se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web."
      },
      {
        title: "Legislación Aplicable",
        content: "Estos términos y condiciones se rigen por las leyes de Bolivia. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Bolivia."
      }
    ]
  }
];

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (itemIndex: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />

      <main className="flex-1 py-8 lg:py-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Title */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="h-[1px] bg-[#ddd] flex-1 max-w-[200px]"></div>
              <h1 className="text-2xl lg:text-3xl font-medium text-[#222] mx-6">
                TÉRMINOS<br className="lg:hidden" />
                <span className="lg:ml-2">Y CONDICIONES</span>
              </h1>
              <div className="h-[1px] bg-[#ddd] flex-1 max-w-[200px]"></div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-8">
            {/* Sidebar */}
            <aside className="w-[320px] flex-shrink-0">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full text-left px-6 py-4 border-b border-[#f0f0f0] transition-colors text-[15px] font-medium",
                      activeSection === section.id
                        ? "bg-[#f8e8f0] text-[#222]"
                        : "bg-white text-[#666] hover:bg-[#f9f9f9]"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-[#f8e8f0] rounded-lg p-8">
                <h2 className="text-xl font-semibold text-[#222] mb-6">
                  {currentSection.title}
                </h2>

                <div className="space-y-3">
                  {currentSection.items.map((item, index) => {
                    const itemKey = `${activeSection}-${index}`;
                    const isExpanded = expandedItems[itemKey];

                    return (
                      <div key={index} className="bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(itemKey)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f9f9f9] transition-colors"
                        >
                          <span className="text-[15px] font-medium text-[#222]">
                            {item.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-[#666] transition-transform flex-shrink-0 ml-4",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isExpanded ? "max-h-[500px]" : "max-h-0"
                          )}
                        >
                          <div className="px-5 pb-5 pt-2">
                            <p className="text-[14px] text-[#666] leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {sections.map((section) => {
                const sectionKey = section.id;
                const isSectionExpanded = expandedItems[sectionKey];

                return (
                  <div key={section.id} className="border-b border-[#f0f0f0] last:border-b-0">
                    <button
                      onClick={() => toggleItem(sectionKey)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#f8e8f0]"
                    >
                      <span className="text-[15px] font-medium text-[#222] pr-4">
                        {section.title}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 text-[#666] transition-transform flex-shrink-0",
                          isSectionExpanded && "rotate-90"
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isSectionExpanded ? "max-h-[2000px]" : "max-h-0"
                      )}
                    >
                      <div className="px-4 py-3 space-y-2">
                        {section.items.map((item, index) => {
                          const itemKey = `${section.id}-item-${index}`;
                          const isItemExpanded = expandedItems[itemKey];

                          return (
                            <div key={index} className="bg-[#f9f9f9] rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleItem(itemKey)}
                                className="w-full flex items-center justify-between px-4 py-3 text-left"
                              >
                                <span className="text-[14px] font-medium text-[#222] pr-3">
                                  {item.title}
                                </span>
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 text-[#666] transition-transform flex-shrink-0",
                                    isItemExpanded && "rotate-180"
                                  )}
                                />
                              </button>

                              <div
                                className={cn(
                                  "overflow-hidden transition-all duration-300",
                                  isItemExpanded ? "max-h-[500px]" : "max-h-0"
                                )}
                              >
                                <div className="px-4 pb-4 pt-1">
                                  <p className="text-[13px] text-[#666] leading-relaxed">
                                    {item.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
