"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  Shield,
  Gift,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";
import { processOctanoPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";

const VALID_COUPONS = [
  { code: "MED10", discount: 0.1 },
  { code: "CONFIANZA15", discount: 0.15 },
  { code: "PROMO20", discount: 0.2 },
];

type Step = 1 | 2 | 3;

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-[#2A3A4A]/50 bg-[#1A232E]",
        "shadow-lg transition-all duration-300",
        "hover:border-[#E8827A]/30 hover:shadow-[#E8827A]/5",
        className,
      ].join(" ")}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8827A]/10 border border-[#E8827A]/20">
        <Icon className="h-4 w-4 text-[#E8827A]" />
      </div>
      <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-200">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
  maxLength,
  mono = false,
  inputClassName = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[11px] font-semibold text-gray-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "w-full rounded-xl border border-[#2A3A4A]/50 bg-[#0F151C]/90 px-4 py-3",
          "text-xs text-white outline-none transition-all placeholder:text-gray-600",
          "focus:border-[#E8827A]/50 focus:ring-2 focus:ring-[#E8827A]/10",
          mono ? "font-mono tracking-widest" : "",
          inputClassName,
        ].join(" ")}
      />
    </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX",
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const found = VALID_COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }

    setCouponError(t("financial.couponInvalid"));
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const uniqueOrderId = `MC-${Date.now()}`;

    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.padStart(2, "0"),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(),
        estado: formData.estado.trim(),
        pais: formData.pais,
        cp: formData.cp.trim(),
        empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: appliedCoupon
          ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}`
          : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processOctanoPayment(paymentPayload);

      if (response.success) {
        setSuccessData(response.data);

        try {
          await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId,
              amount: paymentPayload.amount,
              customer: paymentPayload.customer,
              items,
              metadata: paymentPayload.metadata,
            }),
          });
        } catch (emailError) {
          console.error("⚠️ Falló el despacho de correos informativos:", emailError);
        }

        clearCart();
        setStep(3);
      } else {
        setErrorMessage(response.error || t("errors.declined"));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#0F151C] text-slate-100 pb-20 pl-4 lg:pl-20">
        <div className="mx-auto max-w-xl px-4 pt-32">
          <CardShell className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8827A]/10 border border-[#E8827A]/20 text-[#E8827A]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h1 className="text-2xl font-bold text-white">{t("success.title")}</h1>

            <p className="mx-auto mt-3 text-sm text-gray-400">
              {t("success.description")}
            </p>

            <div className="mt-8 rounded-xl border border-[#2A3A4A]/50 bg-[#0F151C] p-4 text-left">
              <div className="flex items-center justify-between gap-4 border-b border-[#2A3A4A]/30 pb-3">
                <span className="text-xs font-semibold text-gray-400">
                  {t("success.transactionStatus")}
                </span>
                <span className="text-xs font-bold text-[#E8827A]">
                  {t("success.approved")}
                </span>
              </div>
            </div>

            <Link href="/#planes" className="mt-8 block">
              <button className="w-full rounded-xl bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#E8827A]/20">
                {t("success.backToCatalog")}
              </button>
            </Link>
          </CardShell>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F151C] text-slate-100 pb-20 pl-4 lg:pl-20">
      {/* Decoración de fondo */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8827A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="pointer-events-none fixed top-20 right-20 h-[400px] w-[400px] rounded-full bg-[#E8827A]/5 blur-[130px]" />
      <div className="pointer-events-none fixed bottom-20 left-20 h-[400px] w-[400px] rounded-full bg-[#C5A4D9]/5 blur-[100px]" />

      {/* Barra de navegación sticky */}
      <div className="sticky top-0 z-40 border-b border-[#2A3A4A]/30 bg-[#0F151C]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-[#E8827A] transition-colors">
              {t("breadcrumb.home")}
            </Link>
            <span className="text-[#2A3A4A]">/</span>
            <span
              className={
                step === 1 ? "font-bold text-[#E8827A]" : "text-gray-600"
              }
            >
              {t("breadcrumb.summary")}
            </span>
            <span className="text-[#2A3A4A]">/</span>
            <span
              className={
                step === 2 ? "font-bold text-[#E8827A]" : "text-gray-600"
              }
            >
              {t("breadcrumb.shippingPayment")}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <div
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                step >= 1 ? "bg-[#E8827A]" : "bg-[#2A3A4A]"
              }`}
            />
            <div
              className={`h-0.5 w-12 rounded-full transition-colors duration-300 ${
                step >= 2 ? "bg-[#E8827A]" : "bg-[#2A3A4A]"
              }`}
            />
            <div
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                step >= 2 ? "bg-[#E8827A]" : "bg-[#2A3A4A]"
              }`}
            />
          </div>
        </div>
      </div>

      <main className="relative z-10 py-8">
        <div className="mx-auto px-4 md:px-6">
          {items.length === 0 ? (
            <CardShell className="mx-auto max-w-lg p-8 text-center">
              <ShoppingBag className="mx-auto mb-5 h-14 w-14 text-[#2A3A4A]" />
              <h2 className="text-xl font-bold text-white">{t("empty.title")}</h2>
              <p className="mx-auto mt-2 text-xs text-gray-400">
                {t("empty.description")}
              </p>
              <Link href="/#planes" className="mt-8 inline-block">
                <button className="rounded-xl border border-[#2A3A4A]/50 bg-[#1A232E] px-8 py-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#2A3A4A]">
                  {t("empty.goToStore")}
                </button>
              </Link>
            </CardShell>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-300">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {step === 1 && (
                  <CardShell className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                        {t("order.title")}
                      </h2>

                      <button
                        type="button"
                        onClick={clearCart}
                        className="flex items-center gap-1.5 text-xs font-bold text-red-300 transition hover:text-red-200"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t("order.clear")}
                      </button>
                    </div>

                    <div className="mt-5 space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="rounded-xl border border-[#2A3A4A]/30 bg-[#0F151C] p-4 transition-all duration-300 hover:border-[#E8827A]/30"
                        >
                          <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-4">
                            <div className="relative overflow-hidden rounded-lg border border-[#2A3A4A]/30 bg-[#0F151C] p-2">
                              <Link
                                href={`/producto/${item.product.id}`}
                                className="absolute inset-0 z-10"
                              />
                              <Image
                                src={item.product.image || "/logo.png"}
                                alt={item.product.name}
                                width={80}
                                height={80}
                                className="object-contain"
                              />
                            </div>

                            <div className="flex min-w-0 flex-col justify-between gap-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="mb-1 inline-block rounded-md bg-[#E8827A]/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-[#E8827A]">
                                    {item.product.id}
                                  </p>
                                  <h3 className="line-clamp-1 text-sm font-bold text-white">
                                    {item.product.name}
                                  </h3>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeItem(item.product.id)}
                                  className="rounded-lg p-1.5 text-gray-500 transition hover:bg-white/5 hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="flex items-end justify-between gap-4">
                                <div className="flex items-center rounded-lg border border-[#2A3A4A]/30 bg-[#0F151C] p-0.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(item.product.id, item.quantity - 1)
                                    }
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>

                                  <span className="w-8 text-center text-xs font-bold text-white">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(item.product.id, item.quantity + 1)
                                    }
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <span className="text-sm font-black text-white">
                                  {formatPrice(item.product.price * item.quantity, "MXN", true)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardShell>
                )}

                {step === 2 && (
                  <form
                    id="octano-payment-form"
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-6"
                  >
                    <CardShell className="p-6">
                      <SectionTitle icon={User} title={t("form.buyerTitle")} />

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("form.firstName")}
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.lastName")}
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.email")}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.phone")}
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.company")}
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          className="sm:col-span-2"
                        />
                      </div>
                    </CardShell>

                    <CardShell className="p-6">
                      <SectionTitle icon={MapPin} title={t("form.addressTitle")} />

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("form.streetAddress")}
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.streetAddressPlaceholder")}
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.neighborhood")}
                          name="direccion2"
                          value={formData.direccion2}
                          onChange={handleInputChange}
                          placeholder={t("form.neighborhoodPlaceholder")}
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.city")}
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.state")}
                          name="estado"
                          value={formData.estado}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.statePlaceholder")}
                        />
                        <Field
                          label={t("form.postalCode")}
                          name="cp"
                          value={formData.cp}
                          onChange={handleInputChange}
                          required
                        />
                        <div>
                          <label className="mb-1.5 block text-[11px] font-semibold text-gray-400">
                            {t("form.country")}
                          </label>
                          <select
                            name="pais"
                            value={formData.pais}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-xl border border-[#2A3A4A]/50 bg-[#0F151C]/90 px-4 py-3 text-xs text-white outline-none transition-all focus:border-[#E8827A]/50 focus:ring-2 focus:ring-[#E8827A]/10"
                          >
                            <option value="MX" className="bg-[#0F151C]">
                              {t("form.mexico")}
                            </option>
                          </select>
                        </div>
                      </div>
                    </CardShell>

                    <CardShell className="p-6">
                      <SectionTitle icon={CreditCard} title={t("form.paymentTitle")} />

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-6">
                        <Field
                          label={t("form.cardNumber")}
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength={16}
                          placeholder={t("form.cardNumberPlaceholder")}
                          className="sm:col-span-6"
                          mono
                        />
                        <Field
                          label={t("form.cardHolderName")}
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.cardHolderPlaceholder")}
                          className="sm:col-span-6"
                        />
                        <Field
                          label={t("form.expiryMonth")}
                          name="cardMonth"
                          value={formData.cardMonth}
                          onChange={handleInputChange}
                          required
                          maxLength={2}
                          placeholder={t("form.expiryMonthPlaceholder")}
                          mono
                          inputClassName="text-center"
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.expiryYear")}
                          name="cardYear"
                          value={formData.cardYear}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          placeholder={t("form.expiryYearPlaceholder")}
                          mono
                          inputClassName="text-center"
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.cvv")}
                          name="cardCvv"
                          type="password"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          placeholder={t("form.cvvPlaceholder")}
                          mono
                          inputClassName="text-center"
                          className="sm:col-span-2"
                        />
                      </div>
                    </CardShell>
                  </form>
                )}
              </div>

              {/* Columna derecha: Resumen y acciones */}
              <div className="lg:col-span-5 space-y-6">
                <CardShell className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-200">
                      {t("financial.title")}
                    </h2>
                    <Sparkles className="h-4 w-4 text-[#F4B8A4]" />
                  </div>

                  {/* Cupón */}
                  <div className="mt-5">
                    {!appliedCoupon ? (
                      <form
                        onSubmit={handleApplyCoupon}
                        className="rounded-xl border border-[#2A3A4A]/30 bg-[#0F151C] p-4"
                      >
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-[#E8827A]" />
                          <p className="text-xs font-bold uppercase tracking-wider text-[#E8827A]">
                            {t("financial.applyCoupon")}
                          </p>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-500">
                          {t("financial.couponPlaceholder")}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            placeholder={t("financial.couponPlaceholder")}
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="min-w-0 flex-1 rounded-xl border border-[#2A3A4A]/50 bg-[#0F151C]/90 px-4 py-3 text-xs text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#E8827A]/50 focus:ring-2 focus:ring-[#E8827A]/10"
                          />
                          <button
                            type="submit"
                            className="shrink-0 rounded-xl border border-[#2A3A4A]/50 bg-[#0F151C] px-4 text-xs font-bold text-white transition hover:border-[#E8827A]/30 hover:bg-[#E8827A]/10"
                          >
                            {t("financial.applyCoupon")}
                          </button>
                        </div>
                        {couponError && (
                          <p className="mt-2 text-[10px] font-semibold text-red-300">
                            ⚠️ {couponError}
                          </p>
                        )}
                      </form>
                    ) : (
                      <div className="rounded-xl border border-[#E8827A]/30 bg-[#E8827A]/10 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#E8827A]">
                              {t("financial.appliedCoupon", {
                                code: appliedCoupon.code,
                                discount: appliedCoupon.discount * 100,
                              })}
                            </p>
                            <button
                              type="button"
                              onClick={() => setAppliedCoupon(null)}
                              className="mt-1 text-[11px] text-gray-400 hover:text-white transition"
                            >
                              {t("financial.remove")}
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#E8827A]">
                            -{appliedCoupon.discount * 100}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Totales */}
                  <div className="mt-5 space-y-3 rounded-xl border border-[#2A3A4A]/30 bg-[#0F151C] p-4 text-xs font-medium text-gray-400">
                    <div className="flex justify-between gap-4">
                      <span>{t("financial.subtotal")}</span>
                      <span className="font-bold text-white">
                        {formatPrice(total, "MXN", true)}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between gap-4 text-[#E8827A]">
                        <span>{t("financial.discount")}</span>
                        <span className="font-bold">
                          -{formatPrice(discountAmount, "MXN", true)}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-[#2A3A4A]/30 pt-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-bold text-white">
                          {t("financial.netTotal")}
                        </span>
                        <span className="text-xl font-black text-white">
                          {formatPrice(grandTotal, "MXN", true)}
                        </span>
                      </div>
                      <p className="mt-1 text-right text-[10px] text-gray-500">
                        {t("financial.tax", {
                          tax: formatPrice(iva, "MXN", true),
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-5 space-y-3">
                    {step === 1 ? (
                      <button
                        onClick={() => setStep(2)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] py-4 text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#E8827A]/20"
                      >
                        {t("actions.proceedToPayment")}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          form="octano-payment-form"
                          disabled={isProcessing}
                          className={[
                            "flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold tracking-widest transition-all duration-300",
                            isProcessing
                              ? "cursor-wait bg-[#2A3A4A] text-gray-500"
                              : "bg-gradient-to-r from-[#E8827A] to-[#C5A4D9] text-white hover:scale-[1.02] shadow-lg shadow-[#E8827A]/20",
                          ].join(" ")}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>{t("actions.processing")}</span>
                            </>
                          ) : (
                            t("actions.payAmount", {
                              amount: formatPrice(grandTotal, "MXN", true),
                            })
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => setStep(1)}
                          className="flex w-full items-center justify-center gap-1 py-2 text-xs font-bold text-gray-400 transition hover:text-white"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          {t("actions.backToCart")}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Seguridad */}
                  <div className="mt-5 border-t border-[#2A3A4A]/30 pt-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                      <Shield className="h-3.5 w-3.5 text-[#E8827A]" />
                      <span>{t("security.note")}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-center">
                      <Image
                        src="/secure-payment.png"
                        alt={t("images.securePaymentAlt")}
                        width={100}
                        height={20}
                        className="object-contain opacity-80"
                      />
                    </div>
                  </div>
                </CardShell>

                {/* Logo de Octano */}
                <div className="flex justify-center">
                  <Image
                    src="/octano.png"
                    alt={t("images.securePaymentAlt")}
                    width={120}
                    height={20}
                    className="object-contain brightness-200 opacity-60"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}