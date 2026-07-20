"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  Loader2,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
  Globe
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContact } from "@/hooks/useContact";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const { sendContactForm, isLoading } = useContact();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setStatus({
        type: "error",
        message: t("errors.requiredFields"),
      });
      return;
    }

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus({
        type: "success",
        message: t("success.message"),
      });
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
    } else {
      setStatus({
        type: "error",
        message: result.error || t("errors.default"),
      });
    }
  };

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

      {/* Header & Breadcrumbs */}
      <header className="relative z-10 py-12 bg-[#1A232E] border-b border-[#2A3A4A]/50 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#E8827A] transition-colors duration-300">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="w-3 h-3 text-[#2A3A4A]" />
            <span className="text-[#E8827A]">{t("breadcrumb.contact")}</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#E8827A] to-[#C5A4D9]" />
            <h1 className="font-jakarta font-bold text-3xl sm:text-4xl text-white">
              {t("title")}
            </h1>
          </div>
          <p className="mt-2 text-gray-400 text-sm max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Columna 1: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1A232E] p-6 sm:p-8 rounded-3xl border border-[#2A3A4A]/50 shadow-xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0F151C] border border-[#2A3A4A]/50 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B8A4]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4B8A4]">
                {t("form.badge")}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              {t("form.description")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="text"
                    name="nombre"
                    placeholder={t("form.name")}
                    value={formData.nombre}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 bg-[#0F151C] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 rounded-xl focus:border-[#E8827A]/50 focus:ring-[#E8827A]/10 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 bg-[#0F151C] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 rounded-xl focus:border-[#E8827A]/50 focus:ring-[#E8827A]/10 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="tel"
                    name="telefono"
                    placeholder={t("form.phone")}
                    value={formData.telefono}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 bg-[#0F151C] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 rounded-xl focus:border-[#E8827A]/50 focus:ring-[#E8827A]/10 transition-all duration-300"
                  />
                </div>
                <Select
                  value={formData.asunto}
                  disabled={isLoading}
                  onValueChange={(value: string) => setFormData({ ...formData, asunto: value })}
                >
                  <SelectTrigger className="bg-[#0F151C] border-[#2A3A4A]/50 text-white rounded-xl focus:border-[#E8827A]/50 focus:ring-[#E8827A]/10 transition-all duration-300">
                    <SelectValue placeholder={t("form.subject")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A232E] border-[#2A3A4A]/50 text-white">
                    <SelectItem value="cotizacion" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.quote")}</SelectItem>
                    <SelectItem value="dudas" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.questions")}</SelectItem>
                    <SelectItem value="pagos" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.payments")}</SelectItem>
                    <SelectItem value="otro" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
                <Textarea
                  name="mensaje"
                  placeholder={t("form.message")}
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="pl-10 bg-[#0F151C] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 min-h-[120px] rounded-xl focus:border-[#E8827A]/50 focus:ring-[#E8827A]/10 transition-all duration-300 resize-none"
                />
              </div>

              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm border ${
                    status.type === "success"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    {t("form.sending")} <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center justify-center">
                      {t("form.submit")}
                      <Send className="ml-2 w-4 h-4 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Columna 2: Información + Imágenes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Grid de imágenes decorativas */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 group"
              >
                <Image
                  src={getOptimizedUrl("https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("images.mobileApp")}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, rotate: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 group"
              >
                <Image
                  src={getOptimizedUrl("https://images.unsplash.com/photo-1660326269462-b3a6b6743ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("images.gaming")}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 group"
              >
                <Image
                  src={getOptimizedUrl("https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("images.appInterface")}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#0F151C] border border-[#2A3A4A]/50 group"
              >
                <Image
                  src={getOptimizedUrl("https://images.unsplash.com/photo-1650960865643-eeecde3203d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("images.unity")}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F151C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>

            {/* Info de contacto */}
            <div className="bg-[#1A232E] p-6 sm:p-8 rounded-3xl border border-[#2A3A4A]/50 shadow-xl">
              <h3 className="font-jakarta font-bold text-lg text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
                {t("info.title")}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#E8827A]/10 border border-[#E8827A]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4 text-[#E8827A]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t("info.email")}</p>
                    <a href="cotizacion@clickvora.com.mx" className="text-gray-300 hover:text-[#E8827A] transition-colors duration-300 text-sm">
                      cotizacion@clickvora.com.mx
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#A8D5E2]/10 border border-[#A8D5E2]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-4 h-4 text-[#A8D5E2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t("info.phone")}</p>
                    <a href="tel:+12345678900" className="text-gray-300 hover:text-[#A8D5E2] transition-colors duration-300 text-sm">
                      +52 1 55 5244 5689
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#F4B8A4]/10 border border-[#F4B8A4]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 text-[#F4B8A4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t("info.address")}</p>
                    <div className="text-gray-300 text-sm leading-relaxed">
                      <p>{t("info.addressLines.line1")}</p>
                      <p>{t("info.addressLines.line2")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decoración */}
              <div className="mt-6 pt-6 border-t border-[#2A3A4A]/30 flex gap-2">
                {['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'].map((color, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Mapa */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#1A232E] rounded-3xl overflow-hidden border border-[#2A3A4A]/50 shadow-xl">
          <div className="w-full h-64 bg-[#0F151C]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2241.1975795817248!2d-99.1887582305509!3d19.43553434410102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8aa36ee3f39%3A0x9cc974bcc81656e9!2sAv.%20Homero%20404-PISO%205%2C%20Polanco%2C%20Polanco%20V%20Secc%2C%20Miguel%20Hidalgo%2C%2011560%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1784585089566!5m2!1ses-419!2smx"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google maps"
            />
          </div>
        </div>
      </div>
    </div>
  );
}