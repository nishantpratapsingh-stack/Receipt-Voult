import { ArrowRight, Play,TrendingUp, Receipt as ReceiptIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthDialog } from "@/components/auth/AuthProvider";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

export const Hero = () => {
  const auth = useAuthDialog();
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-gradient-hero">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-glow rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-gradient-glow rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/10 text-sm font-medium text-accent-foreground mb-6 animate-fade-in">
              
              <span>AI-powered receipt automation</span>
              <span className="text-primary">→</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
              Your AI-Powered{" "}
              <span className="text-gradient">Receipt & GST</span>{" "}
              Assistant
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl lg:max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Capture receipts automatically, track expenses, save GST, and manage everything effortlessly — built for individuals and Chartered Accountants.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" className="group" onClick={() => auth.open("signup")}>
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="glass" size="xl" className="group">
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" />Free forever plan</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" />No credit card</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" />GST-ready</div>
            </div>
          </div>

          {/* Right: dashboard mockup with floating cards */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full" />

              {/* Main mockup */}
              <div className="relative rounded-3xl overflow-hidden shadow-premium border border-border bg-card">
                <img
                  src={dashboardMockup}
                  alt="Receipt Vault dashboard showing GST savings, monthly spending, and recent receipts"
                  width={1280}
                  height={896}
                  className="w-full h-auto"
                />
              </div>

              {/* Floating card 1: GST saved */}
              <div className="absolute -left-4 md:-left-12 top-1/4 bg-card rounded-2xl shadow-premium border border-border p-4 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">GST saved</div>
                  <div className="font-display font-bold text-lg">₹2,340</div>
                </div>
              </div>

              {/* Floating card 2: receipts auto-detected */}
              <div className="absolute -right-2 md:-right-8 bottom-1/4 bg-card rounded-2xl shadow-premium border border-border p-4 flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <ReceiptIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Auto-detected</div>
                  <div className="font-display font-bold text-lg">5 receipts</div>
                </div>
              </div>

              {/* Floating card 3: AI badge top */}
              <div className="hidden md:flex absolute -top-4 right-12 bg-gradient-primary text-primary-foreground rounded-full shadow-glow px-4 py-2 items-center gap-2 animate-float">
                <span className="text-sm font-semibold">AI working live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
            Trusted by 10,000+ professionals & 500+ CA firms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["TaxBuddy", "ClearTax", "Zoho", "Razorpay", "Quicko", "Vakilsearch"].map((n) => (
              <span key={n} className="font-display font-bold text-lg text-muted-foreground">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
