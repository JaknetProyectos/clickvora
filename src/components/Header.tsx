"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Home,
  Layers,
  CreditCard,
  Mail,
  ShoppingCart,
  Globe,
  Menu,
  X,
  User,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useLocaleContext } from "@/context/LangContext";
import { formatPrice } from "@/lib/price";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { itemCount, total } = useCart();
  const { locale, switchLanguage } = useLocaleContext();

  const menuItems = [
    {
      label: t("nav.home"),
      href: "/#",
      icon: Home,
      color: "#E8827A"
    },
    {
      label: t("nav.about"),
      href: "/about",
      icon: User,
      color: "#C5A4D9"
    },
    {
      label: t("nav.services"),
      href: "/#servicios",
      icon: Layers,
      color: "#A8D5E2"
    },
    {
      label: t("nav.plans"),
      href: "/#planes",
      icon: CreditCard,
      color: "#F4B8A4"
    },
    {
      label: t("nav.contact"),
      href: "/contacto",
      icon: Mail,
      color: "#C5A4D9"
    },
  ];

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  return (
    <>
      {/* Sidebar para escritorio */}
      <aside
        className="hidden lg:flex fixed top-0 py-8 px-4 left-0 h-full z-50 flex-col bg-[#1A232E] border-r border-[#2A3A4A]/50 transition-all duration-300 ease-in-out"
        style={{ width: isExpanded ? "240px" : "92px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-[#2A3A4A]/30">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <Image
              src="/logo.png"
              alt={t("logoAlt")}
              width={36}
              height={36}
              className="w-9 h-9 flex-shrink-0"
            />
            <span
              className={`font-jakarta font-bold text-xl whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0"
                }`}
            >
              <Image
                src="/title.png"
                alt={t("titleAlt")}
                width={40}
                height={200}
                className="w-[180px] h-9"
              />
            </span>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5"
              >
                <Icon
                  className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ color: item.color }}
                />
                <span
                  className={`text-sm font-medium text-gray-200 whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0"
                    }`}
                >
                  {item.label}
                </span>
                {isExpanded && (
                  <span
                    className="absolute right-3 w-1 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Parte inferior */}
        <div className="border-t border-[#2A3A4A]/30 px-3 py-3">
          <div className="flex flex-col gap-2">
            {/* Carrito */}
            <Link
              href="/carrito"
              className="flex items-center gap-4 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#E8827A]" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8827A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              </div>
              <span
                className={`text-sm font-medium text-gray-200 whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0"
                  }`}
              >
                ${formatPrice(total)} MXN {t("tax")}
              </span>
            </Link>

            {/* Toggle de idioma - Estilo carrito */}
            <div className="flex items-center gap-4 px-3 py-2">
              <div className="relative flex-shrink-0">
                <Globe className="w-5 h-5 text-[#6B7A8A]" />
              </div>
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0"
                  }`}
              >
                <button
                  onClick={() => switchLanguage("es")}
                  className={`text-xs font-medium px-2 py-0.5 rounded transition-all ${locale === "es"
                    ? "bg-[#E8827A] text-white"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  ES
                </button>
                <button
                  onClick={() => switchLanguage("en")}
                  className={`text-xs font-medium px-2 py-0.5 rounded transition-all ${locale === "en"
                    ? "bg-[#A8D5E2] text-[#1A232E]"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

      </aside>

      {/* Botón hamburguesa para móvil */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="bg-[#1A232E] border border-[#2A3A4A]/50 rounded-xl hover:bg-[#2A3A4A] w-10 h-10"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? t("closeMenu") : t("openMenu")}
        >
          {isMobileOpen ? (
            <X className="w-5 h-5 text-[#E8827A]" />
          ) : (
            <Menu className="w-5 h-5 text-gray-200" />
          )}
        </Button>
      </div>

      {/* Sidebar móvil */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsMobileOpen(false)}
        />

        <aside
          className={`absolute top-0 left-0 h-full w-[280px] bg-[#1A232E] border-r border-[#2A3A4A]/50 transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Logo móvil */}
          <div className="flex items-center h-16 px-4 border-b border-[#2A3A4A]/30">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://ext.same-assets.com/1458749180/692592992.png"
                alt={t("logoAlt")}
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <Image
                src="/title.png"
                alt={t("titleAlt")}
                width={40}
                height={200}
                className="w-[180px] h-9"
              />
            </Link>
          </div>

          {/* Navegación móvil */}
          <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                  <span className="text-sm font-medium text-gray-200">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Parte inferior móvil */}
          <div className="border-t border-[#2A3A4A]/30 px-3 py-3">
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center gap-4 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#E8827A]" />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E8827A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-200">$0.00</span>
              </Link>

              {/* Toggle de idioma móvil */}
              <div className="flex items-center gap-4 px-3 py-2">
                <Globe className="w-5 h-5 text-[#6B7A8A]" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      switchLanguage("es");
                      setIsMobileOpen(false);
                    }}
                    className={`text-xs font-medium px-2 py-0.5 rounded transition-all ${locale === "es"
                      ? "bg-[#E8827A] text-white"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage("en");
                      setIsMobileOpen(false);
                    }}
                    className={`text-xs font-medium px-2 py-0.5 rounded transition-all ${locale === "en"
                      ? "bg-[#A8D5E2] text-[#1A232E]"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}