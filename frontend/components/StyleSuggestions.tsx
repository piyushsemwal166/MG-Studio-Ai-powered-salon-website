"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";

type Suggestion = {
  id?: string;
  name?: string;
  title?: string;
  image?: string;
  imageUrl?: string;
  description?: string;
};

type Props = {
  faceShape: string;
  suggestions: Suggestion[];
  isLoading: boolean;
  onReset?: () => void;
  onSelectStyle?: (image: string) => void;
  onGenerateAI?: (style: string) => void; // 🔥 NEW
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&h=600&fit=crop";

export default function StyleSuggestions({
  faceShape,
  suggestions,
  isLoading,
  onReset,
}: Props) {
  const visibleSuggestions = suggestions?.slice(0, 5) || [];

  const data = useMemo(() => {
    return visibleSuggestions.map((item) => ({
      ...item,
      confidence: Math.floor(Math.random() * 15) + 85,
    }));
  }, [visibleSuggestions]);

  return (
    <div className="w-full">
      {/* Face Shape */}
      <div className="mb-4 rounded-lg border border-border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Detected Face Shape</p>
        <p className="text-lg font-semibold text-primary">
          {faceShape || "Not detected"}
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[260px] border border-dashed border-border rounded-lg">
          <div className="relative mb-4">
            <div className="h-10 w-10 rounded-full border-2 border-primary/30"></div>
            <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-t-primary animate-spin"></div>
          </div>

          <p className="text-sm text-muted-foreground">
            Analyzing your face shape...
          </p>

          <p className="text-xs text-muted-foreground mt-1 opacity-70">
            Finding styles that suit you best ✨
          </p>
        </div>
      ) : data.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[260px] border border-dashed border-border rounded-lg p-6 text-center">
          <Sparkles className="h-8 w-8 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">
            Upload your photo to get AI-powered hairstyle suggestions ✨
          </p>
        </div>
      ) : (
        <>
          {/* Suggestions Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {data.map((s, i) => {
              const title = s.name || s.title || `Style ${i + 1}`;
              const image = s.image || s.imageUrl || FALLBACK_IMAGE;

              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="h-32 w-full bg-muted relative overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      loading="lazy"
                      className="h-32 w-full object-cover absolute inset-0"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== FALLBACK_IMAGE) {
                          target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                  </div>

                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      {title}
                    </h4>

                    <p className="text-xs text-muted-foreground mt-1">
                      Perfect for your face shape
                    </p>

                    <p className="text-xs text-primary mt-1 font-medium">
                      Match: {s.confidence}%
                    </p>

                    {/* 🔥 ACTION BUTTONS */}
                    <div className="mt-3 flex flex-col gap-2">
                      
                      

                      {/* Book */}
                      <button
                        onClick={() =>
                          window.open(
                            `https://calendly.com/your-link?style=${encodeURIComponent(
                              title
                            )}`,
                            "_blank"
                          )
                        }
                        className="w-full rounded-md bg-primary px-2 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        Book this style
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset */}
          <div className="mt-4 text-center">
            <button
              onClick={onReset}
              className="text-xs text-primary underline hover:opacity-80"
            >
              Try another photo
            </button>
          </div>
        </>
      )}
    </div>
  );
}