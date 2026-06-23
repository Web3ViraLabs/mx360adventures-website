import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

const DOCS = {
  terms: {
    title: "Terms & Conditions",
    intro:
      "These terms govern your booking and participation in activities operated by Desert Storm Adventure.",
    sections: [
      ["Bookings & payment", "All bookings are subject to availability and confirmed on full payment. Prices are shown in AED and include 5% VAT."],
      ["Rescheduling & cancellation", "Free rescheduling is available up to 24 hours before your slot. Cancellations within 24 hours are non-refundable."],
      ["Safety & eligibility", "Participants must follow all guide instructions and meet the stated difficulty and age requirements. Riders must declare relevant medical conditions."],
      ["Liability", "Desert adventure activities carry inherent risk. By booking you accept these risks and agree to our on-site waiver."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "We respect your privacy and only collect what we need to fulfil your booking.",
    sections: [
      ["What we collect", "Your name, email and phone number for booking confirmation, and payment details processed securely by Stripe (we never store card data)."],
      ["How we use it", "To confirm and manage your booking, arrange pickup, and send relevant updates. We do not sell your data."],
      ["Your rights", "You may request access to or deletion of your personal data at any time by contacting us."],
      ["Contact", `Questions? Email ${siteConfig.contact.email}.`],
    ],
  },
} as const;

type Doc = keyof typeof DOCS;

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const found = DOCS[doc as Doc];
  if (!found) return {};
  return { title: found.title, robots: { index: true, follow: true } };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const content = DOCS[doc as Doc];
  if (!content) notFound();

  return (
    <Container className="max-w-3xl pt-24 pb-20">
      <h1 className="font-display text-4xl font-extrabold">{content.title}</h1>
      <p className="mt-3 text-muted-foreground">{content.intro}</p>
      <div className="mt-10 space-y-8">
        {content.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="font-display text-xl font-bold">{heading}</h2>
            <p className="mt-2 leading-relaxed text-foreground/90">{body}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        Placeholder legal copy — replace with reviewed terms before launch.
      </p>
    </Container>
  );
}
