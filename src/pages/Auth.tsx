import { useEffect, useState, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User, Check, Shield, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  isAuthenticated,
  loginWithCredentials,
} from "@/lib/auth";

type Mode = "login" | "signup";

const getModeFromPathname = (pathname: string): Mode =>
  pathname === "/signup" ? "signup" : "login";

const FloatingCard = ({
  className,
  children,
  delay = "0s",
}: {
  className?: string;
  children: React.ReactNode;
  delay?: string;
}) => (
  <div
    className={cn(
      "absolute backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-premium text-white",
      "animate-float",
      className,
    )}
    style={{ animationDelay: delay }}
  >
    {children}
  </div>
);

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

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(() =>
    getModeFromPathname(location.pathname),
  );
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    setMode(getModeFromPathname(location.pathname));
    setSuccess(false);
    setError("");
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      const username = form.email.trim();
      const password = form.password;

      if (!username || !password) {
        setError("Please fill all fields");
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }

      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));
      const isValid = loginWithCredentials(username, password);
      setLoading(false);

      if (!isValid) {
        setError("Invalid username or password");
        setSuccess(false);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }

      setError("");
      setSuccess(true);
      setTimeout(() => navigate("/", { replace: true }), 600);
      return;
    }

    if (!form.email || !form.password || !form.name) {
      setError("Please complete all required fields");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      {/* LEFT — Brand experience */}
      <aside className="relative hidden lg:flex lg:w-[55%] overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(230_85%_22%)_0%,hsl(245_80%_30%)_45%,hsl(280_75%_40%)_100%)]" />

        {/* Mesh blobs */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,hsl(230_100%_70%/0.45),transparent_70%)] blur-2xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,hsl(280_100%_70%/0.4),transparent_70%)] blur-2xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,hsl(200_100%_70%/0.3),transparent_70%)] blur-2xl animate-pulse-glow"
          style={{ animationDelay: "2.5s" }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/40 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full text-white">
          <div className="flex items-center justify-between">
            <Logo className="text-white" />
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-smooth"
            >
              <ArrowLeft className="w-4 h-4" /> Back to site
            </Link>
          </div>

          <div className="max-w-lg animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered finance
            </div>
            <h1 className="font-display text-5xl xl:text-6xl font-bold leading-[1.05] mb-5">
              Your AI Financial Assistant
            </h1>
            <p className="text-lg text-white/80 mb-4 leading-relaxed">
              Track expenses, save GST, and automate everything effortlessly.
            </p>
            <p className="text-xl xl:text-2xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(200_100%_85%),hsl(280_100%_85%))]">
              Start saving money in 60 seconds →
            </p>

            <div className="flex items-center gap-6 mt-10 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Bank-grade encryption
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white/30 bg-[linear-gradient(135deg,hsl(200_80%_60%),hsl(280_80%_60%))]"
                    />
                  ))}
                </div>
                10,000+ users
              </div>
            </div>
          </div>

          {/* Floating UI cards */}
          <FloatingCard className="top-24 right-12 w-56" delay="0s">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/30 backdrop-blur flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-white/70">GST saved</div>
                <div className="font-bold text-lg">₹2,340</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="top-1/2 right-20 w-60" delay="1s">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-glow/30 backdrop-blur flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <div className="text-xs text-white/70">Auto-detected</div>
                <div className="font-bold text-sm">5 receipts processed</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bottom-32 right-8 w-52" delay="2s">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/30 backdrop-blur flex items-center justify-center text-lg">
                ⛽
              </div>
              <div>
                <div className="text-xs text-white/70">Fuel spend</div>
                <div className="font-bold text-lg">₹4,200</div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </aside>

      {/* RIGHT — Auth form */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10 relative">
        {/* Mobile gradient header */}
        <div className="lg:hidden absolute inset-x-0 top-0 h-48 bg-[linear-gradient(135deg,hsl(230_85%_30%),hsl(280_75%_45%))] -z-0" />

        <div className="w-full max-w-md relative z-10 animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Logo className="text-white" />
          </div>

          <div
            className={cn(
              "bg-card/95 backdrop-blur-xl border border-border rounded-3xl shadow-premium p-8 transition-all",
              shake && "animate-[shake_0.4s_ease-in-out]",
            )}
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(0 0% 100%), hsl(220 30% 99%))",
            }}
          >
            {/* Mode tabs */}
            <div className="relative grid grid-cols-2 p-1 mb-6 bg-muted rounded-xl text-sm font-medium">
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
                    setError("");
                  }}
                  className={cn(
                    "relative z-10 py-2.5 rounded-lg transition-colors capitalize",
                    mode === m ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {m === "login" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <div key={mode} className="animate-fade-in">
              <h2 className="font-display text-2xl font-bold mb-1">
                {mode === "login" ? "Welcome back" : "Get started free"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {mode === "login"
                  ? "Sign in to manage your receipts and GST."
                  : "Create your account in less than 60 seconds."}
              </p>

              {/* Social */}
              <div className="grid gap-2.5 mb-5">
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
                      <path d="M16.37 1.43c0 1.14-.42 2.2-1.27 3.18-.99 1.16-2.19 1.83-3.5 1.72-.02-.13-.03-.27-.03-.41 0-1.1.48-2.27 1.32-3.22.42-.48.96-.88 1.6-1.2.65-.31 1.27-.49 1.85-.52.02.15.03.3.03.45zM20.5 17.4c-.56 1.27-1.22 2.45-1.99 3.55-1.06 1.51-1.92 2.55-2.59 3.13-1.05.94-2.17 1.42-3.36 1.45-.86 0-1.89-.24-3.09-.74-1.21-.49-2.32-.74-3.34-.74-1.06 0-2.2.25-3.42.74-1.22.5-2.21.76-2.96.78-1.14.05-2.29-.45-3.45-1.5-.73-.63-1.63-1.71-2.69-3.24-1.14-1.63-2.07-3.53-2.81-5.7-.78-2.34-1.18-4.6-1.18-6.79 0-2.5.54-4.66 1.62-6.47 1.55-2.61 4.04-4.13 7.47-4.59" />
                    </svg>
                  }
                />
              </div>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1.5 animate-fade-in">
                    <Label htmlFor="name">Full name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Priya Sharma"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          setError("");
                        }}
                        className="pl-9 h-11 rounded-xl focus-visible:ring-primary/40"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email">{mode === "login" ? "Username/Email" : "Email"}</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type={mode === "login" ? "text" : "email"}
                      placeholder={mode === "login" ? "Nishant" : "you@company.com"}
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        setError("");
                      }}
                      className="pl-9 h-11 rounded-xl focus-visible:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === "login" && (
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        setError("");
                      }}
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

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={loading || success}
                  className="w-full mt-2"
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
                    "Sign in"
                  ) : (
                    "Create account"
                  )}
                </Button>

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/50 rounded-xl p-3 border border-accent">
                  <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  We automatically categorize your expenses & detect GST.
                </div>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {mode === "login" ? "New to Receipt Vault?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setError("");
                    setSuccess(false);
                  }}
                  className="font-semibold text-primary hover:underline"
                >
                  {mode === "login" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
            <Shield className="w-3.5 h-3.5" />
            Your data is secure & encrypted
          </div>
        </div>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
