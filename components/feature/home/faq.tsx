import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/feature/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/company";
import { siteConfig } from "@/lib/site";

export function Faq() {
  return (
    <section className="py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
            subtitle="Everything you need before you ride. Still curious?"
          />
          <Reveal className="mt-4">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex text-sm font-semibold text-ember-600 hover:text-ember-700"
            >
              Talk to our team →
            </a>
          </Reveal>
        </div>

        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
