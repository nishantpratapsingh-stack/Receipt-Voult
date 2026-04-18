import { FileText, FileSpreadsheet, Share2, Lock } from "lucide-react";
import { Quote } from "lucide-react";

const exports = [
  { icon: FileText, title: "PDF Export", desc: "Beautiful month-end reports — print or email instantly.", tag: "Most popular" },
  { icon: FileSpreadsheet, title: "Excel for CAs", desc: "Tally-ready, GSTR-formatted Excel sheets in one click." },
  { icon: Share2, title: "Share with CA", desc: "Time-bound, password-protected secure links.", tag: "Secure" },
];

const testimonials = [
  {
    quote: "Saved ₹10,000 in GST credits in my first quarter. Receipt Vault paid for itself ten times over.",
    name: "Rohit Sharma",
    role: "Founder, Mavericks Studio",
    avatar: "RS",
    color: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
  {
    quote: "I manage 80 clients. The CA dashboard alone saves me 20 hours every month. No more chasing receipts.",
    name: "CA Priya Mehta",
    role: "Mehta & Associates",
    avatar: "PM",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    quote: "I forward receipts to WhatsApp and forget about them. Everything magically appears in my dashboard.",
    name: "Aman Verma",
    role: "Freelance Designer",
    avatar: "AV",
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
];

export const ExportTrust = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container space-y-20">
        {/* Export */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-4">
              Export & sharing
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Take your data <span className="text-gradient">anywhere</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Built to plug straight into your accountant, your bank, and your filing process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {exports.map((e) => (
              <div key={e.title} className="rounded-3xl bg-gradient-card border border-border shadow-card p-7 hover:shadow-elevated hover:-translate-y-1 transition-smooth relative">
                {e.tag && (
                  <span className="absolute top-5 right-5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-primary text-primary-foreground uppercase tracking-wider">
                    {e.tag}
                  </span>
                )}
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <e.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span>Bank-grade encryption · SOC 2 ready · GDPR compliant</span>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-4">
              Loved by 10,000+ users
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Real money, <span className="text-gradient">real time saved</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl bg-gradient-card border border-border shadow-card p-7 flex flex-col hover:shadow-elevated transition-smooth">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground/90 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
