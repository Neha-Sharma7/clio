import { cn } from "@/lib/utils";
import { participants as allParticipants, type Participant } from "@/lib/mock";

export function Avatar({ p, size = 32, className }: { p: Participant; size?: number; className?: string }) {
  const initials = p.name.split(" ").map(n => n[0]).slice(0, 2).join("");
  return (
    <span
      className={cn("inline-grid place-items-center rounded-full font-medium text-white", className)}
      style={{
        width: size, height: size,
        backgroundColor: p.avatarColor,
        fontSize: Math.round(size * 0.38),
      }}
      title={p.name}
    >
      {initials}
    </span>
  );
}

export function AvatarStack({ ids, max = 4, size = 26 }: { ids: string[]; max?: number; size?: number }) {
  const shown = ids.slice(0, max);
  const rest = ids.length - shown.length;
  return (
    <div className="flex -space-x-2">
      {shown.map(id => {
        const p = allParticipants.find(x => x.id === id);
        if (!p) return null;
        return (
          <span key={id} className="ring-2 ring-card rounded-full">
            <Avatar p={p} size={size} />
          </span>
        );
      })}
      {rest > 0 && (
        <span
          className="grid place-items-center rounded-full bg-muted text-[10px] font-medium ring-2 ring-card text-foreground"
          style={{ width: size, height: size }}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}
