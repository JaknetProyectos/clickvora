"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles, Gamepad2, Layers, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const missions = [
    { name: t("missions.interactiveUniverse"), href: "#servicios" },
    { name: t("missions.pixelCraft"), href: "#servicios" },
    { name: t("missions.powerPlay"), href: "#servicios" },
    { name: t("missions.appVerse"), href: "#servicios" },
    { name: t("missions.engineDynamics"), href: "#servicios" },
    { name: t("missions.dataLink"), href: "#servicios" },
  ];

  const plans = [
    { name: t("plans.mobile2d3d"), href: "/planes/movil-2d-sencillo" },
    { name: t("plans.mobileApps"), href: "/planes/app-hibrida-starter" },
    { name: t("plans.gamification"), href: "/planes/gam-interactivo-basico" },
    { name: t("plans.optimization"), href: "/planes/opt-ajuste-rapido" },
    { name: t("plans.mechanics"), href: "/planes/mecanica-balanceo" },
    { name: t("plans.integrations"), href: "/planes/int-pago-simple" },
    { name: t("plans.artDesign"), href: "/planes/arte-ilustraciones-2d" },
  ];

  return (
    <footer className="bg-[#0F151C] border-t border-[#2A3A4A]/50 pl-4 lg:pl-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Círculo decorativo */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8827A]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Missions Column */}
          <div>
            <h4 className="font-jakarta font-bold text-sm text-[#E8827A] mb-4 uppercase tracking-wider flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              {t("missionsTitle")}
            </h4>
            <ul className="space-y-2.5">
              {missions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#E8827A] transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans Column */}
          <div className="lg:col-span-2">
            <h4 className="font-jakarta font-bold text-sm text-[#A8D5E2] mb-4 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {t("plansTitle")}
            </h4>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {plans.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#A8D5E2] transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo Column */}
          <div className="flex flex-col items-start lg:items-end">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#E8827A] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <Image
                  src="/logo.png"
                  alt={t("logoAlt")}
                  width={50}
                  height={50}
                  className="w-14 h-14 relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <Image
                src="/title.png"
                alt={t("titleAlt")}
                width={50}
                height={50}
                className="h-14 w-40 z-10 group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-[#2A3A4A] to-transparent mb-8">
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-[#E8827A]" />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-8">
          <Button
            className="relative bg-[#1A232E] hover:bg-[#2A3A4A] text-white border border-[#2A3A4A]/50 rounded-full px-8 py-6 group transition-all duration-300 hover:border-[#E8827A]/30 hover:shadow-lg hover:shadow-[#E8827A]/10"
          >
            <a href="#planes">
              <span className="flex items-center">
                {t("cta")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
              </span>
            </a>
          </Button>
        </div>

        <Separator className="mb-8 bg-[#2A3A4A]/30" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {t("copyright")}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm justify-center">
            <Link href="/legal/privacidad" className="text-gray-500 hover:text-[#E8827A] transition-colors duration-300">
              {t("legal.privacy")}
            </Link>
            <span className="text-[#2A3A4A]">|</span>
            <Link href="/legal/terminos" className="text-gray-500 hover:text-[#E8827A] transition-colors duration-300">
              {t("legal.terms")}
            </Link>
            <span className="text-[#2A3A4A]">|</span>
            <Link href="/legal/reembolsos" className="text-gray-500 hover:text-[#E8827A] transition-colors duration-300">
              {t("legal.refunds")}
            </Link>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-2">
            <Image
              src="/cards.png"
              alt={t("paymentAlt")}
              width={150}
              height={50}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

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
    </footer>
  );
}