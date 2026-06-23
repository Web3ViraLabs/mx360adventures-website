import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ExperienceCard } from "@/components/feature/experience-card";
import type { CatalogExperience } from "@/lib/catalog";

export function AdventuresGrid({ experiences }: { experiences: CatalogExperience[] }) {
  if (!experiences.length) {
    return (
      <Container className="py-16 text-center text-muted-foreground">
        No adventures here yet — check back soon.
      </Container>
    );
  }
  return (
    <Container className="py-10">
      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((e, i) => (
          <RevealItem key={e.id}>
            <ExperienceCard experience={e} priority={i < 3} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Container>
  );
}
