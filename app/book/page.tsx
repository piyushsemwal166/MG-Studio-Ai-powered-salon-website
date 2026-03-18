import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Book Appointment | MG STUDIO",
  description: "Schedule your appointment at MG STUDIO. Book barbering and unisex salon services for ladies with your preferred time slot.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 border-b border-border reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary uppercase tracking-widest text-sm mb-4">Schedule Your Visit</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
            Book an Appointment
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
            Select your preferred barber, time slot, and service. We now offer unisex salon services for ladies in appointments too.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-8">
              {/* Location */}
              <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground">Location</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Kansapur Road<br />
                  Near Bal Bhawan School
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground">Contact</h3>
                </div>
                <p className="text-muted-foreground">9996715504</p>
              </div>

              {/* Hours */}
              <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground">Hours</h3>
                </div>
                <div className="text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-foreground">9AM - 7PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-foreground">9AM - 5PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 transition-smooth reveal-up reveal-delay-5">
                <p className="text-foreground text-sm leading-relaxed">
                  <strong className="text-primary">Note:</strong> Please arrive 5-10 minutes before 
                  your scheduled appointment. Late arrivals may result in shortened service time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
