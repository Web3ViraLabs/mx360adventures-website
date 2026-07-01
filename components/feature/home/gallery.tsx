import Image from "next/image";
import { Camera } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/feature/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { unsplash, GALLERY, BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * "Moments in the dunes" — a masonry-ish mosaic with hover zoom + a glint
 * caption. Purely joyful eye-candy that sells the experience.
 */
export function Gallery() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Moments in the dunes"
          title="Real days. Real dust. Real grins."
          subtitle="A glimpse of what your desert day looks like."
          className="mb-12"
        />

        <RevealGroup className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
          {GALLERY.map((img) => (
            <RevealItem
              key={img.id + img.alt}
              className={cn("group relative overflow-hidden rounded-2xl", img.tall && "row-span-2")}
            >
              <Image
                src={unsplash(img.id, 800, 72)}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center gap-1.5 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Camera className="size-3.5" />
                {img.alt}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
