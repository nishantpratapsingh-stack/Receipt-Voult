import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

const stats = [
  { label: "Total spend", value: "₹84,320", change: "+12%", trend: "up", icon: Wallet, color: "text-primary", bg: "bg-accent" },
  { label: "GST claimable", value: "₹12,450", change: "+₹2,340", trend: "up", icon: PiggyBank, color: "text-success", bg: "bg-success-soft" },
  { label: "Receipts this month", value: "184", change: "+34", trend: "up", icon: TrendingUp, color: "text-warning", bg: "bg-warning-soft" },
  { label: "Avg. ticket size", value: "₹458", change: "-8%", trend: "down", icon: TrendingDown, color: "text-destructive", bg: "bg-destructive-soft" },
];

const categories = [
  { name: "Food & Dining", pct: 32, amount: "₹26,982", color: "bg-gradient-to-r from-orange-400 to-rose-500" },
  { name: "Travel & Fuel", pct: 24, amount: "₹20,236", color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
  { name: "Shopping", pct: 18, amount: "₹15,177", color: "bg-gradient-to-r from-purple-500 to-fuchsia-500" },
  { name: "Utilities", pct: 14, amount: "₹11,804", color: "bg-gradient-success" },
  { name: "Other", pct: 12, amount: "₹10,121", color: "bg-gradient-to-r from-slate-400 to-slate-600" },
];

export const Dashboard = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 relative overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold tracking-wide uppercase text-primary mb-4 shadow-card">
            Dashboard & analytics
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            See your money like <span className="text-gradient">never before</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Beautiful, real-time analytics that turn raw receipts into decisions you can act on.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-card border border-border shadow-premium p-6 md:p-10">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-background border border-border p-5 hover:shadow-card transition-smooth">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className={`text-xs font-semibold ${s.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {s.change}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                <div className="font-display text-2xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart placeholder */}
            <div className="lg:col-span-2 rounded-2xl bg-background border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg">Spending trend</h3>
                  <p className="text-xs text-muted-foreground">Last 6 months</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">6M</span>
                  <span className="px-3 py-1 rounded-full text-muted-foreground">1Y</span>
                </div>
              </div>
              {/* Faux line chart with bars */}
              <div className="h-48 flex items-end justify-between gap-3">
                {[40, 65, 50, 80, 70, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-primary rounded-t-xl opacity-90 hover:opacity-100 transition-smooth relative group"
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-smooth bg-foreground text-background text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
                        ₹{(h * 1000).toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category breakdown */}
            <div className="rounded-2xl bg-background border border-border p-6">
              <h3 className="font-display font-bold text-lg mb-1">Top categories</h3>
              <p className="text-xs text-muted-foreground mb-5">By amount this month</p>
              <div className="space-y-4">
                {categories.map((c) => (
                  <div key={c.name}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-muted-foreground text-xs">{c.amount}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${c.color} rounded-full transition-smooth`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
