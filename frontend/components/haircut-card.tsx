import Image from "next/image";

interface HaircutCardProps {
  name: string;
  description: string;
  image: string;
  rank?: number;
}

export function HaircutCard({ name, description, image, rank }: HaircutCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-primary/55 via-white/20 to-primary/45 transition-smooth hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)+6px)] border border-white/10 bg-card/95">
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 translate-x-0 group-hover:translate-x-[280%] transition-transform duration-1000" />
        </div>

        <div className="aspect-[4/5] relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[1deg]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

          <div className="absolute top-3 left-3 z-30 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[11px] text-white/90 backdrop-blur-md">
            Trending Look {rank ? `#${rank}` : ""}
          </div>

          <div className="absolute top-3 right-3 z-30 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_14px_rgba(193,144,61,0.95)] animate-pulse" />
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-30 rounded-xl border border-white/15 bg-black/45 p-4 backdrop-blur-md transition-smooth group-hover:border-primary/40">
          <h3 className="text-xl font-serif font-bold text-primary mb-2">{name}</h3>
          <p className="text-foreground/85 text-sm leading-relaxed line-clamp-2">{description}</p>
          <p className="text-[11px] uppercase tracking-wider text-white/70 mt-3">Ask for this style in-store</p>
        </div>
      </div>
    </div>
  );
}
