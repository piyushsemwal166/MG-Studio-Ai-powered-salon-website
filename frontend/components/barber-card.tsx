import Image from "next/image";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BarberCardProps {
  id: number;
  name: string;
  title: string;
  specialty: string;
  bio?: string;
  image: string;
  isOwner?: boolean;
}

export function BarberCard({
  id,
  name,
  title,
  specialty,
  bio,
  image,
  isOwner,
}: BarberCardProps) {
  if (isOwner) {
    return (
      <div className="bg-card border border-primary/30 rounded-lg overflow-hidden reveal-up transition-smooth hover-lift">
        
        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          
          {/* IMAGE */}
          <div className="relative h-full min-h-[400px] md:min-h-[500px]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div className="p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest mb-2">
              <Scissors className="h-4 w-4" />
              <span>{title}</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              {name}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              {bio}
            </p>

            <p className="text-primary font-medium mb-6">
              Specialty: {specialty}
            </p>

            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href={`/portfolio/${id}`}>
                My Work
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // OTHER BARBERS
  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden transition-smooth hover:border-primary/50 hover-lift reveal-up flex flex-col">
      
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-foreground mb-1">
          {name}
        </h3>

        <p className="text-primary text-sm mb-2">{title}</p>

        <p className="text-muted-foreground text-sm mb-4 flex-grow">
          Specialty: {specialty}
        </p>

        <Button
          asChild
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/10"
        >
          <Link href={`/portfolio/${id}`}>
            My Work
          </Link>
        </Button>
      </div>
    </div>
  );
}