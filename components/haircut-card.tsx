import Image from "next/image";

interface HaircutCardProps {
  name: string;
  description: string;
  image: string;
}

export function HaircutCard({ name, description, image }: HaircutCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card border border-border transition-smooth hover:border-primary/50 hover-lift reveal-up">
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-2">{name}</h3>
        <p className="text-foreground/80 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
