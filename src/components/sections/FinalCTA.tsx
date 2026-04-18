import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "../Logo";

export const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-primary text-primary-foreground p-10 md:p-16 lg:p-20 text-center shadow-premium">
          {/* Decorative orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-20" />

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Free 14-day trial · No credit card
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.05]">
              Start managing your expenses smartly today
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
              Join 10,000+ professionals and 500+ CA firms saving time and unlocking GST credits with Receipt Vault.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="glass" size="xl" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button
                size="xl"
                className="bg-white/10 border border-white/30 text-primary-foreground hover:bg-white/20 backdrop-blur-sm transition-smooth"
              >
                <CalendarCheck className="w-5 h-5" />
                Book a CA Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              The AI-powered receipt &amp; GST assistant for individuals and Chartered Accountants.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "For CAs", "Mobile app", "Integrations"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press kit", "Contact"] },
            { title: "Resources", links: ["GST guide", "Help center", "API docs", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-display font-bold text-sm mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} © 2026 ReceiptVault. Crafted with precision by Nishant Kumar.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
            <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
            <a href="#" className="hover:text-foreground transition-smooth">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
