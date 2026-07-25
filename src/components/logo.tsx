import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import mark from "@/assets/clio-mark-v2.png.asset.json";

export function Logo({
  className,
  showWordmark = true,
  size = 28,
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2", className)}>
      <img
        src={mark.url}
        alt="Clio"
        className="dark:invert object-contain transition-transform duration-300 group-hover:rotate-[-4deg]"
        style={{ height: size, width: "auto" }}
      />
      {showWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
          Clio
        </span>
      )}
    </Link>
  );
}
