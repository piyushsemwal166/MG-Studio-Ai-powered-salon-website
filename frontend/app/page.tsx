import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HaircutCard } from "@/components/haircut-card";
import { haircutStyles, ladiesSalonServices, academyTuitionClasses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scissors, Award, Clock, Star } from "lucide-react";
import HairAnalyzer from "@/components/HairAnalyzer";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-16 sm:pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop"
            alt="Barber shop interior"
            fill
            className="object-cover opacity-12 blur-[1px] scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/88 via-background/72 to-background" />
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-muted/45 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left reveal-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-background/55 px-4 py-2 text-sm text-white/85 reveal-up reveal-delay-1">
                <Scissors className="h-4 w-4 text-primary" />
                Premium Hair Salon And Grooming Studio
              </div>

              <div className="flex justify-center lg:justify-start mt-6 mb-4 reveal-up reveal-delay-1">
                <Image
                  src="/logo.png"
                  alt="MG STUDIO Logo"
                  width={132}
                  height={132}
                  className="object-contain w-24 h-24 sm:w-28 sm:h-28"
                  priority
                  loading="eager"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-bright mb-5 sm:mb-6 leading-tight reveal-up reveal-delay-2">
                MG STUDIO
                <br />
                <span className="text-primary">Hair Salon</span> Experience
              </h1>

              <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed reveal-up reveal-delay-3">
                Signature haircuts, beard styling, texture treatments and complete salon care with a premium in-chair experience.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 reveal-up reveal-delay-3">
                <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs sm:text-sm text-white/85">Haircuts</span>
                <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs sm:text-sm text-white/85">Beard Styling</span>
                <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs sm:text-sm text-white/85">Hair Spa</span>
                <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs sm:text-sm text-white/85">Color & Texture</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 reveal-up reveal-delay-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium transition-smooth hover:-translate-y-0.5"
                >
                  <Link href="/book">
                    Book Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/50 text-foreground hover:bg-primary/10 w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg transition-smooth hover:-translate-y-0.5"
                >
                  <Link href="/team">Meet Our Team</Link>
                </Button>
              </div>
            </div>

            <div className="relative reveal-up reveal-delay-2 w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] mx-auto lg:mx-0">
              <div className="absolute -top-4 left-2 sm:left-3 z-20 rounded-full border border-primary/30 bg-background/70 px-3 py-1 text-xs sm:text-sm text-white/85 backdrop-blur">
                Owner: Mohit
              </div>

              <div className="salon-animated-border relative overflow-hidden rounded-3xl p-[1.5px] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)+6px)] bg-card/70 p-3 sm:p-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="/1773835017380.png"
                    alt="Mohit - Salon owner"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 23rem, 92vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/45 p-3 sm:p-4 backdrop-blur-md">
                  <p className="text-white text-base sm:text-lg font-semibold">Mohit</p>
                  <p className="text-white/90 text-sm">Founder & Master Stylist</p>
                  <p className="text-white/80 text-sm mt-1">Crafting confidence through precision cuts and salon artistry.</p>
                </div>
              </div>
              </div>

              <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-6 rounded-2xl border border-primary/30 bg-background/80 p-3 sm:p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Star className="h-4 w-4 fill-primary" />
                  <Star className="h-4 w-4 fill-primary" />
                  <Star className="h-4 w-4 fill-primary" />
                  <Star className="h-4 w-4 fill-primary" />
                  <Star className="h-4 w-4 fill-primary" />
                </div>
                <p className="text-xs sm:text-sm text-white/85">10+ Years Of Salon Experience</p>
              </div>

              <div className="absolute top-3 right-3 sm:right-5 rounded-full border border-primary/35 bg-background/70 p-2 backdrop-blur-md">
                <Scissors className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-white/70 reveal-up reveal-delay-5">
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-primary" />
              Professional Tools
            </div>
            <span className="hidden sm:inline text-white/30">|</span>
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-primary" />
              Hygienic Setup
            </div>
            <span className="hidden sm:inline text-white/30">|</span>
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-primary" />
              Salon Vibe
            </div>
          </div>
        </div>
      </section>
{/* AI Hairstyle Analyzer */}
<section className="py-14 sm:py-20 border-t border-border bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Heading */}
    <div className="text-center mb-12">
      <p className="text-primary uppercase tracking-widest text-sm mb-4">
        AI Feature
      </p>
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bright mb-4">
        Try AI Hairstyle Analyzer
      </h2>
      <p className="text-white/75 max-w-2xl mx-auto">
        Upload your photo and discover hairstyles that suit your face shape instantly.
      </p>
    </div>

    {/* Component */}
    <div className="max-w-5xl mx-auto">
      <HairAnalyzer />
    </div>

  </div>
