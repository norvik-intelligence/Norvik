"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name:    z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  email:   z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  company: z.string().optional(),
  message: z.string().min(20, "Bitte beschreiben Sie Ihr Projekt (min. 20 Zeichen)"),
});
type FormData = z.infer<typeof schema>;

const CONTACT_EMAIL = "mohamed.jamai.norvik@gmail.com";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const subject = encodeURIComponent(
      `Norvik Intelligence Anfrage — ${data.company ? data.company : data.name}`
    );
    const body = encodeURIComponent(
      [`Name: ${data.name}`, `E-Mail: ${data.email}`, `Unternehmen: ${data.company || "—"}`, ``, `Mandat-Beschreibung:`, data.message].join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 lg:py-36 bg-[#07080F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">09</div>

      {/* Accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5865F2]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — headline + info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-label mb-8 inline-flex">Kontakt</span>

            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-tight tracking-tight"
              >
                Bereit anzufangen?
              </motion.h2>
            </div>

            <p className="mt-6 text-[rgba(239,237,232,0.42)] text-base leading-relaxed max-w-sm">
              Erzählen Sie uns von Ihrem Mandat — Markt-, Wettbewerbs- oder M&A-Intelligence.
              Wir antworten innerhalb eines Werktages.
            </p>

            {/* Info card */}
            <div className="mt-10 rounded-2xl border border-white/6 bg-white/[0.02] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5865F2]/10 flex items-center justify-center shrink-0">
                  <Mail size={15} className="text-[#5865F2]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.3)] uppercase mb-0.5">Direktkontakt</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-[#EFEDE8] hover:text-[#5865F2] transition-colors duration-200"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="border-t border-white/6 pt-4 grid grid-cols-2 gap-4">
                {[
                  { label: "Antwortzeit", value: "< 24 h" },
                  { label: "Express", value: "48–72 h" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] font-bold tracking-widest text-[rgba(239,237,232,0.28)] uppercase mb-1">{item.label}</p>
                    <p className="text-base font-black text-[#EFEDE8]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    className="text-center py-12"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#5865F2]/15 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={24} className="text-[#5865F2]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#EFEDE8] mb-3">Anfrage erhalten</h3>
                    <p className="text-sm text-[rgba(239,237,232,0.42)] leading-relaxed">
                      Ihr E-Mail-Programm sollte sich mit einer vorausgefüllten Nachricht geöffnet haben.
                      Bei Problemen schreiben Sie uns direkt an{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#5865F2] hover:underline">
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.35)] uppercase mb-2.5">
                          Name <span className="text-[#5865F2]">*</span>
                        </label>
                        <Input
                          placeholder="Max Mustermann"
                          {...register("name")}
                          aria-invalid={!!errors.name}
                          className="bg-white/[0.03] border-white/8 text-[#EFEDE8] placeholder:text-[rgba(239,237,232,0.2)] focus:border-[#5865F2]/50 focus:bg-white/[0.05] rounded-xl h-11 text-sm transition-all duration-200"
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.35)] uppercase mb-2.5">
                          E-Mail <span className="text-[#5865F2]">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="max@firma.com"
                          {...register("email")}
                          aria-invalid={!!errors.email}
                          className="bg-white/[0.03] border-white/8 text-[#EFEDE8] placeholder:text-[rgba(239,237,232,0.2)] focus:border-[#5865F2]/50 focus:bg-white/[0.05] rounded-xl h-11 text-sm transition-all duration-200"
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.35)] uppercase mb-2.5">
                        Unternehmen <span className="text-[rgba(239,237,232,0.2)] normal-case font-normal text-[10px]">(optional)</span>
                      </label>
                      <Input
                        placeholder="Acme Capital Partners"
                        {...register("company")}
                        className="bg-white/[0.03] border-white/8 text-[#EFEDE8] placeholder:text-[rgba(239,237,232,0.2)] focus:border-[#5865F2]/50 focus:bg-white/[0.05] rounded-xl h-11 text-sm transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.18em] text-[rgba(239,237,232,0.35)] uppercase mb-2.5">
                        Mandat-Beschreibung <span className="text-[#5865F2]">*</span>
                      </label>
                      <Textarea
                        placeholder="Wir bereiten uns auf eine Akquisition im B2B-SaaS-Bereich vor und benötigen Markt- und Wettbewerbs-Intelligence…"
                        {...register("message")}
                        aria-invalid={!!errors.message}
                        className="bg-white/[0.03] border-white/8 text-[#EFEDE8] placeholder:text-[rgba(239,237,232,0.2)] focus:border-[#5865F2]/50 focus:bg-white/[0.05] rounded-xl text-sm min-h-[130px] resize-none transition-all duration-200"
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full group/btn" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Wird gesendet…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Anfrage senden
                          <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>

                    <p className="text-center text-[11px] text-[rgba(239,237,232,0.22)]">
                      Mit dem Absenden stimmen Sie unserer{" "}
                      <a href="/datenschutz" className="hover:text-[rgba(239,237,232,0.45)] underline transition-colors">
                        Datenschutzerklärung
                      </a>{" "}
                      zu.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
