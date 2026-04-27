"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ArrowRight } from "lucide-react";
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

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
    {children}
  </label>
);

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1.5 text-xs text-red-400">{msg}</p> : null;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const CONTACT_EMAIL = "mohamed.jamai.norvik@gmail.com";

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const subject = encodeURIComponent(
      `Norvik Intelligence Anfrage — ${data.company ? data.company : data.name}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `E-Mail: ${data.email}`,
        `Unternehmen: ${data.company || "—"}`,
        ``,
        `Mandat-Beschreibung:`,
        data.message,
      ].join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">
              Kontakt
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Bereit zu starten?
            </h2>
            <p className="text-slate-400 mt-4 max-w-md mx-auto">
              Erzählen Sie uns von Ihrem Mandat — Markt-, Wettbewerbs- oder M&A-Intelligence. Wir antworten innerhalb eines Werktages.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block mt-3 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <CheckCircle className="mx-auto mb-4 text-green-400" size={40} />
                <h3 className="text-xl font-semibold text-white mb-2">Anfrage erhalten</h3>
                <p className="text-sm text-slate-400">
                  Ihr E-Mail-Programm sollte sich mit einer vorausgefüllten Anfrage geöffnet haben. Falls nicht, erreichen Sie uns direkt unter{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-300 underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div>
                  <Label>Vollständiger Name <span className="text-blue-500">*</span></Label>
                  <Input placeholder="Max Mustermann" {...register("name")} aria-invalid={!!errors.name} />
                  <ErrorMsg msg={errors.name?.message} />
                </div>
                <div>
                  <Label>Geschäftliche E-Mail <span className="text-blue-500">*</span></Label>
                  <Input type="email" placeholder="max@unternehmen.com" {...register("email")} aria-invalid={!!errors.email} />
                  <ErrorMsg msg={errors.email?.message} />
                </div>
                <div>
                  <Label>Unternehmen <span className="text-slate-600 normal-case font-normal">(optional)</span></Label>
                  <Input placeholder="Acme Capital Partners" {...register("company")} />
                </div>
                <div>
                  <Label>Beschreiben Sie Ihr Mandat <span className="text-blue-500">*</span></Label>
                  <Textarea
                    placeholder="Wir bereiten uns auf eine Akquisition im B2B-SaaS-Bereich vor und benötigen ein Markt- und Wettbewerbs-Intelligence-Briefing…"
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    className="min-h-[120px]"
                  />
                  <ErrorMsg msg={errors.message?.message} />
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
                <p className="text-center text-xs text-slate-700">
                  Mit dem Absenden erklären Sie sich mit unserer{" "}
                  <a href="/datenschutz" className="text-slate-600 hover:text-slate-400 underline transition-colors">
                    Datenschutzerklärung
                  </a>{" "}
                  einverstanden. Kein Spam, versprochen.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
