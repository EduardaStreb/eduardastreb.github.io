import { useEffect, useState } from "react";

// Target: March 29, 2026 at 12:00
const TARGET_DATE = new Date("2026-03-29T12:00:00-03:00");

interface TimeUnit {
  value: number;
  label: string;
}

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft([
          { value: 0, label: "Dias" },
          { value: 0, label: "Horas" },
          { value: 0, label: "Min" },
          { value: 0, label: "Seg" },
        ]);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft([
        { value: days, label: "Dias" },
        { value: hours, label: "Horas" },
        { value: minutes, label: "Min" },
        { value: seconds, label: "Seg" },
      ]);
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

interface CountdownTimerProps {
  className?: string;
}

export const CountdownTimer = ({ className = "" }: CountdownTimerProps) => {
  const timeLeft = useCountdown();

  if (timeLeft.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {timeLeft.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="text-center">
            <div
              className="glass rounded-xl w-14 h-14 flex items-center justify-center font-serif text-2xl font-bold tabular-nums"
              style={{ color: "hsl(var(--pink))" }}
            >
              {String(unit.value).padStart(2, "0")}
            </div>
            <p
              className="font-sans text-xs uppercase tracking-wider mt-1"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {unit.label}
            </p>
          </div>
          {i < timeLeft.length - 1 && (
            <span
              className="font-serif text-xl font-bold mb-4"
              style={{ color: "hsl(var(--pink) / 0.5)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
