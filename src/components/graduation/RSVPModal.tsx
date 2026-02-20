import { useState } from "react";
import { X, Check, Heart } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStep = "form" | "success";

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [step, setStep] = useState<FormStep>("form");
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
    attending: "yes",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setFormData({ name: "", guests: "1", attending: "yes", message: "" });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "hsl(0 0% 0% / 0.7)", backdropFilter: "blur(8px)" }}
      />

      {/* Modal */}
      <div
        className="relative glass rounded-3xl w-full max-w-md overflow-hidden"
        style={{
          boxShadow: "0 0 60px hsl(318 100% 70% / 0.2), var(--shadow-card)",
          animation: "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pink accent bar */}
        <div className="h-1 w-full" style={{ background: "var(--gradient-pink)" }} />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full glass-white flex items-center justify-center transition-all hover:scale-110"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <X className="w-4 h-4" />
          </button>

          {step === "form" ? (
            <>
              <div className="mb-6">
                <p className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: "hsl(var(--pink))" }}>
                  RSVP
                </p>
                <h2 className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                  Confirmar Presença
                </h2>
                <p className="font-sans text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  29 de Março · Teatro Sesi Fiergs
                </p>

                {/* Countdown */}
                <div className="mt-4">
                  <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Faltam apenas
                  </p>
                  <CountdownTimer />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-sans text-xs uppercase tracking-widest block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome completo"
                    className="w-full rounded-xl px-4 py-3 font-sans text-sm outline-none transition-all"
                    style={{
                      background: "hsl(var(--muted))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "hsl(var(--pink))";
                      e.target.style.boxShadow = "0 0 0 2px hsl(318 100% 70% / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "hsl(var(--border))";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-sans text-xs uppercase tracking-widest block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Confirmação
                    </label>
                    <select
                      value={formData.attending}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 font-sans text-sm outline-none"
                      style={{
                        background: "hsl(var(--muted))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      <option value="yes">✓ Estarei lá!</option>
                      <option value="no">Não poderei ir</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-sans text-xs uppercase tracking-widest block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Convidados
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 font-sans text-sm outline-none"
                      style={{
                        background: "hsl(var(--muted))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n} value={n}>{n} pessoa{n !== "1" ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs uppercase tracking-widest block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Mensagem (opcional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Deixe uma mensagem carinhosa..."
                    rows={3}
                    className="w-full rounded-xl px-4 py-3 font-sans text-sm outline-none resize-none transition-all"
                    style={{
                      background: "hsl(var(--muted))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "hsl(var(--pink))";
                      e.target.style.boxShadow = "0 0 0 2px hsl(318 100% 70% / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "hsl(var(--border))";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl px-6 py-4 font-sans font-medium text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
                  style={{
                    background: "var(--gradient-pink)",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "var(--shadow-pink)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      Confirmar Presença
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 animate-float"
                style={{ background: "hsl(var(--pink) / 0.15)", border: "1px solid hsl(var(--pink) / 0.4)" }}
              >
                <Check className="w-8 h-8" style={{ color: "hsl(var(--pink))" }} />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                Presença Confirmada!
              </h2>
              <p className="font-sans text-sm mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                Obrigada, <span style={{ color: "hsl(var(--pink))" }}>{formData.name}</span>!
              </p>
              <p className="font-sans text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Nos vemos no dia 29 de Março. 🎓✨
              </p>
              <button
                onClick={handleClose}
                className="mt-8 font-sans text-xs uppercase tracking-widest transition-colors hover:opacity-80"
                style={{ color: "hsl(var(--pink))" }}
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RSVPModal;
