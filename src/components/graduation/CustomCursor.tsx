import { useEffect, useRef } from "react";

interface TrailDot {
  el: HTMLDivElement;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailDot[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const TRAIL_COUNT = 8;
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(container);

    // Create trail dots
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const dot = document.createElement("div");
      const size = Math.max(4, 14 - i * 1.4);
      const alpha = (1 - i / TRAIL_COUNT) * 0.5;
      dot.style.cssText = `
        position:fixed;
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:hsl(318 100% 70% / ${alpha});
        pointer-events:none;
        transform:translate(-50%,-50%);
        transition:opacity 0.1s;
        will-change:transform;
      `;
      container.appendChild(dot);
      trailRef.current.push({ el: dot as HTMLDivElement, x: 0, y: 0 });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      }

      // Update trail positions with lag
      const trail = trailRef.current;
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
      }
      trail[0].x = e.clientX;
      trail[0].y = e.clientY;

      trail.forEach((dot) => {
        dot.el.style.left = `${dot.x}px`;
        dot.el.style.top = `${dot.y}px`;
      });
    };

    const animate = () => {
      if (followerRef.current) {
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12;
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (followerRef.current) followerRef.current.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (followerRef.current) followerRef.current.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      document.body.removeChild(container);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998]"
        style={{
          background: "hsl(318 100% 70%)",
          boxShadow: "0 0 10px hsl(318 100% 70% / 0.8)",
          transition: "transform 0.05s",
          opacity: 0,
        }}
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9997]"
        style={{
          border: "1.5px solid hsl(318 100% 70% / 0.5)",
          opacity: 0,
          transition: "transform 0.0s, opacity 0.3s",
        }}
      />
    </>
  );
};

export default CustomCursor;
