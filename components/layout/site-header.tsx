"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { categories, mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart, selectCount } from "@/lib/store/cart";
import { useMounted } from "@/lib/hooks";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Scroll-aware site header. Over the homepage's dark cinematic hero it starts
 * transparent with light-on-dark text, then fades to a solid sand surface on
 * scroll. On every other route (which has a light top), it's always solid so
 * the nav stays legible.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.openCart);
  const pathname = usePathname();

  // Only the homepage has a dark hero behind the header.
  const overHero = pathname === "/";
  const solid = scrolled || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Light-on-dark text only while transparent over the hero. */}
      <div className={cn(!solid && "dark")}>
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[image:var(--gradient-ember)] text-sm text-white shadow-[var(--shadow-glow)]">
              DS
            </span>
            <span className="hidden text-foreground sm:inline">{siteConfig.shortName}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-foreground/10 text-foreground"
                      : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button
              asChild
              size="sm"
              className="hidden h-9 rounded-full px-4 shadow-[var(--shadow-glow)] lg:inline-flex"
            >
              <Link href="/adventures">Book now</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Open cart${mounted && count ? `, ${count} items` : ""}`}
              onClick={openCart}
              className="relative text-foreground hover:bg-foreground/10"
            >
              <ShoppingBag className="size-5" />
              {mounted && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold leading-5 text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="text-foreground hover:bg-foreground/10 md:hidden"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-80 flex-col">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-2 flex flex-col px-2">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 text-base font-semibold transition-colors hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <p className="mt-4 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  By ride
                </p>
                <nav className="mt-1 flex flex-col px-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/adventures/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {c.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto px-4 pb-2 pt-4">
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <Link href="/adventures">Book an adventure</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </div>
    </header>
  );
}
