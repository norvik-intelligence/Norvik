"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { browserClient } from "@/lib/radar/supabase-browser";
import { registerCertificate } from "./actions";
import { messages } from "@/lib/radar/messages";

const CERT_TYPES = [
  { value: "trgs519", label: "TRGS 519 (Asbest)" },
  { value: "freistellung_48b", label: "§48b-Freistellung" },
  { value: "entsorgungsfachbetrieb", label: "Entsorgungsfachbetrieb" },
  { value: "sonstige", label: "Sonstiges" },
];

export function CertUpload({ companyId }: { companyId: string }) {
  const router = useRouter();
  const [certType, setCertType] = useState("trgs519");
  const [validUntil, setValidUntil] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("Datei zu groß (max. 10 MB).");
      return;
    }
    setLoading(true);
    setError(null);

    // Upload under the company's own prefix (enforced by Storage RLS)
    const path = `${companyId}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const supabase = browserClient();
    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(path, file);

    if (uploadError) {
      setError("Upload fehlgeschlagen. Bitte erneut versuchen.");
      setLoading(false);
      return;
    }

    const result = await registerCertificate({
      type: certType,
      file_path: path,
      valid_until: validUntil || null,
    });

    if (result.error) {
      setError(result.error);
    } else {
      setFile(null);
      setValidUntil("");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <select
          value={certType}
          onChange={(e) => setCertType(e.target.value)}
          className="h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          {CERT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          title="Gültig bis"
          className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        required
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-500 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-800"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !file}
        className="flex items-center gap-2 px-4 h-10 rounded-lg font-semibold text-sm text-white disabled:opacity-50"
        style={{ background: "#1A3A2A" }}
      >
        <Upload className="h-3.5 w-3.5" />
        {loading ? messages.common.loading : "Zertifikat hochladen"}
      </button>
    </form>
  );
}
