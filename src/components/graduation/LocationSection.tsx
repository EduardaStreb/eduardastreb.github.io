import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Teatro+Sesi+Fiergs+Porto+Alegre+Av+Assis+Brasil+8787";

const EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6!2d-51.1399!3d-29.9944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519648dc0e63f53%3A0x6d3b50f04c99d3d5!2sTeatro+SESI+FIERGS!5e0!3m2!1spt!2sbr!4v1";

const LocationSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal();
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Pink orb decoration */}
      <div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "hsl(var(--pink))" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 reveal ${titleVisible ? "revealed" : ""}`}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "hsl(var(--pink))" }}
          >
            Como Chegar
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
            Local do{" "}
            <span className="text-gradient-pink italic">Evento</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div
            ref={mapRef as React.RefObject<HTMLDivElement>}
            className={`reveal-left ${mapVisible ? "revealed" : ""}`}
          >
            <div className="relative rounded-3xl overflow-hidden glass" style={{ height: "380px" }}>
              <iframe
                src={EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Teatro Sesi Fiergs"
              />
              {/* Overlay with pink tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "hsl(318 100% 70% / 0.05)", mixBlendMode: "screen" }}
              />
              {/* Pin overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-white rounded-2xl px-4 py-3 flex items-center gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--pink))" }} />
                  <div>
                    <p className="font-sans text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      Teatro Sesi – Fiergs
                    </p>
                    <p className="font-sans text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Av. Assis Brasil, 8787 · Porto Alegre
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div
            ref={infoRef as React.RefObject<HTMLDivElement>}
            className={`reveal-right ${infoVisible ? "revealed" : ""} flex flex-col gap-5`}
          >
            {/* Venue name */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--pink) / 0.15)", border: "1px solid hsl(var(--pink) / 0.3)" }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "hsl(var(--pink))" }} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                    Teatro Sesi – Fiergs
                  </h3>
                  <p className="font-sans text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Av. Assis Brasil, 8787
                  </p>
                  <p className="font-sans text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Porto Alegre – RS, 91010-000
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            {[
              { label: "Data", value: "29 de Março de 2026 · Domingo" },
              { label: "Sessão de Fotos", value: "A partir das 12h" },
              { label: "Colação de Grau", value: "14h – Cerimônia oficial" },
              { label: "Traje", value: "Social / Formatura" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-white rounded-xl px-5 py-3 flex items-center justify-between"
              >
                <span className="font-sans text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {item.label}
                </span>
                <span className="font-sans text-sm font-medium text-right" style={{ color: "hsl(var(--foreground))" }}>
                  {item.value}
                </span>
              </div>
            ))}

            {/* CTA Button */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-2xl px-6 py-4 font-sans font-medium text-sm transition-all duration-300 hover:scale-[1.02] mt-2"
              style={{
                background: "var(--gradient-pink)",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--shadow-pink)",
              }}
            >
              <Navigation className="w-4 h-4" />
              Abrir no Google Maps
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
