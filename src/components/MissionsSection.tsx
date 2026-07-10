"use client";

import { ArrowRight, Gamepad2, Puzzle, Settings, Palette, Smartphone, Link, Sparkles, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function MissionsSection() {
  const t = useTranslations("missions");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const missions = [
    {
      id: "mission-1",
      badge: t("missionsList.mission1.badge"),
      icon: Gamepad2,
      title: t("missionsList.mission1.title"),
      description: t("missionsList.mission1.description"),
      color: "#E8827A",
      features: [
        {
          title: t("missionsList.mission1.features.feature1.title"),
          description: t("missionsList.mission1.features.feature1.description")
        },
        {
          title: t("missionsList.mission1.features.feature2.title"),
          description: t("missionsList.mission1.features.feature2.description")
        }
      ]
    },
    {
      id: "mission-2",
      badge: t("missionsList.mission2.badge"),
      icon: Puzzle,
      title: t("missionsList.mission2.title"),
      description: t("missionsList.mission2.description"),
      color: "#A8D5E2",
      features: [
        {
          title: t("missionsList.mission2.features.feature1.title"),
          description: t("missionsList.mission2.features.feature1.description")
        },
        {
          title: t("missionsList.mission2.features.feature2.title"),
          description: t("missionsList.mission2.features.feature2.description")
        }
      ]
    },
    {
      id: "mission-3",
      badge: t("missionsList.mission3.badge"),
      icon: Settings,
      title: t("missionsList.mission3.title"),
      description: t("missionsList.mission3.description"),
      color: "#F4B8A4",
      features: [
        {
          title: t("missionsList.mission3.features.feature1.title"),
          description: t("missionsList.mission3.features.feature1.description")
        },
        {
          title: t("missionsList.mission3.features.feature2.title"),
          description: t("missionsList.mission3.features.feature2.description")
        }
      ]
    },
    {
      id: "mission-4",
      badge: t("missionsList.mission4.badge"),
      icon: Palette,
      title: t("missionsList.mission4.title"),
      description: t("missionsList.mission4.description"),
      color: "#C5A4D9",
      features: [
        {
          title: t("missionsList.mission4.features.feature1.title"),
          description: t("missionsList.mission4.features.feature1.description")
        },
        {
          title: t("missionsList.mission4.features.feature2.title"),
          description: t("missionsList.mission4.features.feature2.description")
        }
      ]
    },
    {
      id: "mission-5",
      badge: t("missionsList.mission5.badge"),
      icon: Smartphone,
      title: t("missionsList.mission5.title"),
      description: t("missionsList.mission5.description"),
      color: "#E8827A",
      features: [
        {
          title: t("missionsList.mission5.features.feature1.title"),
          description: t("missionsList.mission5.features.feature1.description")
        },
        {
          title: t("missionsList.mission5.features.feature2.title"),
          description: t("missionsList.mission5.features.feature2.description")
        }
      ]
    },
    {
      id: "mission-6",
      badge: t("missionsList.mission6.badge"),
      icon: Link,
      title: t("missionsList.mission6.title"),
      description: t("missionsList.mission6.description"),
      color: "#A8D5E2",
      features: [
        {
          title: t("missionsList.mission6.features.feature1.title"),
          description: t("missionsList.mission6.features.feature1.description")
        },
        {
          title: t("missionsList.mission6.features.feature2.title"),
          description: t("missionsList.mission6.features.feature2.description")
        }
      ]
    }
  ];

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-[#0F151C] pl-4 lg:pl-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-[#E8827A]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#A8D5E2]/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-white max-w-3xl mx-auto leading-tight">
            {t("title.prefix")} <span className="text-[#E8827A]">{t("title.highlight")}</span> {t("title.suffix")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Missions Grid - Estilo cartas de poker */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {missions.map((mission, index) => {
            const isHovered = hoveredCard === mission.id;
            const Icon = mission.icon;
            
            return (
              <div
                key={mission.id}
                className="relative perspective-1000"
                onMouseEnter={() => setHoveredCard(mission.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Sombra de la carta */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${mission.color}20, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1.05)' : 'scale(0.9)',
                    filter: 'blur(20px)',
                  }}
                />
                
                <Card className={`relative bg-[#1A232E] border-[#2A3A4A]/50 rounded-2xl overflow-hidden transition-all duration-500 ${
                  isHovered ? 'transform -translate-y-2 rotate-1 scale-[1.02]' : 'transform translate-y-0 rotate-0'
                }`}>
                  <CardContent className="p-0">
                    {/* Borde decorativo superior */}
                    <div 
                      className="h-1 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${mission.color}, ${mission.color}80)`,
                        opacity: isHovered ? 1 : 0.3,
                      }}
                    />
                    
                    {/* Icon Header - Como diseño de carta de poker */}
                    <div className="p-6 lg:p-8 flex items-start gap-4">
                      <div 
                        className="relative w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                        style={{
                          backgroundColor: `${mission.color}15`,
                          border: `2px solid ${mission.color}30`,
                          transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0)',
                          boxShadow: isHovered ? `0 0 40px ${mission.color}20` : 'none',
                        }}
                      >
                        <Icon 
                          className="w-8 h-8 transition-all duration-500"
                          style={{ color: mission.color }}
                        />
                        {/* Efecto de brillo */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${mission.color}40, transparent 70%)`,
                            opacity: isHovered ? 1 : 0,
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: mission.color }}
                          >
                            {mission.badge}
                          </span>
                          {isHovered && (
                            <Star className="w-3 h-3 text-[#F4B8A4] animate-pulse" />
                          )}
                        </div>
                        <h3 className="font-jakarta font-bold text-lg lg:text-xl text-white leading-tight">
                          {mission.title}
                        </h3>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="px-6 lg:px-8 pb-6">
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {mission.description}
                      </p>

                      {/* Features Accordion - Estilo poker */}
                      <Accordion type="single" collapsible className="w-full">
                        {mission.features.map((feature, featureIndex) => (
                          <AccordionItem 
                            key={featureIndex} 
                            value={`item-${featureIndex}`} 
                            className={`border-l-2 pl-4 mb-2 border-b-0 transition-all duration-300 ${
                              isHovered ? 'border-opacity-100' : 'border-opacity-50'
                            }`}
                            style={{ borderColor: mission.color }}
                          >
                            <AccordionTrigger className="text-left font-jakarta font-semibold text-sm text-gray-200 hover:no-underline py-2 hover:text-[#E8827A] transition-colors">
                              {feature.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400 text-sm pb-2 leading-relaxed">
                              {feature.description}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
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
    </section>
  );
}