import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, Star } from "lucide-react";
import { InstagramIcon, YoutubeIcon, TiktokIcon } from "@/components/icons/socials";
import { categories, siteConfig } from "@/lib/site";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="dark border-t border-border bg-midnight-900 text-foreground">
      {/* Newsletter / top CTA strip */}
      <div className="border-b border-border">
        <Container className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold">Get desert-ready deals</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Seasonal offers, new experiences and golden-hour tips. No spam — just sand.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2" action={`mailto:${siteConfig.contact.email}`} method="post">
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-11 flex-1 rounded-full border border-border bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-[image:var(--gradient-ember)] px-5 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-[filter] hover:brightness-105"
            >
              Subscribe
            </button>
          </form>
        </Container>
      </div>

      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[image:var(--gradient-ember)] text-sm text-white">
              DS
            </span>
            {siteConfig.shortName}
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{siteConfig.description}</p>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2 text-sm">
            <Star className="size-4 fill-ember-400 text-ember-400" />
            <span className="font-semibold">4.9 / 5</span>
            <span className="text-muted-foreground">· 1,500+ verified reviews</span>
          </div>

          <div className="mt-4 flex gap-3">
            {[
              { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: siteConfig.social.tiktok, label: "TikTok", Icon: TiktokIcon },
              { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-10 place-items-center rounded-full border border-border text-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Adventures
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/adventures/${c.slug}`} className="text-foreground/80 transition-colors hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-foreground/80 hover:text-primary">About us</Link></li>
            <li><Link href="/adventures" className="text-foreground/80 hover:text-primary">All experiences</Link></li>
            <li><Link href="/legal/terms" className="text-foreground/80 hover:text-primary">Terms &amp; conditions</Link></li>
            <li><Link href="/legal/privacy" className="text-foreground/80 hover:text-primary">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ember-400" /> Lahbab Desert, Dubai, UAE
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-ember-400" /> {siteConfig.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-ember-400" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-ember-400" /> Secure checkout by Stripe
            </span>
            <span className="hidden sm:inline">Visa · Mastercard · Apple&nbsp;Pay · Google&nbsp;Pay</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
