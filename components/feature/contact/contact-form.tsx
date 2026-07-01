"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Lightweight contact form. With no mail backend wired yet, it composes a
 * prefilled email to the team (mailto) so the message actually goes somewhere.
 * Swap the submit handler for a Server Action / API route when a mailer exists.
 */
export function ContactForm() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    setSending(true);
    const subject = encodeURIComponent(`Enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…", {
      description: "Your message is ready to send.",
    });
    setTimeout(() => setSending(false), 1200);
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-1.5 block">Name</Label>
          <Input id="name" name="name" autoComplete="name" placeholder="Jordan Rider" required />
        </div>
        <div>
          <Label htmlFor="email" className="mb-1.5 block">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div>
        <Label htmlFor="message" className="mb-1.5 block">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what you're after — dates, group size, which ride…"
          className="w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      </div>
      <Button type="submit" size="lg" disabled={sending} className="h-12 w-full text-base sm:w-auto sm:px-8">
        <Send className="mr-1.5 size-4" />
        Send message
      </Button>
    </form>
  );
}
