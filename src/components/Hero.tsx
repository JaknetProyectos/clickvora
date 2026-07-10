"use client";

import Image from "next/image";
import { Check, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  const features = [
    { text: t("features.technology"), color: "#E8827A" },
    { text: t("features.design"), color: "#A8D5E2" },
    { text: t("features.gameplay"), color: "#F4B8A4" }
  ];

  return (
    <section className="relative min-h-screen pl-20 pt-20 lg:pt-0 flex items-center bg-[#0F151C] overflow-hidden">
      {/* Patrón de fondo animado */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decoración de fondo con círculos coloridos */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#E8827A]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#A8D5E2]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A4D9]/5 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Columna Izquierda - Contenido */}
          <div className="text-center lg:text-left">
            {/* Tagline animado */}
            <div className="inline-flex items-center gap-2 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                {t("tagline")}
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-6 animate-fade-in-up delay-100">
              {t("title.prefix")}
              <span className="block mt-2 bg-gradient-to-r from-[#E8827A] via-[#F4B8A4] to-[#C5A4D9] bg-clip-text text-transparent">
                {t("title.highlight")}
              </span>
              <span className="block text-gray-300">
                {t("title.suffix")}
              </span>
            </h1>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 animate-fade-in-up delay-200">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-full px-4 py-1.5 hover:border-[#E8827A]/30 transition-colors group"
                >
                  <Check className="w-4 h-4 text-[#E8827A]" />
                  <span className="text-gray-200 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="animate-fade-in-up delay-300">
              <Button
                asChild
                className="bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 text-white rounded-full px-8 py-6 text-base font-medium group shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 transition-all duration-300 hover:scale-105"
              >
                <a href="#planes">
                  {t("cta")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                </a>
              </Button>
            </div>
          </div>

          {/* Columna Derecha - Illustraciones */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {/* Ilustración 1 - Persona con teléfono */}
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-[#E8827A]/10 rounded-2xl blur-2xl group-hover:bg-[#E8827A]/20 transition-all duration-500" />
                <div className="relative bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-4 hover:border-[#E8827A]/30 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/assets/android.jpg"
                    alt={t("images.mobileApp")}
                    width={300}
                    height={350}
                    className="w-full h-auto rounded-2xl object-contain"
                  />
                </div>
              </div>

              {/* Ilustración 2 - Gaming Icon */}
              <div className="flex flex-col gap-4">
                <div className="relative group animate-float-delay">
                  <div className="absolute inset-0 bg-[#C5A4D9]/10 rounded-2xl blur-2xl group-hover:bg-[#C5A4D9]/20 transition-all duration-500" />
                  <div className="relative bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-6 flex items-center justify-center hover:border-[#C5A4D9]/30 transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] rounded-full blur-xl opacity-20 animate-pulse" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-[#E8827A] to-[#C5A4D9] rounded-full flex items-center justify-center">
                        <Image
                          src="/assets/unity.png"
                          alt={t("images.gaming")}
                          width={48}
                          height={48}
                          className="w-20 rounded-full h-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ilustración 3 - App Interface */}
                <div className="relative group animate-float-delay-2">
                  <div className="absolute inset-0 bg-[#A8D5E2]/10 rounded-2xl blur-2xl group-hover:bg-[#A8D5E2]/20 transition-all duration-500" />
                  <div className="relative bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-4 hover:border-[#A8D5E2]/30 transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <Image
                        src="/assets/figma.webp"
                        alt={t("images.appInterface")}
                        width={300}
                        height={350}
                        className="w-full h-auto object-contain"
                      />
                      {/* Chat bubble animado */}
                      <div className="absolute -right-2 top-4 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl px-3 py-2 shadow-xl animate-bounce">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-[#E8827A] rounded-full animate-pulse" />
                          <span className="w-1.5 h-1.5 bg-[#A8D5E2] rounded-full animate-pulse delay-200" />
                          <span className="w-1.5 h-1.5 bg-[#F4B8A4] rounded-full animate-pulse delay-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1s;
        }
        .animate-float-delay-2 {
          animation: float 3s ease-in-out infinite 2s;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
}