import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect for individuals starting out.",
    cta: "Get started",
    variant: "soft" as const,
    features: ["Up to 50 receipts/mo", "WhatsApp & email capture", "AI extraction", "Basic insights", "Mobile app"],
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    desc: "For freelancers, founders & small businesses.",
    cta: "Start free trial",
    variant: "hero" as const,
    popular: true,
    features: [
      "Unlimited receipts",
      "Full GST intelligence",
      "Smart nudges & insights",
      "Advanced search & filters",
      "PDF + Excel export",
      "Share with CA (secure links)",
    ],
  },
  {
    name: "CA Plan",
    price: "₹1,499",
    period: "/month",
    desc: "Built for Chartered Accountants & firms.",
    cta: "Book a demo",
    variant: "glass" as const,
    features: [
      "Everything in Pro",
      "CA Super Dashboard",
      "Up to 100 client accounts",
      "Bulk export (Tally / GSTR)",
      "Missing receipt alerts",
      "Priority support",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold tracking-wide uppercase text-primary mb-4 shadow-card">
            Pricing
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple pricing. <span className="text-gradient">Massive savings.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Most users recover their subscription in GST credits within the first week.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 border transition-smooth hover:-translate-y-1 ${
                t.popular
                  ? "bg-gradient-card border-primary/30 shadow-premium scale-100 md:scale-105 z-10"
                  : "bg-gradient-card border-border shadow-card hover:shadow-elevated"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-glow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold mb-2">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold tracking-tight">{t.price}</span>
                  <span className="text-muted-foreground text-sm">{t.period}</span>
                </div>
              </div>

              <Button variant={t.variant} size="lg" className="w-full mb-6">
                {t.cta}
              </Button>

              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      t.popular ? "bg-gradient-primary" : "bg-success-soft"
                    }`}>
                      <Check className={`w-3 h-3 ${t.popular ? "text-primary-foreground" : "text-success"}`} strokeWidth={3} />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All plans include unlimited storage, mobile apps, and 24/7 AI processing. Cancel anytime.
        </p>
      </div>
    </section>
  );
};
