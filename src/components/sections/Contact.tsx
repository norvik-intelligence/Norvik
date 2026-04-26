"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form submitted:", data);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#F5F5F7]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest text-[#0066CC] uppercase">
            Get In Touch
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1D1D1F] leading-tight tracking-tight">
            Ready to start?
          </h2>
          <p className="mt-5 text-lg text-[#86868B] leading-relaxed">
            Tell us about your project and we&apos;ll get back to you within one
            business day.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#E8E8ED] shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-8 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F] mb-3">
                  Message received!
                </h3>
                <p className="text-[#86868B] leading-relaxed max-w-sm">
                  Thanks for reaching out. We&apos;ll review your project brief
                  and respond within one business day.
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
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      placeholder="Jane Smith"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="jane@company.com"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                    Company{" "}
                    <span className="text-[#AEAEB2] font-normal">
                      (optional)
                    </span>
                  </label>
                  <Input placeholder="Acme Inc." {...register("company")} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">
                    Tell us about your project{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    placeholder="We're building a SaaS platform that needs..."
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Inquiry
                      <Send size={15} />
                    </span>
                  )}
                </Button>

                <p className="text-center text-xs text-[#AEAEB2]">
                  We respect your privacy. No spam, ever.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
