import { useState, FormEvent, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Check,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: Mode;
}

const SocialButton = ({
  provider,
  icon,
}: {
  provider: string;
  icon: React.ReactNode;
}) => (
  <button
    type="button"
    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border bg-background hover:bg-accent transition-smooth text-sm font-medium hover:-translate-y-0.5 hover:shadow-card"
  >
    {icon}
    <span>Continue with {provider}</span>
  </button>
);

export const AuthDialog = ({
  open,
  onOpenChange,
  defaultMode = "login",
}: AuthDialogProps) => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setSuccess(false);
      setLoading(false);
    }
  }, [open, defaultMode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || (mode === "signup" && !form.name)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1300));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => onOpenChange(false), 1100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-4xl gap-0 overflow-hidden border-0 rounded-3xl shadow-premium bg-transparent">
        <DialogTitle className="sr-only">
          {mode === "login" ? "Sign in to Receipt Vault" : "Create your Receipt Vault account"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Access your AI-powered receipt and GST assistant
        </DialogDescription>

        <div className="grid md:grid-cols-2 bg-card rounded-3xl overflow-hidden">
          {/* Brand panel */}
          <div className="relative hidden md:flex flex-col justify-between p-8 overflow-hidden text-white min-h-[600px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(230_85%_22%)_0%,hsl(245_80%_30%)_45%,hsl(280_75%_42%)_100%)]" />
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,hsl(230_100%_70%/0.45),transparent_70%)] blur-2xl animate-pulse-glow" />
            <div
              className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,hsl(280_100%_70%/0.45),transparent_70%)] blur-2xl animate-pulse-glow"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Receipt Vault
              </div>
            </div>

            <div className="relative">
              <h2 className="font-display text-3xl xl:text-4xl font-bold leading-tight mb-3">
                Your AI Financial Assistant
              </h2>
              <p className="text-white/80 mb-3">
                Track expenses, save GST, and automate everything effortlessly.
              </p>
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(200_100%_85%),hsl(280_100%_85%))]">
                Start saving in 60 seconds →
              </p>
            </div>

            {/* Floating cards */}
            <div className="relative space-y-3">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-success/30 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/70">GST saved this month</div>
                  <div className="font-bold">₹2,340</div>
                </div>
              </div>
              <div
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center gap-3 animate-float ml-6"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="w-9 h-9 rounded-xl bg-primary-glow/30 flex items-center justify-center">
                  ✨
                </div>
                <div>
                  <div className="text-xs text-white/70">Auto-detected</div>
                  <div className="font-bold text-sm">5 receipts processed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-8 bg-card overflow-y-auto max-h-[90vh]">
            {/* Mode tabs */}
            <div className="relative grid grid-cols-2 p-1 mb-5 bg-muted rounded-xl text-sm font-medium">
              <span
                className={cn(
                  "absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-background shadow-card transition-all duration-500",
                  mode === "login" ? "left-1" : "left-[calc(50%+0px)]",
                )}
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setSuccess(false);
                  }}
                  className={cn(
                    "relative z-10 py-2.5 rounded-lg transition-colors",
                    mode === m ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {m === "login" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <div
              key={mode}
              className={cn("animate-fade-in", shake && "animate-[shake_0.4s_ease-in-out]")}
            >
              <h3 className="font-display text-xl font-bold mb-1">
                {mode === "login" ? "Welcome back" : "Get started free"}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                {mode === "login"
                  ? "Sign in to manage your receipts and GST."
                  : "Create your account in less than 60 seconds."}
              </p>

              <div className="grid gap-2 mb-4">
                <SocialButton
                  provider="Google"
                  icon={
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                    </svg>
                  }
                />
                <SocialButton
                  provider="Apple"
                  icon={
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-foreground">
                      <path d="M16.37 1.43c0 1.14-.42 2.2-1.27 3.18-.99 1.16-2.19 1.83-3.5 1.72-.02-.13-.03-.27-.03-.41 0-1.1.48-2.27 1.32-3.22.84-.95 2.02-1.62 3.18-1.7.02.14.03.28.03.43zM20.39 17.4c-.55 1.27-1.21 2.45-1.99 3.55-1.06 1.51-1.92 2.55-2.59 3.13-1.05.94-2.17 1.42-3.36 1.45-.86 0-1.89-.24-3.09-.74-1.21-.49-2.32-.74-3.34-.74-1.06 0-2.2.25-3.42.74-1.22.5-2.21.76-2.96.78-1.14.05-2.29-.45-3.45-1.5-.73-.63-1.63-1.71-2.69-3.24z" />
                    </svg>
                  }
                />
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or with email</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === "signup" && (
                  <div className="space-y-1.5 animate-fade-in">
                    <Label htmlFor="d-name">Full name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="d-name"
                        placeholder="Priya Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="pl-9 h-11 rounded-xl focus-visible:ring-primary/40"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="d-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="d-email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="pl-9 h-11 rounded-xl focus-visible:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="d-password">Password</Label>
                    {mode === "login" && (
                      <button type="button" className="text-xs font-medium text-primary hover:underline">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="d-password"
                      type={showPwd ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="pl-9 pr-10 h-11 rounded-xl focus-visible:ring-primary/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === "login" && (
                  <label className="flex items-center gap-2 text-sm text-muted-foreground select-none">
                    <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                    Remember me for 30 days
                  </label>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={loading || success}
                  className="w-full mt-1"
                >
                  {success ? (
                    <>
                      <Check className="w-5 h-5" /> Success!
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Please wait
                    </>
                  ) : mode === "login" ? (
                    "Login"
                  ) : (
                    "Create account"
                  )}
                </Button>

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/50 rounded-xl p-2.5 border border-accent">
                  <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  We automatically categorize your expenses & detect GST.
                </div>
              </form>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                <Shield className="w-3.5 h-3.5" />
                Bank-grade encryption · 10,000+ users
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};
