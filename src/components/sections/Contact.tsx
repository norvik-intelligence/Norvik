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
  name:    z.string().min(2, "Please enter your name"),
  email:   z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(20, "Please describe your project (min. 20 characters)"),
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
      `Norvik Intelligence Inquiry — ${data.company ? data.company : data.name}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        ``,
        `Mandate Brief:`,
        data.message,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#07111E]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Ready to start?
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Tell us about your mandate — market, competitive or M&A intelligence.
            We respond within one business day.
          </p>
          <a
            href="mailto:mohamed.jamai.norvik@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            mohamed.jamai.norvik@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/7 bg-[#0A1628]/70 backdrop-blur-sm p-8 sm:p-10 shadow-[0_8px_60px_rgba(0,0,0,0.5)]"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle size={30} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Inquiry received</h3>
                <p className="text-slate-400 leading-relaxed max-w-sm">
                  Your email client should have opened with a pre-filled inquiry.
                  If not, reach us directly at{" "}
                  <a
                    href="mailto:mohamed.jamai.norvik@gmail.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    mohamed.jamai.norvik@gmail.com
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Full Name *</Label>
                    <Input placeholder="Jane Smith" {...register("name")} aria-invalid={!!errors.name} />
                    <ErrorMsg msg={errors.name?.message} />
                  </div>
                  <div>
                    <Label>Work Email *</Label>
                    <Input type="email" placeholder="jane@company.com" {...register("email")} aria-invalid={!!errors.email} />
                    <ErrorMsg msg={errors.email?.message} />
                  </div>
                </div>

                <div>
                  <Label>Company <span className="normal-case text-slate-700">(optional)</span></Label>
                  <Input placeholder="Acme Capital Partners" {...register("company")} />
                </div>

                <div>
                  <Label>Tell us about your mandate *</Label>
                  <Textarea
                    placeholder="We are preparing for an acquisition in the B2B SaaS space and need a market and competitive intelligence briefing…"
                    {...register("message")}
                    aria-invalid={!!errors.message}
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
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Inquiry
                      <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                <p className="text-center text-xs text-slate-700">
                  By submitting you agree to our{" "}
                  <a href="/datenschutz" className="text-slate-600 hover:text-slate-400 underline transition-colors">
                    Privacy Policy
                  </a>
                  . No spam, ever.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
