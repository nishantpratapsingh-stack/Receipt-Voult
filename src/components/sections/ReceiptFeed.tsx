import { Heart, MessageCircle, Bookmark } from "lucide-react";

const receipts = [
  { merchant: "Amazon", amount: "₹4,299", category: "Electronics", color: "from-orange-400 to-amber-500", emoji: "📦", gst: "₹654" },
  { merchant: "Swiggy", amount: "₹847", category: "Food", color: "from-orange-500 to-red-500", emoji: "🍔", gst: "₹47" },
  { merchant: "Indian Oil", amount: "₹2,000", category: "Fuel", color: "from-rose-500 to-pink-500", emoji: "⛽", gst: "₹305" },
  { merchant: "Uber", amount: "₹356", category: "Travel", color: "from-slate-700 to-slate-900", emoji: "🚗", gst: "₹54" },
  { merchant: "BigBasket", amount: "₹1,520", category: "Groceries", color: "from-emerald-500 to-green-600", emoji: "🛒", gst: "₹76" },
  { merchant: "Airtel", amount: "₹999", category: "Telecom", color: "from-red-500 to-rose-600", emoji: "📱", gst: "₹152" },
];

export const ReceiptFeed = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-4">
              Product experience
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-5">
              A receipt feed you'll actually <span className="text-gradient">enjoy scrolling</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Your receipts, beautifully laid out like a social timeline — with merchant logos, amounts, categories and GST tags at a glance.
            </p>
            <ul className="space-y-3">
              {[
                "Swipe through receipts like Instagram stories",
                "Tap any card to see full invoice + AI extraction",
                "Long-press to recategorize — AI learns instantly",
                "Filter by merchant, GST, date or amount",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-gradient-success flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-foreground/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-glow opacity-50 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {receipts.map((r, i) => (
                <div
                  key={r.merchant}
                  className={`rounded-3xl bg-card border border-border shadow-card overflow-hidden hover:shadow-elevated transition-smooth hover:-translate-y-1 ${
                    i % 3 === 0 ? "translate-y-4" : ""
                  }`}
                >
                  <div className={`aspect-square bg-gradient-to-br ${r.color} flex items-center justify-center text-6xl relative`}>
                    <span>{r.emoji}</span>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/95 text-xs font-semibold text-foreground">
                      GST {r.gst}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-sm truncate">{r.merchant}</span>
                      <span className="font-display font-bold text-sm">{r.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                        {r.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Heart className="w-3.5 h-3.5" />
                        <MessageCircle className="w-3.5 h-3.5" />
                        <Bookmark className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
