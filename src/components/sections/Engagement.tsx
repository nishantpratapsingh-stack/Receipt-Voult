import { Flame, Gift, Trophy, Brain, Sparkles, TrendingUp } from "lucide-react";

export const Engagement = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold tracking-wide uppercase text-primary mb-4 shadow-card">
            Designed to delight
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Habits that <span className="text-gradient">stick</span>. AI that <span className="text-gradient">learns</span>.
          </h2>
          <p className="text-lg text-muted-foreground">
            Subtle gamification keeps you consistent. A learning engine makes the product better with every receipt you log.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Gamification card */}
          <div className="rounded-3xl bg-gradient-card border border-border shadow-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gamification</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-6">Stay consistent, get rewarded</h3>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              <div className="rounded-2xl bg-background border border-border p-5 text-center hover:-translate-y-1 transition-smooth">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-3 shadow-soft">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div className="font-display font-bold text-2xl">23</div>
                <div className="text-xs text-muted-foreground">Day streak</div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-5 text-center hover:-translate-y-1 transition-smooth">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-3 shadow-soft">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="font-display font-bold text-2xl">7</div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-5 text-center hover:-translate-y-1 transition-smooth">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-3 shadow-soft">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="font-display font-bold text-2xl">#12</div>
                <div className="text-xs text-muted-foreground">Leaderboard</div>
              </div>
            </div>

            <div className="rounded-2xl bg-background border border-border p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold">Weekly goal</span>
                <span className="text-muted-foreground">28 / 35 receipts</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
          </div>

          {/* Learning AI card */}
          <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 shadow-glow relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-6 opacity-80">
                <Brain className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Learning AI</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Your personal expense brain</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                Every edit you make trains the model. Within weeks, Receipt Vault knows your patterns better than your bank does.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Sparkles, text: "Learns your categorization style" },
                  { icon: TrendingUp, text: "Improves accuracy with every receipt" },
                  { icon: Brain, text: "Personalized to your business model" },
                ].map((it) => (
                  <div key={it.text} className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <it.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{it.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-70">Accuracy after 30 days</div>
                  <div className="font-display font-bold text-3xl">99.2%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-70">Time saved monthly</div>
                  <div className="font-display font-bold text-3xl">14h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
