"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import {
  ArrowRight,
  AlertCircle,
  Loader2,
  DollarSign,
  Sparkles,
  Zap,
  Star,
  Shield,
  Check,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CustomProcutForm() {
  const t = useTranslations("customPlan");
  const router = useRouter();
  const { addItem } = useCart();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalPrice = Number(totalPrice) || 0;

    if (!quoteNumber.trim()) {
      setError(t("errors.quoteRequired"));
      return;
    }

    if (finalPrice <= 0) {
      setError(t("errors.invalidAmount"));
      return;
    }

    setIsAdding(true);

    const folioUpper = quoteNumber.trim().toUpperCase();

    addItem(
      {
        image: "/logo.png",
        features: [],
        id: `custom-quote-${quoteNumber.trim().toLowerCase()}`,
        name: `Custom - ${folioUpper}`,
        price: finalPrice,
        description: `Custom - ${folioUpper}`
      },
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (

    <main className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-[#2A3A4A]/50 bg-[#1A232E] backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-[#E8827A]/5"
      >
        {/* Borde decorativo superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8827A] via-[#C5A4D9] to-[#A8D5E2]" />

        {/* Glow interior */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,130,122,0.08),transparent_50%)]" />

        <div className="relative z-10 w-full">
          {/* Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-[#0F151C] border border-[#2A3A4A]/50 rounded-full px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B8A4]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4B8A4]">
                {t("form.badge")}
              </span>
            </div>
          </div>

          {/* Título */}
          <h1 className="font-jakarta font-bold text-3xl text-white md:text-4xl">
            {t("form.title")}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            {t("authorized.description")}
          </p>



          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-md"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Input Folio/Cotización */}
            <div className="space-y-2">
              <label
                htmlFor="quoteNumber"
                className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pl-1"
              >
                {t("form.quoteLabel")}
              </label>

              <div className="relative">
                <input
                  id="quoteNumber"
                  type="text"
                  required
                  placeholder={t("form.quotePlaceholder")}
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-[#2A3A4A]/50 bg-[#0F151C]/90 px-5 text-sm font-mono uppercase tracking-widest text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#E8827A]/50 focus:ring-4 focus:ring-[#E8827A]/10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Folio
                  </span>
                </div>
              </div>
            </div>

            {/* Input Monto total */}
            <div className="space-y-2">
              <label
                htmlFor="totalPrice"
                className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pl-1"
              >
                {t("form.amountLabel")}
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                  <DollarSign className="h-4 w-4 text-[#E8827A]" />
                </div>

                <input
                  id="totalPrice"
                  type="number"
                  required
                  step="0.01"
                  min="0.01"
                  placeholder={t("form.amountPlaceholder")}
                  value={totalPrice}
                  onChange={(e) =>
                    setTotalPrice(
                      e.target.value !== "" ? Number(e.target.value) : ""
                    )
                  }
                  className="h-14 w-full rounded-2xl border border-[#2A3A4A]/50 bg-[#0F151C]/90 pl-11 pr-16 text-sm font-semibold text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#E8827A]/50 focus:ring-4 focus:ring-[#E8827A]/10"
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                  <span className="text-xs font-bold tracking-wider text-gray-500">
                    MXN
                  </span>
                </div>
              </div>

              <p className="pl-1 text-[11px] text-gray-500">
                {t("form.taxNote")}
              </p>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <motion.button
                whileTap={!isAdding ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isAdding}
                className={[
                  "relative group flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all duration-300 uppercase tracking-wider overflow-hidden",
                  isAdding
                    ? "cursor-not-allowed bg-[#2A3A4A] text-gray-500 border border-[#2A3A4A]/50"
                    : "bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] text-white hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 hover:-translate-y-0.5",
                ].join(" ")}
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t("buttons.adding")}</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">{t("buttons.addToCart")}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Decoración inferior */}
          <div className="mt-8 flex justify-center gap-2">
            {['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'].map((color, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}