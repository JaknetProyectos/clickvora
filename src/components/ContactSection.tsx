"use client";

import { useState } from "react";
import { User, Mail, Phone, Edit3, ArrowRight, Loader2, Sparkles, Send, MapPin, Clock } from "lucide-react";
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
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contact");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-[#0F151C] pl-4 lg:pl-20 relative overflow-hidden">
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
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1A232E] border border-[#2A3A4A]/50 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#F4B8A4]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
          <h2 className="font-jakarta font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
            {t("title.prefix")} <span className="text-[#E8827A]">{t("title.highlight")}</span> {t("title.suffix")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form - 3 columnas */}
          <div className="lg:col-span-3">
            <p className="text-gray-400 mb-8">
              {t("form.description")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="text"
                    name="nombre"
                    placeholder={t("form.name")}
                    value={formData.nombre}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 py-6 rounded-xl bg-[#1A232E] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 focus:border-[#E8827A] focus:ring-[#E8827A]/20 transition-all duration-300"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 py-6 rounded-xl bg-[#1A232E] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 focus:border-[#E8827A] focus:ring-[#E8827A]/20 transition-all duration-300"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="tel"
                    name="telefono"
                    placeholder={t("form.phone")}
                    value={formData.telefono}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 py-6 rounded-xl bg-[#1A232E] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 focus:border-[#E8827A] focus:ring-[#E8827A]/20 transition-all duration-300"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
                <Select 
                  value={formData.asunto} 
                  disabled={isLoading}
                  onValueChange={(value: string) => setFormData({ ...formData, asunto: value })}
                >
                  <SelectTrigger className="py-6 rounded-xl bg-[#1A232E] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 focus:border-[#E8827A] focus:ring-[#E8827A]/20 transition-all duration-300">
                    <SelectValue placeholder={t("form.subject")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A232E] border-[#2A3A4A]/50 text-white">
                    <SelectItem value="videojuegos" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.gameDev")}</SelectItem>
                    <SelectItem value="apps" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.mobileApps")}</SelectItem>
                    <SelectItem value="gamificacion" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.gamification")}</SelectItem>
                    <SelectItem value="arte" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.art")}</SelectItem>
                    <SelectItem value="integraciones" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.integrations")}</SelectItem>
                    <SelectItem value="otro" className="hover:bg-[#2A3A4A] focus:bg-[#2A3A4A]">{t("form.subjects.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Textarea
                  name="mensaje"
                  placeholder={t("form.message")}
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="pl-10 pt-4 min-h-[150px] rounded-xl bg-[#1A232E] border-[#2A3A4A]/50 text-white placeholder:text-gray-500 focus:border-[#E8827A] focus:ring-[#E8827A]/20 transition-all duration-300 resize-none"
                />
                <Edit3 className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
              </div>

              {/* Mensajes de feedback */}
              {status.type && (
                <div className={`p-4 rounded-xl text-sm ${
                  status.type === "success" 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] hover:from-[#E8827A]/90 hover:to-[#C5A4D9]/90 text-white rounded-full py-6 text-base font-medium group shadow-xl shadow-[#E8827A]/20 hover:shadow-[#E8827A]/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <span>{t("form.sending")}</span>
                    <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center justify-center">
                      {t("form.submit")}
                      <Send className="ml-2 w-5 h-5 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info - 2 columnas */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A232E] border border-[#2A3A4A]/50 rounded-2xl p-6 lg:p-8">
              <h3 className="font-jakarta font-bold text-xl text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F4B8A4]" />
                {t("info.title")}
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#E8827A]/10 border border-[#E8827A]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-[#E8827A]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t("info.email")}</p>
                    <a
                      href="mailto:cotizacion@clickvora.com"
                      className="text-gray-300 hover:text-[#E8827A] transition-colors duration-300"
                    >
                      cotizacion@clickvora.com
                    </a>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#A8D5E2]/10 border border-[#A8D5E2]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-[#A8D5E2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t("info.phone")}</p>
                    <a
                      href="tel:+525552445689"
                      className="text-gray-300 hover:text-[#A8D5E2] transition-colors duration-300"
                    >
                      +52 55 5244 5689
                    </a>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#F4B8A4]/10 border border-[#F4B8A4]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-[#F4B8A4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t("info.address")}</p>
                    <div className="text-gray-300 text-sm leading-relaxed">
                      <p>{t("info.addressLines.line1")}</p>
                      <p>{t("info.addressLines.line2")}</p>
                      <p>{t("info.addressLines.line3")}</p>
                      <p>{t("info.addressLines.line4")}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decoración inferior */}
              <div className="mt-8 pt-6 border-t border-[#2A3A4A]/30">
                <div className="flex gap-2">
                  {['#E8827A', '#A8D5E2', '#F4B8A4', '#C5A4D9'].map((color, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}