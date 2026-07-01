import Image from "next/image";
import { Star, ShieldCheck, Trophy } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/feature/section-heading";
import { ValuesGrid } from "@/components/feature/values-grid";
import { BLUR_DATA_URL } from "@/lib/images";

export function WhyChooseUs() {
  return (
    <section className="pattern-dots-stars-sm bg-secondary/30 py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why ride with us"
              title="The desert operator Dubai trusts"
              subtitle="Eleven years, tens of thousands of riders, and a 100% safety record. We obsess over the details so you can lose yourself in the ride."
            />
            <div className="mt-8">
              <ValuesGrid />
            </div>
          </div>

          <Reveal className="relative hidden lg:block">
            {/* Soft ember glow behind the card for depth */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-ember-500/10 blur-2xl" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lifted)]">
              <Image
                src="/hero-1.png"
                alt="A guide leading riders across the dunes"
                fill
                sizes="(max-width: 1024px) 0px, 40vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/80 via-midnight-900/10 to-midnight-900/30" />

              {/* Floating rating badge */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-midnight-900/70 px-3 py-1.5 text-white backdrop-blur">
                <Star className="size-4 fill-ember-400 text-ember-400" />
                <span className="text-sm font-bold">4.9</span>
                <span className="text-xs text-white/70">· 1,500+ reviews</span>
              </div>

              {/* Floating award chip */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-ember)] px-3 py-1.5 text-xs font-bold text-white shadow-[var(--shadow-glow)]">
                <Trophy className="size-3.5" />
                Travellers' Choice
              </div>

              {/* Bottom glass card */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-midnight-900/70 p-4 text-white backdrop-blur">
                <p className="flex items-center gap-2 font-display text-lg font-bold">
                  <ShieldCheck className="size-5 text-ember-400" />
                  Certified · Insured · Award-winning
                </p>
                <p className="mt-1 text-sm text-white/75">
                  Eleven years and a 100% safety record across 20,000+ riders.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
