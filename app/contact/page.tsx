import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/feature/section-heading";
import { ContactForm } from "@/components/feature/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Desert Storm Adventure — book a ride, plan a private group, or ask us anything about the Dubai desert.",
  alternates: { canonical: "/contact" },
};

const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");

const CARDS = [
  { Icon: Phone, label: "Call us", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
  { Icon: MessageCircle, label: "WhatsApp", value: siteConfig.contact.phone, href: `https://wa.me/${whatsappNumber}` },
  { Icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30 pt-24 pb-10">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-600">
            Contact
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
            Let's plan your desert day
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Questions, private groups, corporate events or a custom itinerary — we
            usually reply within a couple of hours.
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr]">
        {/* Left — details */}
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map(({ Icon, label, value, href }) => (
              <Reveal key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lifted)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ember-50 text-ember-600">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">{label}</span>
                    <span className="block font-semibold">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ember-50 text-ember-600">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Base camp</span>
                  <span className="block font-semibold">Lahbab Desert, Dubai, UAE</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-4">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ember-50 text-ember-600">
                <Clock className="size-5" />
              </span>
              <div>
                <span className="block text-sm text-muted-foreground">Opening hours</span>
                <ul className="mt-1 space-y-0.5 text-sm">
                  <li className="flex justify-between gap-8"><span>Daily rides</span><span className="font-semibold">6:00 AM – 7:30 PM</span></li>
                  <li className="flex justify-between gap-8"><span>Office / support</span><span className="font-semibold">8:00 AM – 10:00 PM</span></li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <div>
          <SectionHeading title="Send us a message" subtitle="We'll get right back to you." />
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
