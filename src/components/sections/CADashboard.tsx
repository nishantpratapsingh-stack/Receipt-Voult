import { Users, AlertCircle, FileSpreadsheet, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Users, title: "All clients in one place", desc: "Switch between hundreds of clients in a single dashboard." },
  { icon: AlertCircle, title: "Missing receipt alerts", desc: "Auto-detect gaps before filing — never miss an ITC again." },
  { icon: FileSpreadsheet, title: "Bulk export", desc: "Excel, Tally and CSV exports formatted for your workflow." },
  { icon: FileCheck, title: "GST-ready reports", desc: "GSTR-1, GSTR-3B and ITC reconciliation, generated in seconds." },
];

const clients = [
  { name: "Sharma Traders", status: "ready", missing: 0 },
  { name: "Patel Industries", status: "alert", missing: 4 },
  { name: "Verma & Co.", status: "ready", missing: 0 },
  { name: "Khan Logistics", status: "warning", missing: 2 },
  { name: "Mehta Exports", status: "ready", missing: 0 },
];

export const CADashboard = () => {
  return (
    <section id="ca" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: dashboard preview */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-6 bg-gradient-primary opacity-15 blur-3xl rounded-full" />
            <div className="relative rounded-3xl bg-card border border-border shadow-premium overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-border bg-secondary/40 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold">CA Super Dashboard</div>
                  <div className="text-xs text-muted-foreground">142 active clients</div>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                </div>
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
                {[
                  { label: "Pending", value: "12", color: "text-warning" },
                  { label: "Filed", value: "98", color: "text-success" },
                  { label: "Alerts", value: "6", color: "text-destructive" },
                ].map((s) => (
                  <div key={s.label} className="p-4 text-center">
                    <div className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Clients list */}
              <div className="p-3">
                {clients.map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/60 transition-smooth">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{c.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {c.missing > 0 ? `${c.missing} receipts missing` : "All up to date"}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        c.status === "ready"
                          ? "bg-success-soft text-success"
                          : c.status === "warning"
                          ? "bg-warning-soft text-warning"
                          : "bg-destructive-soft text-destructive"
                      }`}
                    >
                      {c.status === "ready" ? "Ready" : c.status === "warning" ? "Review" : "Alert"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold tracking-wide uppercase mb-4 shadow-glow">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Built for Chartered Accountants
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5">
              The CA Super Dashboard your firm has been waiting for
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Manage hundreds of clients without losing your mind. Receipt Vault gives your firm one unified workspace for filings, follow-ups and reconciliations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">{f.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="group">
              Book a CA demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
