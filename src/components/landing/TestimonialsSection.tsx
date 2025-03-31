
import React from "react";
import { motion } from "framer-motion";
import { Star, User, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  isVisible: boolean;
}

const testimonials = [
  {
    name: "Ricardo Almeida",
    position: "Diretor Financeiro",
    company: "Empresa de Tecnologia Ltda",
    text: "O sistema nos ajudou a recuperar mais de R$ 200.000 em créditos tributários que não sabíamos que tínhamos direito. A interface é intuitiva e o suporte técnico é excelente.",
    stars: 5,
  },
  {
    name: "Carla Mendes",
    position: "Contadora Sênior",
    company: "Contabilidade & Associados",
    text: "Conseguimos automatizar processos que antes levavam dias para serem concluídos. A análise de dados e geração de relatórios são precisas e confiáveis.",
    stars: 5,
  },
  {
    name: "Fernando Costa",
    position: "Advogado Tributarista",
    company: "Costa Advocacia",
    text: "Como advogado tributarista, posso afirmar que este sistema trouxe uma nova dimensão ao nosso trabalho. O acompanhamento de processos ficou muito mais eficiente.",
    stars: 4,
  },
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/20 to-white pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      
      {/* Large Quote icon in background */}
      <motion.div 
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-100"
        style={{ fontSize: '300px', opacity: 0.5 }}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Quote size={300} strokeWidth={0.5} />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-lawyer-800 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lawyer-600 max-w-2xl mx-auto text-lg">
            Histórias de sucesso de escritórios que transformaram sua gestão tributária
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border border-sky-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isVisible ? 
                { opacity: 1, y: 0, scale: 1 } : 
                { opacity: 0, y: 30, scale: 0.95 }
              }
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2 + 0.3,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
            >
              {/* Quote mark */}
              <div className="absolute -top-2 -right-2 text-sky-100 opacity-40">
                <Quote size={60} />
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.stars)].map((_, i) => (
                    <Star key={i + testimonial.stars} className="h-5 w-5 text-gray-300" />
                  ))}
                </div>
                
                <p className="text-lawyer-600 italic relative z-10">"{testimonial.text}"</p>
                
                <div className="flex items-center pt-4 border-t border-sky-50">
                  <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-full p-2 text-white">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-lawyer-800">{testimonial.name}</h4>
                    <p className="text-sm text-lawyer-500">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-sky-50 opacity-30" />
              <div className="absolute top-1/2 right-0 w-1 h-12 bg-sky-300 opacity-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
