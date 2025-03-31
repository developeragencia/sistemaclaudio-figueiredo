
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface CtaSectionProps {
  isVisible: boolean;
}

const features = [
  "Recuperação integral de créditos tributários",
  "Cálculos precisos e seguros",
  "Relatórios detalhados e personalizáveis",
  "Economia de tempo e recursos",
  "Suporte técnico especializado",
  "Conformidade com a legislação vigente",
];

const CtaSection: React.FC<CtaSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-blue-900 pointer-events-none" />
      
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15), transparent 25%)",
          backgroundSize: "80% 80%",
          backgroundRepeat: "no-repeat"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Transforme a Gestão Tributária do Seu Escritório Hoje
              </h2>
              <p className="text-lg md:text-xl text-sky-100 mb-8">
                Acesse nosso sistema completo e descubra como recuperar créditos tributários de forma eficiente e segura.
              </p>
              
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-sky-300 mr-2 flex-shrink-0" />
                    <span className="text-sky-100">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login">
                  <Button 
                    size="lg" 
                    className="bg-white text-sky-900 hover:bg-sky-100 shadow-xl hover:shadow-2xl shadow-sky-900/30 transition-all duration-300"
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-20 h-20 bg-sky-400/20 rounded-full filter blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/20 rounded-full filter blur-md"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Stats card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
                <div className="text-center">
                  <h3 className="text-white font-semibold text-xl mb-6">Resultados Comprovados</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl bg-white/5">
                      <motion.div 
                        className="text-4xl font-bold text-sky-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? 
                          { opacity: 1, y: 0 } : 
                          { opacity: 0, y: 20 }
                        }
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        97%
                      </motion.div>
                      <p className="text-sky-100 text-sm mt-2">Taxa de Sucesso em Recuperações</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <motion.div 
                        className="text-4xl font-bold text-sky-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? 
                          { opacity: 1, y: 0 } : 
                          { opacity: 0, y: 20 }
                        }
                        transition={{ delay: 0.9, duration: 0.5 }}
                      >
                        +500
                      </motion.div>
                      <p className="text-sky-100 text-sm mt-2">Escritórios Atendidos</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <motion.div 
                        className="text-4xl font-bold text-sky-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? 
                          { opacity: 1, y: 0 } : 
                          { opacity: 0, y: 20 }
                        }
                        transition={{ delay: 1.0, duration: 0.5 }}
                      >
                        3x
                      </motion.div>
                      <p className="text-sky-100 text-sm mt-2">Aumento de Produtividade</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <motion.div 
                        className="text-4xl font-bold text-sky-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? 
                          { opacity: 1, y: 0 } : 
                          { opacity: 0, y: 20 }
                        }
                        transition={{ delay: 1.1, duration: 0.5 }}
                      >
                        R$2.5M
                      </motion.div>
                      <p className="text-sky-100 text-sm mt-2">Em Créditos Recuperados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
