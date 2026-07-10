"use client";

import { Link } from "@/i18n/routing";
import { useParams, useRouter } from "next/navigation";
import {
    ShoppingCart,
    ArrowLeft,
    Check,
    Sparkles,
    ShieldCheck,
    Zap,
    Star,
    Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlan } from "@/hooks/usePlans";
import { usePlans } from "@/hooks/usePlan";
import { useCart } from "@/context/CartContext";
import CustomProcutForm from "@/components/CustomProcutForm";
import { useTranslations } from "next-intl";

// Lista de slugs que se mostrarán como relacionados cuando el plan es "plan-personalizado"
const CUSTOM_PLAN_RELATED = [
    "arte-ui-ux",
    "app-ui-personalizado",
    "gam-interactivo-basico",
    "opt-actualizaciones-multi"
];

export default function PlanDetailPage() {
    const t = useTranslations("planDetail");
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();

    const planId = params?.id as string;
    const { plan, product, relatedPlans } = usePlan(planId);
    const { plans } = usePlans();

    // Verificar si este plan debe mostrar el formulario personalizado
    const isCustomPlan = planId === "plan-personalizado";

    // Obtener los planes relacionados personalizados
    const customRelatedPlans = plans.filter((p) => CUSTOM_PLAN_RELATED.includes(p.id));

    // Determinar qué planes mostrar en la sección de relacionados
    const displayRelatedPlans = isCustomPlan ? customRelatedPlans : relatedPlans;

    const handleAddToCart = (targetPlan: typeof plan, categoryName: string) => {
        if (!targetPlan) return;

        addItem({
            id: targetPlan.id,
            name: `${categoryName} - ${targetPlan.name}`,
            price: targetPlan.price,
            features: targetPlan.features,
            image: "/logo.png",
            description: targetPlan.description || ""
        });
    };

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat("es-MX").format(value);
    };

    // Si es un plan personalizado, mostrar el formulario
    if (isCustomPlan) {
        return (
            <div className="min-h-screen bg-[#0F151C] text-slate-100 pb-24 pl-4 lg:pl-20 relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                {/* Círculos decorativos */}
                <div className="pointer-events-none absolute top-20 right-20 h-[500px] w-[500px] rounded-full bg-[#E8827A]/5 blur-[130px]" />
                <div className="pointer-events-none absolute bottom-20 left-20 h-[400px] w-[400px] rounded-full bg-[#C5A4D9]/5 blur-[100px]" />

                {/* Navbar Superior de Retorno */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-[#1A232E] rounded-full pl-2 transition-all duration-300 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("back")}
                    </Button>
                </div>

                {/* Contenedor del formulario personalizado */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <CustomProcutForm />
                </div>

                {/* SECCIÓN INFERIOR: PLANES RELACIONADOS PERSONALIZADOS */}
                {displayRelatedPlans.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                        <div className="border-t border-[#2A3A4A]/30 pt-12 mb-10">
                            <span className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Rocket className="w-3.5 h-3.5 text-[#E8827A]" />
                                {t("related.alternatives")}
                            </span>
                            <h2 className="text-2xl font-bold font-jakarta text-white">
                                {t("related.title")} <span className="text-[#E8827A]">{t("related.highlight")}</span>
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayRelatedPlans.map((relPlan) => (
                                <Link
                                    key={relPlan.id}
                                    href={`/planes/${relPlan.id}`}
                                    className="block transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-6 h-full shadow-md hover:shadow-xl hover:shadow-[#E8827A]/5 hover:border-[#E8827A]/30 transition-all duration-300">
                                        <div className="flex justify-between items-start gap-2 mb-4">
                                            <h4 className="font-bold text-lg text-white font-jakarta">{relPlan.name}</h4>
                                            <div className="text-right shrink-0">
                                                <span className="text-xs font-bold text-white block">MXN {formatPrice(relPlan.price)}</span>
                                                <span className="text-[10px] text-gray-500 font-mono">{t("tax")}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-xs leading-relaxed mb-6">
                                            {relPlan.description}
                                        </p>

                                        <div className="flex gap-2 pt-4 border-t border-[#2A3A4A]/30">
                                            <span className="flex-1 bg-transparent border border-[#2A3A4A]/50 text-gray-300 hover:text-white hover:bg-[#2A3A4A] rounded-xl py-4 text-xs font-medium transition-all duration-300 text-center cursor-pointer">
                                                {t("related.viewDetail")}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Decoración inferior */}
                <div className="mt-16 flex justify-center gap-2">
                    {['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'].map((color, i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Si no existe el plan
    if (!plan || !product) {
        return (
            <div className="min-h-screen bg-[#0F151C] text-slate-100 flex flex-col items-center justify-center p-4 pl-4 lg:pl-20">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E8827A]/10 border border-[#E8827A]/20 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-[#E8827A]/50" />
                    </div>
                    <p className="text-gray-400 mb-4 font-mono text-sm">{t("notFound.message")}</p>
                    <Button
                        onClick={() => router.back()}
                        className="bg-[#1A232E] hover:bg-[#2A3A4A] text-white rounded-full border border-[#2A3A4A]/50 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t("notFound.back")}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F151C] text-slate-100 pb-24 pl-4 lg:pl-20 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Círculos decorativos */}
            <div className="pointer-events-none absolute top-20 right-20 h-[500px] w-[500px] rounded-full bg-[#E8827A]/5 blur-[130px]" />
            <div className="pointer-events-none absolute bottom-20 left-20 h-[400px] w-[400px] rounded-full bg-[#C5A4D9]/5 blur-[100px]" />

            {/* Navbar Superior de Retorno */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-[#1A232E] rounded-full pl-2 transition-all duration-300 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("back")}
                </Button>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Columna Izquierda: Información Principal */}
                    <div className="lg:col-span-7 bg-[#1A232E] border border-[#2A3A4A]/50 p-8 sm:p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
                        {/* Glow decorativo */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E8827A]/5 rounded-full blur-3xl pointer-events-none" />

                        <span className="text-[#E8827A] font-mono text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            {product.name}
                        </span>

                        <h1 className="font-jakarta font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-none">
                            {plan.name}
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                            {plan.description}
                        </p>

                        <div className="border-t border-[#2A3A4A]/30 pt-6">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#E8827A]" />
                                {t("features")}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {plan.features.map((feature, idx) => (
                                    <Badge
                                        key={idx}
                                        className="bg-[#0F151C] border border-[#2A3A4A]/50 text-gray-200 text-xs px-4 py-2 rounded-xl hover:border-[#E8827A]/30 transition-all duration-300 cursor-default"
                                    >
                                        <Check className="w-3.5 h-3.5 text-[#E8827A] mr-2 inline" />
                                        {feature}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Bloque de Compra */}
                    <div className="lg:col-span-5 sticky top-6">
                        <div className="relative bg-[#1A232E] border-2 border-[#E8827A]/30 p-8 rounded-[2rem] shadow-2xl overflow-hidden">
                            {/* Glow del borde */}
                            <div className="absolute inset-0 rounded-[2rem] opacity-30 pointer-events-none" style={{
                                background: `radial-gradient(circle at 50% 0%, #E8827A15, transparent 70%)`,
                            }} />

                            {/* Borde animado */}
                            <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-[#E8827A] via-[#C5A4D9] to-[#A8D5E2] opacity-20 blur-sm animate-pulse pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-baseline mb-6">
                                    <div>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider block font-mono">{t("pricing.investment")}</span>
                                        <span className="font-jakarta font-black text-3xl sm:text-4xl text-white">
                                            MXN {formatPrice(plan.price)}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-[#E8827A] bg-[#E8827A]/10 px-3 py-1 rounded-full border border-[#E8827A]/20">
                                        {t("tax")}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400 mb-6 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-[#E8827A] shrink-0" />
                                    {t("pricing.guarantee")}
                                </p>

                                <button
                                    onClick={() => handleAddToCart(plan, product.name)}
                                    className="relative w-full bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 text-white rounded-full py-6 text-base font-bold transition-all duration-300 shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 overflow-hidden group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {t("pricing.hire")}
                                        <ShoppingCart className="ml-2 w-5 h-5 group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                                </button>

                                {/* Mini badges */}
                                <div className="mt-4 flex justify-center gap-3">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                        <Zap className="w-3 h-3 text-[#F4B8A4]" />
                                        {t("pricing.fastDelivery")}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                        <Star className="w-3 h-3 text-[#C5A4D9]" />
                                        {t("pricing.quality")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN INFERIOR: PLANES RELACIONADOS */}
            {displayRelatedPlans.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                    <div className="border-t border-[#2A3A4A]/30 pt-12 mb-10">
                        <span className="text-gray-500 font-mono text-xs uppercase tracking-wider  mb-2 flex items-center gap-2">
                            <Rocket className="w-3.5 h-3.5 text-[#E8827A]" />
                            {t("related.alternatives")}
                        </span>
                        <h2 className="text-2xl font-bold font-jakarta text-white">
                            {t("related.title2")} <span className="text-[#E8827A]">{product.name}</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayRelatedPlans.map((relPlan) => (
                            <Link
                                key={relPlan.id}
                                href={`/planes/${relPlan.id}`}
                                className="block transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-6 h-full shadow-md hover:shadow-xl hover:shadow-[#E8827A]/5 hover:border-[#E8827A]/30 transition-all duration-300">
                                    <div className="flex justify-between items-start gap-2 mb-4">
                                        <h4 className="font-bold text-lg text-white font-jakarta">{relPlan.name}</h4>
                                        <div className="text-right shrink-0">
                                            <span className="text-xs font-bold text-white block">MXN {formatPrice(relPlan.price)}</span>
                                            <span className="text-[10px] text-gray-500 font-mono"> {t("tax")}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-xs leading-relaxed mb-6">
                                        {relPlan.description}
                                    </p>

                                    <div className="flex gap-2 pt-4 border-t border-[#2A3A4A]/30">
                                        <span className="flex-1 bg-transparent border border-[#2A3A4A]/50 text-gray-300 hover:text-white hover:bg-[#2A3A4A] rounded-xl py-4 text-xs font-medium transition-all duration-300 text-center cursor-pointer">
                                            {t("related.viewDetail")}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleAddToCart(relPlan, product.name);
                                            }}
                                            className="bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 text-white rounded-xl px-4 py-4 transition-all duration-300 shadow-lg shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95"
                                            title={t("related.addToCart")}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Decoración inferior */}
            <div className="mt-16 flex justify-center gap-2">
                {['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'].map((color, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    );
}