</section>
      {/* Features Section */}
      <section className="py-20 border-t border-border reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-lg border border-border hover-lift transition-smooth">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 feature-icon-shell feature-icon-shell-1">
                <span className="feature-icon-ring" aria-hidden="true" />
                <span className="feature-icon-spark feature-icon-spark-1" aria-hidden="true" />
                <Scissors className="h-8 w-8 text-primary feature-icon-animate-scissors" />
              </div>
              <h3 className="text-xl font-serif font-bold text-bright mb-3">Expert Barbers</h3>
              <p className="text-white/70 leading-relaxed">
                Our skilled team brings years of experience and precision to every cut.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover-lift transition-smooth reveal-up reveal-delay-1">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 feature-icon-shell feature-icon-shell-2">
                <span className="feature-icon-ring" aria-hidden="true" />
                <span className="feature-icon-spark feature-icon-spark-2" aria-hidden="true" />
                <Award className="h-8 w-8 text-primary feature-icon-animate-award" />
              </div>
              <h3 className="text-xl font-serif font-bold text-bright mb-3">Premium Quality</h3>
              <p className="text-white/70 leading-relaxed">
                We use only the finest products and tools for exceptional results.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover-lift transition-smooth reveal-up reveal-delay-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 feature-icon-shell feature-icon-shell-3">
                <span className="feature-icon-ring" aria-hidden="true" />
                <span className="feature-icon-spark feature-icon-spark-3" aria-hidden="true" />
                <Clock className="h-8 w-8 text-primary feature-icon-animate-clock" />
              </div>
              <h3 className="text-xl font-serif font-bold text-bright mb-3">Easy Booking</h3>
              <p className="text-white/70 leading-relaxed">
                Schedule your appointment online anytime, hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Styles Section */}
      <section className="relative py-20 border-t border-border overflow-hidden reveal-up reveal-delay-1">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-56 w-[70%] rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute bottom-0 -left-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/3 -right-16 h-48 w-48 rounded-full bg-muted/45 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14 reveal-up reveal-delay-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-card/70 px-4 py-2 text-xs sm:text-sm text-white/85 mb-5">
              <Scissors className="h-4 w-4 text-primary" />
              Style Gallery
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bright mb-4 leading-tight">
              Trending Styles
              <br />
              Crafted In Our Chairs
            </h2>

            <p className="text-white/75 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              A bold collection of modern fades, textured cuts and signature looks tailored by our artists. Pick your next look and walk in with confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {haircutStyles.map((style, index) => (
              <div
                key={style.id}
                className={`reveal-up ${index % 3 === 1 ? "reveal-delay-1" : index % 3 === 2 ? "reveal-delay-2" : ""}`}
              >
                <HaircutCard
                  name={style.name}
                  description={style.description}
                  image={style.image}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal-up reveal-delay-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:-translate-y-0.5"
            >
              <Link href="/book">
                Book Your Style
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Unisex Salon For Ladies Section */}
      <section className="relative py-14 sm:py-20 border-t border-border overflow-hidden reveal-up reveal-delay-2">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 left-10 h-40 w-40 rounded-full bg-primary/12 blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-0 h-56 w-56 rounded-full bg-primary/8 blur-3xl animate-pulse" />
          <div className="absolute -bottom-14 left-1/3 h-44 w-44 rounded-full bg-muted/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14 reveal-up reveal-delay-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-card/75 px-4 py-2 text-xs sm:text-sm text-white/85 mb-4">
              <Star className="h-4 w-4 text-primary" />
              Unisex Salon For Ladies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
              Beauty Care,
              <span className="text-white"> Styled To Perfection</span>
            </h2>
            <p className="text-white/75 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              From smooth hair finishes to skin glow and nail artistry, enjoy complete salon care in a premium, comfortable studio atmosphere.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
            <div className="lg:col-span-4 reveal-up reveal-delay-1">
              <div className="group relative h-full min-h-[280px] sm:min-h-[320px] overflow-hidden rounded-2xl border border-primary/30 bg-card/60 p-[1px]">
                <div className="relative h-full rounded-[calc(var(--radius-xl)+4px)] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=1200&fit=crop"
                    alt="Ladies salon services"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 70vw, 94vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/45 p-4 backdrop-blur-md">
                    <p className="text-primary text-sm font-medium mb-1">Premium Ladies Lounge</p>
                    <p className="text-white text-sm leading-relaxed">Hair, skin and nail specialists focused on modern salon results.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {ladiesSalonServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`group relative overflow-hidden rounded-xl border border-border/80 bg-card/80 p-5 sm:p-6 transition-smooth hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_12px_40px_rgba(193,144,61,0.16)] reveal-up ${index % 3 === 1 ? "reveal-delay-1" : index % 3 === 2 ? "reveal-delay-2" : ""}`}
                >
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-smooth group-hover:bg-primary/20" />
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary animate-pulse" />

                  <div className="relative z-10">
                    <p className="text-[11px] uppercase tracking-widest text-white/55 mb-2">Ladies Care</p>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-bright mb-3">{service.name}</h3>
                    <p className="text-white/70 leading-relaxed text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academy Training Section */}
      <section className="relative py-20 border-t border-border bg-card overflow-hidden reveal-up reveal-delay-2">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-1/4 h-48 w-48 rounded-full bg-primary/14 blur-3xl" />
          <div className="absolute top-1/2 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-16 right-10 h-44 w-44 rounded-full bg-muted/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14 reveal-up reveal-delay-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-background/70 px-4 py-2 text-xs sm:text-sm text-white/85 mb-4">
              <Award className="h-4 w-4 text-primary" />
              MG Studio Academy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
              Tuition Classes For
              <span className="text-white"> Future Stylists</span>
            </h2>
            <p className="text-white/75 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              Build professional salon confidence with hands-on sessions, real-chair guidance and practical techniques from our experienced training team.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
            <div className="lg:col-span-5 reveal-up reveal-delay-1">
              <div className="group relative h-full min-h-[280px] sm:min-h-[330px] overflow-hidden rounded-2xl border border-primary/30 bg-background/70 p-[1px]">
                <div className="relative h-full rounded-[calc(var(--radius-xl)+4px)] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=1100&h=1300&fit=crop"
                    alt="Academy barber training"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 70vw, 94vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                  <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                    Chair-Side Practical Training
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/45 p-4 backdrop-blur-md">
                    <p className="text-primary text-sm font-medium mb-1">Academy Mentorship</p>
                    <p className="text-white text-sm leading-relaxed">Learn modern cuts, fade blending, beard design, and salon workflow with guided step-by-step sessions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
              {academyTuitionClasses.map((course, index) => (
                <div
                  key={course.id}
                  className={`group relative overflow-hidden rounded-xl border border-border/80 bg-background/85 p-5 sm:p-6 transition-smooth hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_14px_40px_rgba(193,144,61,0.16)] reveal-up ${index % 2 === 1 ? "reveal-delay-1" : ""}`}
                >
                  <div className="absolute -top-12 -right-8 h-24 w-24 rounded-full bg-primary/12 blur-2xl transition-smooth group-hover:bg-primary/22" />
                  <div className="absolute top-4 right-4 text-primary/65 text-xs font-medium">Module {index + 1}</div>

                  <div className="relative z-10">
                    <p className="text-[11px] uppercase tracking-widest text-white/55 mb-2">Academy Course</p>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-bright mb-3">{course.name}</h3>
                    <p className="text-white/70 leading-relaxed text-sm">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 border-t border-border overflow-hidden reveal-up reveal-delay-2">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(193,144,61,0.22),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(193,144,61,0.16),transparent_42%)]" />
          <div className="absolute -top-20 -left-10 h-56 w-56 rounded-full bg-primary/14 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/30 bg-card/65 backdrop-blur-md px-5 sm:px-10 py-10 sm:py-14 text-center shadow-[0_20px_90px_rgba(0,0,0,0.35)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-background/70 px-4 py-2 text-xs sm:text-sm text-white/85 mb-6">
              <Star className="h-4 w-4 text-primary" />
              Premium Grooming Starts Here
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bright mb-5 leading-tight">
              Ready For Your Next
              <span className="text-primary"> Signature Look</span>?
            </h2>

            <p className="text-white/75 text-sm sm:text-lg mb-7 sm:mb-9 leading-relaxed max-w-3xl mx-auto">
              Step into MG STUDIO for modern cuts, beard shaping and complete salon care with expert attention in every detail.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              <span className="rounded-full border border-primary/25 bg-background/65 px-3 py-1 text-xs sm:text-sm text-white/85">10+ Years Experience</span>
              <span className="rounded-full border border-primary/25 bg-background/65 px-3 py-1 text-xs sm:text-sm text-white/85">Easy Online Booking</span>
              <span className="rounded-full border border-primary/25 bg-background/65 px-3 py-1 text-xs sm:text-sm text-white/85">Premium Tools & Care</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-7 sm:px-10 h-12 sm:h-14 text-base sm:text-lg font-medium transition-smooth hover:-translate-y-0.5"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/45 text-white hover:bg-primary/12 w-full sm:w-auto px-7 sm:px-10 h-12 sm:h-14 text-base sm:text-lg transition-smooth hover:-translate-y-0.5"
              >
                <Link href="/team">Talk To Our Stylists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
