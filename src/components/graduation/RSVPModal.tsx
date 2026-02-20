import { useState, useRef } from "react";
import { X, Check, Heart } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import emailjs from "@emailjs/browser";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStep = "form" | "success";

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [step, setStep] = useState<FormStep>("form");
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    // --- SEUS DADOS DO EMAILJS ---
    const SERVICE_ID = "service_3xnonh8"; 
    const PUBLIC_KEY = "WfHr9-iufUCAeovpH";
    const TEMPLATE_ID = "template_h4hc67l";

    const templateParams = {
      from_name: formData.name,
      attending: formData.attending === "yes" ? "Confirmada ✅" : "Não poderá ir ❌",
      message: formData.message || "O convidado não deixou recado.",
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSubmitting(false);
        setStep("success");
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail:", error);
        alert("Ocorreu um erro ao enviar. Verifique se o Template ID está correto.");
        setIsSubmitting(false);
      });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setFormData({ name: "", attending: "yes", message: "" });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative glass rounded-3xl w-full max-w-md overflow-hidden"
        style={{ boxShadow: "0 0 60px hsl(318 100% 70% / 0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-pink-400 to-purple-500" />

        <div className="p-8">
          <button onClick={handleClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>

          {step === "form" ? (
            <>
              <div className="mb-6">
                <p className="text-pink-400 text-xs uppercase tracking-widest mb-1">Confirmar Presença</p>
                <h2 className="text-2xl font-bold text-white">Confirmar Presença</h2>
                <p className="text-sm text-gray-400 mt-1">29 de Março · Teatro Sesi Fiergs</p>
                <div className="mt-4">
                  <CountdownTimer />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase text-gray-400 block mb-1.5">Seu Nome *</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome completo"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-gray-400 block mb-1.5">Confirmação</label>
                  <select
                    value={formData.attending}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500"
                  >
                    <option value="yes" className="bg-gray-900">✓ Estarei lá!</option>
                    <option value="no" className="bg-gray-900">Não poderei ir</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase text-gray-400 block mb-1.5">Mensagem (opcional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Deixe um recado carinhoso..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500 resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-2xl py-4 font-bold transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Enviando..." : <><Heart className="w-4 h-4 fill-current" /> Confirmar</>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-5 border border-pink-500/40">
                <Check className="w-8 h-8 text-pink-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Combinado!</h2>
              <p className="text-gray-400 text-sm">Obrigada por informar! O e-mail foi enviado para a anfitriã. ✨</p>
              <button onClick={handleClose} className="mt-8 text-pink-400 text-xs uppercase tracking-widest hover:text-pink-300 transition-colors">Fechar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RSVPModal;