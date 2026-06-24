import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { team } from "@/lib/company";

export function TeamGrid() {
  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((member) => (
        <RevealItem key={member.name}>
          <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lifted)]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={unsplash(member.photo, 600, 75)}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/50 to-transparent" />
            </div>
            <figcaption className="p-4">
              <h3 className="font-display text-base font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-ember-600">{member.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
            </figcaption>
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
