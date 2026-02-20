import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, GraduationCap } from "lucide-react";

const FooterSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative py-20 px-6 text-center overflow-hidden reveal ${isVisible ? "revealed" : ""}`}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--pink)), transparent)" }}
      />

      {/* Pink orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-3xl opacity-10 pointer-events-none"
        style={{ background: "hsl(var(--pink))" }}
      />

      <div className="relative max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-6 animate-float">
          <GraduationCap className="w-8 h-8" style={{ color: "hsl(var(--pink))" }} />
        </div>

        <p className="font-sans text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "hsl(var(--pink))" }}>
          UniRitter · 2026
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "hsl(var(--foreground))" }}>
          Eduarda Streb Gonçalves
        </h2>
        <p className="font-serif italic text-lg mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
          Bacharel em Design Gráfico
        </p>

        <div
          className="h-px w-16 mx-auto my-6"
          style={{ background: "hsl(var(--pink) / 0.5)" }}
        />

        <p className="font-sans text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
          "O design não é apenas o que parece e o que se sente.
          <br />
          <span className="italic">O design é como funciona."</span>
        </p>
        <p className="font-sans text-xs mt-2" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
          — Steve Jobs
        </p>

        <div className="flex items-center justify-center gap-2 mt-10 font-sans text-xs" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
          Feito com
          <Heart className="w-3 h-3" style={{ color: "hsl(var(--pink))" }} fill="hsl(var(--pink))" />
          para uma designer incrível
        </div>
                <div className="flex items-center justify-center gap-2 mt-10 font-sans text-xs" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
          Guilherme Cardoso
          <Heart className="w-3 h-3" style={{ color: "hsl(var(--pink))" }} fill="hsl(var(--pink))" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
