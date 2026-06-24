import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/feature/section-heading";
import { ValuesGrid } from "@/components/feature/values-grid";
import { unsplash, PHOTOS, BLUR_DATA_URL } from "@/lib/images";

export function WhyChooseUs() {
  return (
    <section className="bg-secondary/30 py-20">
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lifted)]">
              <Image
                src={unsplash(PHOTOS.dunesSunset, 1000, 75)}
                alt="A guide leading riders across the dunes at sunset"
                fill
                sizes="(max-width: 1024px) 0px, 40vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-midnight-900/70 p-4 text-white backdrop-blur">
                <p className="font-display text-lg font-bold">Certified · Insured · Award-winning</p>
                <p className="mt-0.5 text-sm text-white/75">
                  Travellers' Choice winner, four years running.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
