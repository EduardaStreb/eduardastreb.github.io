import { useEffect, useRef, useState } from "react";
import grad4 from "@/assets/grad-4.jpg";

const HeroSection = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setNameVisible(true), 400);
    const t2 = setTimeout(() => setSubtitleVisible(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        // Reduzido o fator de parallax para evitar cortes na imagem ao subir
        setParallaxY(scrolled * 0.2);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background photo - Ajustada para melhor enquadramento */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ 
          transform: `translateY(${parallaxY}px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <img
          src={grad4}
          alt="Eduarda Streb Gonçalves — Formatura"
          className="w-full h-full object-cover object-[50%_20%]" // Center para focar no rosto
          style={{ filter: "brightness(0.25) saturate(0.9)" }}
        />

        {/* Overlay para legibilidade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 20%, hsl(0 0% 4% / 0.4) 60%, hsl(0 0% 4%) 100%)"
          }}
        />
      </div>

      <Particles />

      {/* Decorative pink line */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24 opacity-60"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--pink)))" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-white mb-8 text-xs font-sans font-medium tracking-[0.2em] uppercase"
          style={{
            color: "hsl(var(--pink))",
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "hsl(var(--pink))" }}
          />
          Colação de Grau · Design Gráfico
        </div>

        {/* Main name */}
        <div className="overflow-hidden mb-3">
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
            style={{
              opacity: nameVisible ? 1 : 0,
              clipPath: nameVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transform: nameVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <span className="text-gradient-pink">Eduarda</span>
          </h1>
        </div>
        <div className="overflow-hidden mb-2">
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
            style={{
              color: "hsl(var(--foreground))",
              opacity: nameVisible ? 1 : 0,
              clipPath: nameVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transform: nameVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
            }}
          >
            Streb Gonçalves
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
          }}
        >
          <p
            className="font-sans text-base md:text-lg mt-6 mb-2 tracking-widest uppercase"
            style={{ color: "hsl(var(--muted-foreground))", letterSpacing: "0.25em" }}
          >
            convida para a sua
          </p>
          <p
            className="font-serif italic text-2xl md:text-3xl"
            style={{ color: "hsl(var(--pink-glow))" }}
          >
            Cerimônia de Formatura
          </p>
        </div>

        {/* Date pill */}
        <div
          className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s"
          }}
        >
          <div className="glass rounded-full px-8 py-3 flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-gradient-pink">29</span>
            <div className="text-left">
              <p className="font-sans text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
                de Março de
              </p>
              <p className="font-sans text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                2026 · Porto Alegre
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{
            opacity: subtitleVisible ? 0.6 : 0,
            transition: "opacity 0.8s 1.2s"
          }}
        >
          <span
            className="font-sans text-xs uppercase tracking-widest"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            role para baixo
          </span>
          <div
            className="w-px h-12 animate-float"
            style={{ background: "linear-gradient(to bottom, hsl(var(--pink)), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
};

const Particles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 8 + 8
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            background: "hsl(318 100% 70% / 0.7)",
            boxShadow: "0 0 6px hsl(318 100% 70% / 0.5)",
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default HeroSection;