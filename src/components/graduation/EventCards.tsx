import { useScrollReveal } from "@/hooks/useScrollReveal";
import grad2 from "@/assets/grad-2.jpg";
import grad3 from "@/assets/grad-3.jpg";

const events = [
  {
    title: "Sessão de Fotos",
    subtitle: "Registros Eternos",
    time: "12h00",
    description:
      "Momento especial para eternizar esta conquista ao lado das pessoas mais queridas.",
    icon: "📸",
    photo: grad2,
    detail: "Chegada antecipada recomendada",
  },
  {
    title: "Colação de Grau",
    subtitle: "A Grande Conquista",
    time: "14h00",
    description:
      "A cerimônia oficial de conclusão do curso de Design Gráfico na UniRitter.",
    icon: "🎓",
    photo: grad3,
    detail: "Cerimônia oficial · Traje formal",
  },
];

const EventCards = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] opacity-30"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--pink)), transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal ${titleVisible ? "revealed" : ""}`}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "hsl(var(--pink))" }}
          >
            Programação do Dia
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
            29 de Março de{" "}
            <span className="text-gradient-pink italic">2026</span>
          </h2>
          <p className="font-sans mt-4 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
            Teatro Sesi – Fiergs · Av. Assis Brasil, 8787 · Porto Alegre
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface EventCardProps {
  event: (typeof events)[0];
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
        index === 0 ? "reveal-left" : "reveal-right"
      } ${isVisible ? "revealed" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Photo background */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={event.photo}
          alt={event.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, hsl(0 0% 4%) 0%, hsl(0 0% 4% / 0.3) 60%, transparent 100%)",
          }}
        />
        {/* Pink tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "hsl(318 100% 70% / 0.1)" }}
        />

        {/* Time badge */}
        <div className="absolute top-5 right-5">
          <div className="glass rounded-full px-4 py-1.5 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "hsl(var(--pink))" }}
            />
            <span className="font-serif text-lg font-bold" style={{ color: "hsl(var(--pink))" }}>
              {event.time}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="absolute top-5 left-5 text-2xl">{event.icon}</div>
      </div>

      {/* Content */}
      <div
        className="glass p-6 transition-all duration-500 group-hover:bg-opacity-20"
        style={{ borderTop: "1px solid hsl(var(--glass-border))" }}
      >
        <p
          className="font-sans text-xs uppercase tracking-widest mb-1 transition-colors duration-300"
          style={{ color: "hsl(var(--pink))" }}
        >
          {event.subtitle}
        </p>
        <h3
          className="font-serif text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-gradient-pink"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {event.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
          {event.description}
        </p>
        <div
          className="flex items-center gap-2 text-xs font-sans"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <div
            className="w-6 h-px"
            style={{ background: "hsl(var(--pink))" }}
          />
          {event.detail}
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px hsl(318 100% 70% / 0.4), 0 0 30px hsl(318 100% 70% / 0.15)" }}
      />
    </div>
  );
};

export default EventCards;
