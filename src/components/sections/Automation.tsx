import { MessageSquare, Mail, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";

const sources = [
  { icon: MessageSquare, label: "WhatsApp", desc: "Forward to bot", color: "from-green-500 to-emerald-500" },
  { icon: Mail, label: "Email", desc: "Auto-scan inbox", color: "from-blue-500 to-indigo-500" },
  { icon: RefreshCw, label: "Sync", desc: "Banks & wallets", color: "from-purple-500 to-fuchsia-500" },
];

export const Automation = () => {
  return (
    <section id="automation" className="py-20 md:py-28 bg-secondary/40 relative overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold tracking-wide uppercase text-primary mb-4 shadow-card">
            Zero-effort capture
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Receipts arrive. <span className="text-gradient">You do nothing.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three ways to send receipts. One AI brain that handles the rest — extraction, GST split, categorization, and storage.
          </p>
        </div>

        {/* Flow */}
        <div className="rounded-3xl bg-gradient-card border border-border shadow-premium p-8 md:p-12">
          <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-4 items-center">
            {/* Sources */}
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border hover:shadow-card transition-smooth">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="hidden lg:block w-12 h-px bg-gradient-to-r from-border to-primary/40" />
              <div className="lg:hidden h-8 w-px bg-gradient-to-b from-border to-primary/40" />
            </div>

            {/* AI brain */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-50 animate-pulse-glow" />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
                </div>
              </div>
              <div className="font-display font-bold text-xl mb-1">AI Engine</div>
              <div className="text-sm text-muted-foreground max-w-[180px]">Extracts, splits GST, categorizes &amp; stores</div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="hidden lg:block w-12 h-px bg-gradient-to-r from-primary/40 to-success/60" />
              <div className="lg:hidden h-8 w-px bg-gradient-to-b from-primary/40 to-success/60" />
            </div>

            {/* Output */}
            <div className="space-y-3">
              {[
                "Receipt stored & indexed",
                "GST auto-split (CGST/SGST/IGST)",
                "Categorized & tagged",
                "Insights ready in dashboard",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-success-soft/60 border border-success/20">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
