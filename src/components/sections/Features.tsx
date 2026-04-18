import { Camera, Sparkles, Tags, Calculator, Lightbulb, Search } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI Receipt Capture",
    desc: "Camera scan, WhatsApp bot, email forwarding, and auto-sync from inboxes — receipts come to you.",
    bullets: ["Camera scan", "WhatsApp bot", "Email forwarding", "Auto sync"],
    accent: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-gradient-primary",
  },
  {
    icon: Sparkles,
    title: "AI Data Extraction",
    desc: "Merchant, amount, date, GSTIN and invoice number — read with 99% accuracy.",
    bullets: ["GSTIN detected", "Line items parsed", "Multi-language", "PDF + image"],
    accent: "from-purple-500/10 to-fuchsia-500/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-500",
  },
  {
    icon: Tags,
    title: "Smart Categorization",
    desc: "Learns from how you tag and corrects itself silently. Faster every week.",
    bullets: ["Self-learning", "Custom rules", "Bulk reclassify", "Tag suggestions"],
    accent: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    icon: Calculator,
    title: "GST Intelligence Engine",
    desc: "Auto CGST/SGST/IGST split, ITC eligibility checks and a clean GST summary you can file.",
    bullets: ["CGST / SGST / IGST", "ITC eligibility", "GST summary", "Reverse charge"],
    accent: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-gradient-success",
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    desc: "Lost ITC detector, spending trends, fuel and travel breakdowns — all surfaced automatically.",
    bullets: ["Lost ITC alerts", "Spending trends", "Fuel tracking", "Anomaly detection"],
    accent: "from-rose-500/10 to-pink-500/10",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
  },
  {
    icon: Search,
    title: "Smart Search",
    desc: 'Ask in plain English: "amazon > 5000 with gst" — get answers instantly.',
    bullets: ["Natural language", "Filters & ranges", "Saved queries", "Instant export"],
    accent: "from-cyan-500/10 to-sky-500/10",
    iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold tracking-wide uppercase text-primary mb-4 shadow-card">
            Core features
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-gradient">tame receipts</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Six AI-powered modules that work together to capture, understand and unlock value from every bill.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative rounded-3xl bg-gradient-card p-7 border border-border shadow-card hover:shadow-elevated hover:-translate-y-1 transition-smooth overflow-hidden`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-smooth`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-smooth`}>
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {f.bullets.map((b) => (
                    <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
