import { Bell, AlertTriangle, TrendingUp, Receipt } from "lucide-react";

const nudges = [
  {
    icon: Receipt,
    color: "text-primary",
    bg: "bg-accent",
    title: "Upload missing receipt",
    desc: "We see a ₹4,200 charge from Croma but no receipt yet. Forward it now?",
    time: "2m ago",
  },
  {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive-soft",
    title: "You missed ₹850 in GST",
    desc: "Office supplies from Reliance — eligible for ITC. Tag now to claim.",
    time: "1h ago",
  },
  {
    icon: TrendingUp,
    color: "text-warning",
    bg: "bg-warning-soft",
    title: "Fuel spending up 32%",
    desc: "You spent ₹8,400 on fuel this month vs. ₹6,350 last month.",
    time: "Today",
  },
];

export const Nudges = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-glow opacity-40 blur-3xl" />
            <div className="relative space-y-3 max-w-md mx-auto lg:mx-0">
              {nudges.map((n, i) => (
                <div
                  key={n.title}
                  className="rounded-2xl bg-card border border-border shadow-elevated p-5 flex gap-4 hover:-translate-y-0.5 transition-smooth"
                  style={{ marginLeft: `${i * 20}px` }}
                >
                  <div className={`w-11 h-11 rounded-xl ${n.bg} flex items-center justify-center flex-shrink-0`}>
                    <n.icon className={`w-5 h-5 ${n.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-sm">{n.title}</div>
                      <div className="text-[10px] text-muted-foreground">{n.time}</div>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{n.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-4">
              <Bell className="w-3 h-3" /> Smart nudges
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5">
              An AI that taps you on the shoulder — only when it matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              No spam. No noise. Just intelligent reminders that save you money — flagged exactly when you can act on them.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "₹4.2K", label: "Avg. monthly GST recovered" },
                { value: "94%", label: "Of users save more" },
                { value: "0", label: "Annoying notifications" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-secondary/60 p-4">
                  <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
