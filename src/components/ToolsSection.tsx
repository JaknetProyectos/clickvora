"use client";

import Image from "next/image";
import { Gamepad2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const techIcons = [
  { name: "Unity", icon: "/assets/unity.png" },
  { name: "React", icon: "/assets/react.svg" },
  { name: "Unreal", icon: "/assets/unreal.png" },
  { name: "iOS", icon: "/assets/ios.webp" },
  { name: "Android", icon: "/assets/android.jpg" },
  { name: "Flutter", icon: "/assets/Flutter.webp" },
];

export default function ToolsSection() {
  const t = useTranslations("tools");
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let animationId: number;
    let startTime: number;
    const duration = 20000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      setRotation(progress * 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Tamaño del círculo
  const circleSize = 450;
  const radius = 180;
  const center = circleSize / 2;
  const iconSize = 60;

  return (
    <section className="py-16 lg:py-24 bg-[#0F151C] pl-4 lg:pl-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 bg-[#E8827A]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-40 w-80 h-80 bg-[#A8D5E2]/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
              <span className="text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                {t("badge")}
              </span>
            </div>
            <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-6 text-white">
              {t("title.prefix")} <span className="text-[#E8827A]">{t("title.highlight")}</span> {t("title.suffix")}
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t("description")}
            </p>

            <div className="flex items-start gap-4 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-5 hover:border-[#E8827A]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8827A]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#E8827A]/20">
                <Gamepad2 className="w-6 h-6 text-[#E8827A]" />
              </div>
              <div>
                <h3 className="font-jakarta font-semibold text-lg text-white mb-2">
                  {t("card.title")}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t("card.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Tech Icons Circle */}
          <div className="relative flex items-center justify-center">
            <div
              className="relative"
              style={{
                width: circleSize,
                height: circleSize,
              }}
            >
              {/* Centro del círculo - Robot fijo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] rounded-full blur-2xl opacity-30 animate-pulse" />
                  <div className="relative w-28 h-28 bg-[#1A232E] border-2 border-[#E8827A]/50 rounded-full flex items-center justify-center shadow-xl shadow-[#E8827A]/20">
                    <Image
                      src="/logo.png"
                      alt={t("logoAlt")}
                      width={60}
                      height={60}
                      className="w-14 h-14"
                    />
                  </div>
                </div>
              </div>


              {/* Iconos giratorios */}
              {isMounted && techIcons.map((tech, index) => {
                const angle = ((index * 360) / techIcons.length) + rotation;
                const radian = (angle * Math.PI) / 180;
                const x = center + Math.cos(radian) * radius - iconSize / 2;
                const y = center + Math.sin(radian) * radius - iconSize / 2;

                const colors = ['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9', '#E8827A', '#A8D5E2'];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={tech.name}
                    className="absolute rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group"
                    style={{
                      width: iconSize,
                      height: iconSize,
                      left: x,
                      top: y,
                      backgroundColor: '#1A232E',
                      border: `2px solid ${color}40`,
                      boxShadow: `0 0 30px ${color}15`,
                    }}
                  >
                    <div className="relative w-full h-full rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at center, ${color}30, transparent 70%)`,
                        }}
                      />
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="w-14 h-14 rounded-full object-contain relative z-10 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="absolute -bottom-6 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}