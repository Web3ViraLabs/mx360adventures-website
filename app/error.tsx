"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-8" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold">Something went sideways</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        A sandstorm hit our servers. Try again — if it persists, give us a shout.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">Ref: {error.digest}</p>
      )}
      <Button size="lg" className="mt-8" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
