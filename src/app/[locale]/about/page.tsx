"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Shield,
  Target,
  Rocket,
  Award,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Gamepad2,
  Layers,
  Palette,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";

const brands = [
  { name: "NextGen Startups", logo: "⚡ NEXTGEN", color: "#E8827A" },
  { name: "Global Newsrooms", logo: "📰 NEWSROOM", color: "#A8D5E2" },
  { name: "Byteza Cloud", logo: "☁️ BYTEZA", color: "#F4B8A4" },
  { name: "VivaTrip", logo: "✈️ VIVATRIP", color: "#C5A4D9" },
];

// Definir animaciones con los nombres correctos para variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    } 
  }
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 400,
      damping: 10 
    } 
  }
};

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  const historyTimeline = [
    { 
      year: "1990", 
      title: t("history.genesis.title"), 
      desc: t("history.genesis.desc"), 
      icon: Users 
    },
    { 
      year: "2007", 
      title: t("history.expansion.title"), 
      desc: t("history.expansion.desc"), 
      icon: Code 
    },
    { 
      year: "2015", 
      title: t("history.mobile.title"), 
      desc: t("history.mobile.desc"), 
      icon: Gamepad2 
    },
    { 
      year: "2025", 
      title: t("history.integration.title"), 
      desc: t("history.integration.desc"), 
      icon: Zap 
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F151C] text-slate-100 pl-4 lg:pl-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Círculos decorativos */}
      <div className="pointer-events-none absolute top-20 right-20 h-[500px] w-[500px] rounded-full bg-[#E8827A]/5 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-20 left-20 h-[400px] w-[400px] rounded-full bg-[#C5A4D9]/5 blur-[100px]" />

      {/* 1. HERO HEADER BANNER */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 lg:py-28 overflow-hidden bg-[#1A232E] border-b border-[#2A3A4A]/50 rounded-b-[2.5rem]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8827A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A4D9]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#0F151C]/80 px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-gray-400 mb-6 border border-[#2A3A4A]/50"
          >
            <Link href="/" className="hover:text-[#E8827A] transition-colors duration-300">{t("breadcrumb.home")}</Link>
            <ChevronRight className="w-3 h-3 text-[#2A3A4A]" />
            <span className="text-[#E8827A]">{t("breadcrumb.about")}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-none tracking-tight mb-6">
                {t("hero.title.prefix")} <span className="text-[#E8827A]">{t("hero.title.highlight")}</span> {t("hero.title.suffix")}
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </motion.div>

            {/* Bloques de Arte visual - Imágenes */}
            <motion.div 
              className="lg:col-span-6 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Imagen 1 - Grande */}
              <motion.div 
                className="lg:col-span-1 aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 relative group"
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/assets/shield.jpg"
                  alt={t("images.mobileApp")}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Columna derecha - 2 imágenes pequeñas */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                <motion.div 
                  className="aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 relative group"
                  whileHover={{ scale: 1.03, rotate: 2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/assets/sword.jpg"
                    alt={t("images.gaming")}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.div 
                  className="aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 relative group"
                  whileHover={{ scale: 1.03, rotate: -2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/assets/potion.jpg"
                    alt={t("images.appInterface")}
                    fill
                    className="object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* 2. VISION Y MISION */}
      <motion.section
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={bounceIn}>
            <Card className="bg-[#1A232E] border-[#2A3A4A]/50 rounded-3xl overflow-hidden p-8 lg:p-10 relative flex flex-col justify-between shadow-xl hover:shadow-[#E8827A]/5 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8827A] to-[#C5A4D9] rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-jakarta text-white mb-4 uppercase tracking-wide">{t("vision.title")}</h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {t("vision.description")}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#2A3A4A]/30 text-xs text-gray-500 font-mono">
                {t("vision.tag")}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={bounceIn}>
            <Card className="bg-[#1A232E] border-2 border-[#E8827A]/20 rounded-3xl overflow-hidden p-8 lg:p-10 relative flex flex-col justify-between shadow-xl hover:shadow-[#E8827A]/10 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 bg-[#0F151C] rounded-2xl flex items-center justify-center mb-6 border border-[#2A3A4A]/50">
                  <Target className="w-6 h-6 text-[#E8827A]" />
                </div>
                <h2 className="text-2xl font-bold font-jakarta text-white mb-4 uppercase tracking-wide">{t("mission.title")}</h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {t("mission.description")}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#2A3A4A]/30 text-xs text-[#E8827A] font-mono font-bold">
                {t("mission.tag")}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. HISTORIA & TIMELINE */}
      <motion.section
        className="py-16 bg-[#1A232E] rounded-[2.5rem] border-y border-[#2A3A4A]/30"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="text-[#E8827A] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{t("history.badge")}</span>
            <h2 className="text-3xl font-bold font-jakarta text-white">{t("history.title")}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {historyTimeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={bounceIn}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                  }}
                  className="bg-[#0F151C] p-6 rounded-2xl border border-[#2A3A4A]/50 hover:border-[#E8827A]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-extrabold text-[#E8827A] font-mono">
                      {item.year}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#E8827A]/10 border border-[#E8827A]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-[#E8827A]" />
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 4. ADVISORS & WORKFLOW */}
      <motion.section
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Bloque Izquierdo */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-12 gap-4 relative"
            variants={bounceIn}
          >
            <div className="col-span-12 rounded-3xl overflow-hidden bg-[#1A232E] border-4 border-[#1A232E] shadow-xl aspect-[4/3] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8827A]/20 to-[#C5A4D9]/20" />
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <Image
                  src="https://images.pexels.com/photos/8117420/pexels-photo-8117420.jpeg"
                  alt={t("advisors.teamImage")}
                  width={300}
                  height={350}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <motion.div
              className="col-span-8 col-start-5 -mt-20 rounded-2xl overflow-hidden bg-[#E8827A] border-4 border-[#E8827A] shadow-2xl aspect-video relative z-10 hidden sm:block"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
            >
              <div className="w-full h-full flex items-center justify-center text-white/30">
                <Image
                  src="https://images.pexels.com/photos/9908663/pexels-photo-9908663.jpeg"
                  alt={t("advisors.workflowImage")}
                  width={300}
                  height={350}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Bloque Derecho */}
          <motion.div
            className="lg:col-span-7 lg:pl-6"
            variants={fadeInUp}
          >
            <span className="text-[#E8827A] font-mono text-xs uppercase tracking-widest font-bold block mb-2">{t("advisors.badge")}</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-jakarta text-white mb-6">
              {t("advisors.title")}
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
              {t("advisors.description")}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. CTA FINAL */}
      <motion.section
        className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-gradient-to-r from-[#1A232E] to-[#0F151C] border border-[#2A3A4A]/50 p-10 sm:p-16 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E8827A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C5A4D9]/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-jakarta text-white mb-4">
              {t("cta.title.prefix")} <span className="text-[#E8827A]">{t("cta.title.highlight")}</span> {t("cta.title.suffix")}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
              {t("cta.subtitle")}
            </p>

            <Button
              asChild
              className="relative bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 text-white font-bold text-base px-10 py-7 rounded-full shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <Link href="/contacto" className="inline-flex items-center gap-2">
                <span className="relative z-10">{t("cta.button")}</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}