"use client";

import Image from "next/image";
import { ShoppingCart, Edit3, Check, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CustomPlanSection() {
  const t = useTranslations("customPlanSection");
  const [hovered, setHovered] = useState(false);
  const [borderColor, setBorderColor] = useState('#E8827A');

  const features = [
    t("features.flexibility"),
    t("features.scalability"),
    t("features.deliveries"),
    t("features.integration"),
  ];

  useEffect(() => {
    const colors = ['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9', '#E8827A'];
    let index = 0;
    const interval = setInterval(() => {
      if (!hovered) {
        index = (index + 1) % colors.length;
        setBorderColor(colors[index]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <section className="py-16 lg:py-24 bg-[#0F151C] pl-4 lg:pl-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-[#E8827A]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#C5A4D9]/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          className="relative bg-[#1A232E] rounded-3xl p-8 lg:p-12 shadow-2xl transition-all duration-700"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            border: `2px solid ${borderColor}`,
            boxShadow: hovered 
              ? `0 0 60px ${borderColor}30, 0 0 120px ${borderColor}15, inset 0 0 60px ${borderColor}10`
              : `0 0 40px ${borderColor}15, 0 0 80px ${borderColor}08`,
            transition: 'all 0.5s ease-in-out',
          }}
        >
          {/* Efecto de brillo interior */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${borderColor}15, transparent 70%)`,
              opacity: hovered ? 0.5 : 0.2,
            }}
          />

          {/* Decoración superior */}
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full transition-all duration-700" style={{ background: borderColor }} />

          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#0F151C] border border-[#2A3A4A]/50 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                {t("badge")}
              </span>
            </div>

            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl text-white mb-4">
              {t("title.prefix")} <span className="text-[#E8827A]">{t("title.highlight")}</span>
            </h2>
            <p className="text-gray-400 mb-6 transition-colors duration-700" style={{ color: hovered ? borderColor : '#9AA5B5' }}>
              {t("subtitle")}
            </p>

            {/* Features List - Estilo videojuego */}
            <div className="max-w-md mx-auto mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 mb-3 group transition-all duration-300 hover:translate-x-1"
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: `${borderColor}20`,
                      border: `1px solid ${borderColor}40`,
                    }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: borderColor }} />
                  </div>
                  <span className="text-gray-300 text-sm text-left group-hover:text-white transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href={"/planes/plan-personalizado"}>
                <Button 
                  className="relative text-white rounded-full px-8 py-6 group overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${borderColor}, ${borderColor}80)`,
                    boxShadow: `0 8px 30px ${borderColor}30`,
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    {t("cta.pay")}
                    <ShoppingCart className="ml-2 w-5 h-5 group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </Link>

              <Link href={"#contacto"}>
                <Button 
                  variant="outline" 
                  className="rounded-full px-8 py-6 group transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: `${borderColor}40`,
                    color: borderColor,
                    backgroundColor: `${borderColor}05`,
                  }}
                >
                  <span className="flex items-center">
                    {t("cta.request")}
                    <Edit3 className="ml-2 w-5 h-5 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Tech Logos con glow */}
            <div className="relative">
              <div className="flex items-center justify-center gap-8 lg:gap-16">
                {/* Kotlin */}
                <div 
                  className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
                  style={{
                    backgroundColor: '#1A232E',
                    border: `2px solid ${borderColor}30`,
                    boxShadow: `0 0 30px ${borderColor}10`,
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${borderColor}20, transparent 70%)`,
                    }}
                  />
                  <Image
                    src="/assets/kotlin.jpeg"
                    alt={t("tech.kotlin")}
                    width={40}
                    height={40}
                    className="w-14 h-14 rounded-full relative z-10"
                  />
                </div>

                {/* Flutter - Destacado */}
                <div 
                  className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
                  style={{
                    backgroundColor: '#1A232E',
                    border: `3px solid ${borderColor}`,
                    boxShadow: `0 0 40px ${borderColor}20, 0 0 80px ${borderColor}10`,
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${borderColor}30, transparent 70%)`,
                    }}
                  />
                  <Image
                    src="/assets/Flutter.webp"
                    alt={t("tech.flutter")}
                    width={50}
                    height={50}
                    className="w-18 h-18 rounded-full relative z-10"
                  />
                  {/* Círculo decorativo */}
                  <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke={borderColor}
                      strokeWidth="1.5" 
                      strokeDasharray="5,5"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                {/* React */}
                <div 
                  className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
                  style={{
                    backgroundColor: '#1A232E',
                    border: `2px solid ${borderColor}30`,
                    boxShadow: `0 0 30px ${borderColor}10`,
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${borderColor}20, transparent 70%)`,
                    }}
                  />
                  <Image
                    src="/assets/react.svg"
                    alt={t("tech.react")}
                    width={40}
                    height={40}
                    className="w-14 h-14 rounded-xl relative z-10"
                  />
                </div>
              </div>

              {/* Indicador de color animado */}
              <div className="flex justify-center gap-1.5 mt-6">
                {['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'].map((color, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: color,
                      opacity: borderColor === color ? 1 : 0.2,
                      transform: borderColor === color ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}