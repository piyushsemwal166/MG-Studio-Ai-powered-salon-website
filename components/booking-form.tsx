"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appointmentServices, barbers, timeSlots } from "@/lib/data";
import { CheckCircle, Calendar, User, Phone, Scissors, Clock } from "lucide-react";

export function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    barber: "",
    style: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.time) {
      newErrors.time = "Time slot is required";
    }
    
    if (!formData.barber) {
      newErrors.barber = "Please select a barber";
    }
    
    if (!formData.style) {
      newErrors.style = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-primary/30 rounded-lg p-12 text-center max-w-xl mx-auto reveal-up transition-smooth">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Thank you, {formData.name}! Your appointment has been scheduled for{" "}
          <span className="text-primary font-medium">{formData.date}</span> at{" "}
          <span className="text-primary font-medium">{formData.time}</span> with{" "}
          <span className="text-primary font-medium">
            {barbers.find((b) => b.id.toString() === formData.barber)?.name}
          </span>
          .
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          We will send a confirmation to your phone number.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              date: "",
              time: "",
              barber: "",
              style: "",
            });
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:-translate-y-0.5"
        >
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto reveal-up transition-smooth">
      <div className="grid gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
            <User className="h-4 w-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-input border-border focus:border-primary"
          />
          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-primary" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-input border-border focus:border-primary"
          />
          {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
        </div>

        {/* Date & Time */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-input border-border focus:border-primary"
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && <p className="text-destructive text-sm">{errors.date}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2 text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Time Slot
            </Label>
            <Select
              value={formData.time}
              onValueChange={(value) => setFormData({ ...formData, time: value })}
            >
              <SelectTrigger className="bg-input border-border focus:border-primary">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.time && <p className="text-destructive text-sm">{errors.time}</p>}
          </div>
        </div>

        {/* Barber & Style */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="barber" className="flex items-center gap-2 text-foreground">
              <User className="h-4 w-4 text-primary" />
              Select Barber
            </Label>
            <Select
              value={formData.barber}
              onValueChange={(value) => setFormData({ ...formData, barber: value })}
            >
              <SelectTrigger className="bg-input border-border focus:border-primary">
                <SelectValue placeholder="Choose barber" />
              </SelectTrigger>
              <SelectContent>
                {barbers.map((barber) => (
                  <SelectItem key={barber.id} value={barber.id.toString()}>
                    {barber.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.barber && <p className="text-destructive text-sm">{errors.barber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="style" className="flex items-center gap-2 text-foreground">
              <Scissors className="h-4 w-4 text-primary" />
              Service
            </Label>
            <Select
              value={formData.style}
              onValueChange={(value) => setFormData({ ...formData, style: value })}
            >
              <SelectTrigger className="bg-input border-border focus:border-primary">
                <SelectValue placeholder="Choose service" />
              </SelectTrigger>
              <SelectContent>
                {appointmentServices.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name} ({service.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.style && <p className="text-destructive text-sm">{errors.style}</p>}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4 h-12 text-lg font-medium transition-smooth hover:-translate-y-0.5"
        >
          Confirm Booking
        </Button>
      </div>
    </form>
  );
}
