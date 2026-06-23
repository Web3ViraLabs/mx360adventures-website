import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-secondary text-ember-600">
        <Compass className="size-8" />
      </div>
      <p className="mt-6 font-display text-6xl font-extrabold tracking-tight">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold">Lost in the dunes</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        This trail doesn't exist. Let's get you back to the adventures.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/adventures">Browse adventures</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </Container>
  );
}
