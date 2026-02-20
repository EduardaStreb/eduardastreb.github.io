import { useState } from "react";
import CustomCursor from "@/components/graduation/CustomCursor";
import HeroSection from "@/components/graduation/HeroSection";
import EventCards from "@/components/graduation/EventCards";
import LocationSection from "@/components/graduation/LocationSection";
import GallerySection from "@/components/graduation/GallerySection";
import FooterSection from "@/components/graduation/FooterSection";
import RSVPModal from "@/components/graduation/RSVPModal";
import { CountdownTimer } from "@/components/graduation/CountdownTimer";
import { Heart } from "lucide-react";

const Index = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Custom cursor (desktop only) */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Hero */}
      <HeroSection />

      {/* Events */}
      <EventCards />

      {/* Gallery */}
      <GallerySection />

      {/* Location */}
      <LocationSection />

      {/* Countdown + RSVP Banner */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-3xl p-10" style={{ boxShadow: "var(--shadow-pink)" }}>
            <p
              className="font-sans text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "hsl(var(--pink))" }}
            >
              Contagem Regressiva
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>
              O grande dia está <span className="text-gradient-pink italic">chegando!</span>
            </h2>

            <div className="flex justify-center mb-8">
              <CountdownTimer />
            </div>

            <p className="font-sans text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              Confirme sua presença até <strong style={{ color: "hsl(var(--pink))" }}>20 de Março de 2026</strong>
            </p>

            <button
              onClick={() => setIsRSVPOpen(true)}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl px-10 py-4 font-sans font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-pink"
              style={{
                background: "var(--gradient-pink)",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--shadow-pink)",
              }}
            >
              <Heart className="w-5 h-5 group-hover:scale-125 transition-transform" />
              Confirmar Presença
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />

      {/* Floating RSVP button */}
      <button
        onClick={() => setIsRSVPOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5 rounded-full px-6 py-3.5 font-sans font-semibold text-sm transition-all duration-300 hover:scale-105 animate-pulse-pink md:flex"
        style={{
          background: "var(--gradient-pink)",
          color: "hsl(var(--primary-foreground))",
          boxShadow: "var(--shadow-pink)",
        }}
      >
        <Heart className="w-4 h-4" />
        <span className="hidden sm:block">Confirmar Presença</span>
        <span className="sm:hidden">RSVP</span>
      </button>

      {/* RSVP Modal */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
};

export default Index;
