"use client";

import { Lightbulb, Users, MessageSquare, Zap, Sparkles, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhySection() {
  const t = useTranslations("why");

  const benefits = [
    {
      icon: Lightbulb,
      title: t("benefits.vision.title"),
      description: t("benefits.vision.description"),
      color: "#E8827A",
      glow: "rgba(232, 130, 122, 0.15)",
    },
    {
      icon: Users,
      title: t("benefits.integration.title"),
      description: t("benefits.integration.description"),
      color: "#A8D5E2",
      glow: "rgba(168, 213, 226, 0.15)",
    },
    {
      icon: MessageSquare,
      title: t("benefits.commitment.title"),
      description: t("benefits.commitment.description"),
      color: "#F4B8A4",
      glow: "rgba(244, 184, 164, 0.15)",
    },
    {
      icon: Zap,
      title: t("benefits.agile.title"),
      description: t("benefits.agile.description"),
      color: "#C5A4D9",
      glow: "rgba(197, 164, 217, 0.15)",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0F151C] pl-4 lg:pl-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-white max-w-2xl">
            {t("title.prefix")} <span className="block text-[#E8827A]">{t("title.highlight")}</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-6 transition-all duration-300 hover:border-[#E8827A]/30 hover:shadow-xl hover:shadow-[#E8827A]/5 hover:-translate-y-1"
            >
              {/* Glow de fondo */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle at 0% 0%, ${benefit.glow}, transparent 70%)`,
                }}
              />
              
              {/* Icono */}
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                style={{ 
                  backgroundColor: `${benefit.color}15`,
                  border: `1px solid ${benefit.color}25`,
                }}
              >
                <benefit.icon 
                  className="w-6 h-6 transition-colors"
                  style={{ color: benefit.color }}
                />
              </div>
              
              {/* Título */}
              <h3 
                className="relative font-jakarta font-semibold text-lg text-white mb-3 group-hover:text-[#E8827A] transition-colors duration-300"
              >
                {benefit.title}
              </h3>
              
              {/* Descripción */}
              <p className="relative text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Decoración inferior */}
              <div 
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ backgroundColor: benefit.color }}
              />
              
              {/* Número de orden */}
              <div className="absolute top-3 right-4 text-3xl font-bold opacity-5 text-white select-none">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
        
        {/* Decoración inferior */}
        <div className="mt-16 flex justify-center">
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: i === 0 ? '#E8827A' : '#2A3A4A',
                  opacity: i === 0 ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}