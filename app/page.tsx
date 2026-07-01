import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllExperiences, getFeaturedExperiences } from "@/db/queries";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Hero } from "@/components/feature/home/hero";
import { TrustBar } from "@/components/feature/home/trust-bar";
import { PartnersStrip } from "@/components/feature/home/partners-strip";
import { FeaturedRail } from "@/components/feature/home/featured-rail";
import { HowItWorks } from "@/components/feature/home/how-it-works";
import { CategoriesGrid } from "@/components/feature/home/categories-grid";
import { Interstitial } from "@/components/feature/home/interstitial";
import { WhyChooseUs } from "@/components/feature/home/why-choose-us";
import { StatsBand } from "@/components/feature/home/stats-band";
import { Gallery } from "@/components/feature/home/gallery";
import { SocialProof } from "@/components/feature/home/social-proof";
import { Faq } from "@/components/feature/home/faq";

export default async function HomePage() {
  const [featured, all] = await Promise.all([
    getFeaturedExperiences(),
    getAllExperiences(),
  ]);
  // Fall back to first few if nothing is flagged featured.
  const rail = featured.length ? featured : all.slice(0, 4);

  return (
    <>
      <Hero />
      <TrustBar />
      <PartnersStrip />
      <FeaturedRail experiences={rail} />
      <HowItWorks />
      <CategoriesGrid />
      <Interstitial />
      <WhyChooseUs />
      <StatsBand />
      <Gallery />
      <SocialProof />
      <Faq />

      {/* Closing CTA band */}
      <section className="dark relative overflow-hidden bg-[image:var(--gradient-dusk)] py-20 text-foreground">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-extrabold sm:text-5xl">
              The desert is waiting. Pick your slot.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Instant confirmation, free rescheduling, and the best-kept fleet in the dunes.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="h-13 px-8 text-base shadow-[var(--shadow-glow)]">
                <Link href="/adventures">
                  Browse all adventures <ArrowRight className="ml-1 size-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
