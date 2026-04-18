import { FileX, AlertTriangle, ClipboardList, EyeOff, Camera, Brain, Receipt, BarChart3, ArrowRight } from "lucide-react";

const problems = [
  { icon: FileX, title: "Lost receipts", desc: "Paper bills disappear, photos get buried in your gallery." },
  { icon: AlertTriangle, title: "Missed GST credits", desc: "Thousands of rupees in ITC slip away every quarter." },
  { icon: ClipboardList, title: "Manual tracking", desc: "Spreadsheets and folders that nobody updates." },
  { icon: EyeOff, title: "Zero insights", desc: "No idea where your money actually goes each month." },
];

const solutions = [
  { icon: Camera, title: "Auto capture", desc: "Snap, forward, or sync — receipts arrive on their own." },
  { icon: Brain, title: "AI extraction", desc: "Merchant, amount, GSTIN, items — read in seconds." },
  { icon: Receipt, title: "GST intelligence", desc: "Auto CGST/SGST/IGST split + ITC eligibility flagged." },
  { icon: BarChart3, title: "Smart insights", desc: "Trends, anomalies and savings — surfaced for you." },
];

export const ProblemSolution = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-4">
            Why Receipt Vault
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Stop losing money to <span className="text-destructive">chaos</span>.
            <br />
            Start saving with <span className="text-gradient">automation</span>.
          </h2>
          <p className="text-lg text-muted-foreground">
            Most people lose 20% of their GST credits and have no clue where their money goes. We fix both — invisibly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
          {/* Problems */}
          <div className="rounded-3xl border border-destructive/15 bg-destructive-soft/40 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-sm font-semibold text-destructive uppercase tracking-wider">The old way</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((p) => (
                <div key={p.title} className="rounded-2xl bg-card/80 backdrop-blur-sm p-5 border border-border/60">
                  <div className="w-10 h-10 rounded-xl bg-destructive-soft flex items-center justify-center mb-3">
                    <p.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex lg:flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow rotate-90 lg:rotate-0">
              <ArrowRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {/* Solutions */}
          <div className="rounded-3xl border border-success/20 bg-success-soft/50 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-semibold text-success uppercase tracking-wider">The Receipt Vault way</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {solutions.map((s) => (
                <div key={s.title} className="rounded-2xl bg-card/80 backdrop-blur-sm p-5 border border-border/60 hover:shadow-card transition-smooth hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-success flex items-center justify-center mb-3 shadow-soft">
                    <s.icon className="w-5 h-5 text-success-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
