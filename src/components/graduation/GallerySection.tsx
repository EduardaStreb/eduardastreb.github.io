import { useScrollReveal } from "@/hooks/useScrollReveal";
import grad1 from "@/assets/grad-1.jpg";
import grad2 from "@/assets/grad-2.jpg";
import grad3 from "@/assets/grad-3.jpg";
import grad4 from "@/assets/grad-4.jpg";
import grad5 from "@/assets/grad-5.jpg";

const photos = [
  { src: grad4, alt: "Eduarda com diploma", span: "row-span-2" },
  { src: grad1, alt: "Eduarda formanda", span: "" },
  { src: grad3, alt: "Eduarda com capelo", span: "" },
  { src: grad2, alt: "Eduarda sorrindo", span: "" },
  { src: grad5, alt: "Eduarda linda", span: "" },
];

const GallerySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Pink orb */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "hsl(var(--pink))" }}
      />

      <div className="max-w-5xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 reveal ${titleVisible ? "revealed" : ""}`}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "hsl(var(--pink))" }}
          >
            Galeria
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
            Momentos{" "}
            <span className="text-gradient-pink italic">Eternos</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridTemplateRows: "auto" }}>
          {photos.map((photo, i) => (
            <PhotoCard key={photo.alt} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PhotoCardProps {
  photo: { src: string; alt: string; span: string };
  index: number;
}

const PhotoCard = ({ photo, index }: PhotoCardProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative rounded-2xl overflow-hidden reveal-scale ${isVisible ? "revealed" : ""} ${photo.span}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        aspectRatio: photo.span === "row-span-2" ? "auto" : "3/4",
        minHeight: photo.span === "row-span-2" ? "400px" : "220px",
      }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "brightness(0.85) saturate(0.9)" }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "hsl(318 100% 70% / 0.1)" }}
      />
      {/* Hover border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px hsl(318 100% 70% / 0.5)" }}
      />
    </div>
  );
};

export default GallerySection;
