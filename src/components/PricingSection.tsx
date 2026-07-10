"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { usePlans } from "@/hooks/usePlan";
import { Check, Loader2, ShoppingCart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PricingSection() {
  const t = useTranslations("pricing");
  const { addItem } = useCart();
  const { productsList } = usePlans({ category: "plans" });

  const [selectedPlans, setSelectedPlans] = useState<Record<string, typeof productsList[0]["plans"][0]>>(() => {
    const initials: Record<string, typeof productsList[0]["plans"][0]> = {};
    productsList.forEach((category) => {
      initials[category.id] = category.plans[0];
    });
    return initials;
  });

  // Estado para feedback de agregado al carrito
  const [addingStatus, setAddingStatus] = useState<Record<string, { loading: boolean; success: boolean }>>({});

  const handleSelectPlan = (categoryId: string, plan: typeof productsList[0]["plans"][0]) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [categoryId]: plan,
    }));
  };

  const handleAddToCart = (categoryTitle: string, categoryId: string) => {
    const currentPlan = selectedPlans[categoryId];
    if (!currentPlan) return;

    // Iniciar estado de carga
    setAddingStatus((prev) => ({
      ...prev,
      [categoryId]: { loading: true, success: false },
    }));

    // Simular un pequeño delay para feedback visual
    setTimeout(() => {
      addItem({
        id: currentPlan.id,
        name: `${categoryTitle} - ${currentPlan.name}`,
        price: currentPlan.price,
        features: currentPlan.features,
        description: currentPlan.description,
        image: "/logo.png"
      });

      // Marcar como éxito
      setAddingStatus((prev) => ({
        ...prev,
        [categoryId]: { loading: false, success: true },
      }));

      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        setAddingStatus((prev) => ({
          ...prev,
          [categoryId]: { loading: false, success: false },
        }));
      }, 2000);
    }, 500);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("es-MX").format(value);
  };

  // Obtener badges traducidos
  const getBadgeText = (index: number) => {
    const badges = [
      t("badges.popular"),
      t("badges.premium"),
      t("badges.special")
    ];
    const icons = ['🚀', '💎', '🎯'];
    return `${icons[index % icons.length]} ${badges[index % badges.length]}`;
  };

  return (
    <section id="planes" className="py-16 lg:py-24 bg-[#0F151C] pl-4 lg:pl-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-[#E8827A]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#C5A4D9]/5 rounded-full blur-3xl animate-pulse delay-1000" />

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
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {productsList.map((category, catIndex) => {
            const currentSelectedPlan = selectedPlans[category.id];
            const colors = ['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'];
            const color = colors[catIndex % colors.length];
            const status = addingStatus[category.id] || { loading: false, success: false };
            const badgeText = getBadgeText(catIndex);

            return (
              <Card key={category.id} className="relative bg-[#1A232E] border-[#2A3A4A]/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#E8827A]/5 transition-all duration-300 hover:-translate-y-1">
                {/* Borde decorativo superior */}
                <div
                  className="h-1 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}80)`,
                  }}
                />

                {/* Badge decorativo */}
                <div className="absolute top-4 right-4">
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1A232E] border"
                    style={{
                      borderColor: `${color}30`,
                      color: color,
                    }}
                  >
                    {badgeText}
                  </div>
                </div>

                <CardContent className="p-6 lg:p-8 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-jakarta font-bold text-xl lg:text-2xl text-center mb-8 text-white">
                      {category.name}
                    </h3>

                    {/* Selector de variantes - Estilo videojuego */}
                    <div className="space-y-3">
                      {category.plans.map((plan, planIndex) => {
                        const isSelected = currentSelectedPlan?.id === plan.id;
                        const isFirst = planIndex === 0;

                        return (
                          <div
                            key={plan.id}
                            onClick={() => handleSelectPlan(category.id, plan)}
                            className={`relative group flex items-start justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${isSelected
                              ? `border-[${color}] bg-[${color}]/10 shadow-lg shadow-[${color}]/10`
                              : 'border-[#2A3A4A] bg-[#1A232E]/50 hover:border-[#3A4A5A] hover:bg-[#1A232E]'
                              }`}
                            style={{
                              borderColor: isSelected ? color : '#2A3A4A',
                              backgroundColor: isSelected ? `${color}10` : '',
                            }}
                          >
                            {/* Indicador de selección - Estilo game */}
                            <div className="flex gap-3 flex-1">
                              <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isSelected
                                ? 'border-[#E8827A] bg-[#E8827A] text-white shadow-lg shadow-[#E8827A]/30'
                                : 'border-[#3A4A5A] bg-transparent group-hover:border-[#5A6A7A]'
                                }`}>
                                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>

                              <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-1.5">
                                  {plan.features.slice(0, 3).map((feature, featureIndex) => (
                                    <Badge
                                      key={featureIndex}
                                      className="text-[10px] px-2.5 py-0.5 rounded-full transition-colors"
                                      style={{
                                        backgroundColor: isSelected ? `${color}20` : '#2A3A4A',
                                        color: isSelected ? color : '#8A9AAA',
                                        border: `1px solid ${isSelected ? color : '#3A4A5A'}`,
                                      }}
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                  {plan.features.length > 3 && (
                                    <Badge
                                      className="text-[10px] px-2.5 py-0.5 rounded-full"
                                      style={{
                                        backgroundColor: '#2A3A4A',
                                        color: '#8A9AAA',
                                        border: '1px solid #3A4A5A',
                                      }}
                                    >
                                      +{plan.features.length - 3}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0 pl-2">
                              <div className="font-jakarta font-bold text-lg lg:text-xl text-white">
                                {t("currency")} {formatPrice(plan.price)}
                              </div>
                              <span className="text-xs text-gray-500">+ {t("tax")}</span>
                            </div>

                            {/* Efecto de brillo en hover */}
                            {isSelected && (
                              <div
                                className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
                                style={{
                                  background: `radial-gradient(circle at 70% 30%, ${color}, transparent 70%)`,
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Botón de acción - Estilo game con feedback */}
                  <Button
                    onClick={() => handleAddToCart(category.name, category.id)}
                    disabled={status.loading}
                    className={`relative w-full mt-8 text-white rounded-full py-6 text-base font-medium group transition-all duration-300 overflow-hidden ${status.success
                      ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30'
                      : status.loading
                        ? 'bg-[#2A3A4A] hover:bg-[#2A3A4A] cursor-wait'
                        : 'bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 hover:scale-105'
                      }`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {status.loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("buttons.hiring")}
                        </>
                      ) : status.success ? (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          {t("buttons.hired")}
                        </>
                      ) : (
                        <>
                          {t("buttons.hire")} {currentSelectedPlan?.name}
                          <ShoppingCart className="ml-2 w-5 h-5 group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300" />
                        </>
                      )}
                    </span>
                    {!status.loading && !status.success && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Decoración inferior */}
        <div className="mt-16 flex justify-center gap-2">
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
    </section>
  );
}