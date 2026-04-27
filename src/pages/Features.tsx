import { useEffect } from "react";
import { BarChart3, Camera, Cloud, Search, Sparkles, Tags } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";

type FeatureItem = {
  icon: typeof Camera;
  title: string;
  desc: string;
  bullets: string[];
  accent: string;
  iconBg: string;
  route?: string;
};

const features: FeatureItem[] = [
  {
    icon: Camera,
    title: "AI Receipt Capture",
    desc: "Use your camera or upload images to quickly collect receipt data in one flow.",
    bullets: ["Camera capture", "Upload image", "Guided overlay", "Fast preview"],
    accent: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-gradient-primary",
    route: "/receipt-capture",
  },
  {
    icon: Sparkles,
    title: "AI Data Extraction",
    desc: "Automatically read key receipt fields with high accuracy for easy record-keeping.",
    bullets: ["Merchant", "Amount", "Date", "Invoice details"],
    accent: "from-purple-500/10 to-fuchsia-500/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-500",
    route: "/ai-extraction",
  },
  {
    icon: Tags,
    title: "Smart Categorization",
    desc: "Group expenses intelligently so your books remain clean and organized.",
    bullets: ["Auto labels", "Expense buckets", "Rule-ready", "Quick review"],
    accent: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    desc: "Track spend trends and build clearer reporting snapshots for decision making.",
    bullets: ["Monthly view", "Category trends", "Summary cards", "Insight ready"],
    accent: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-gradient-success",
  },
  {
    icon: Search,
    title: "Search & Filters",
    desc: "Find receipts quickly with flexible filters and smarter search controls.",
    bullets: ["Quick lookup", "Advanced filters", "Date range", "Keyword search"],
    accent: "from-cyan-500/10 to-sky-500/10",
    iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    desc: "Keep your receipts synced and accessible across devices in one workspace.",
    bullets: ["Cross-device", "Instant updates", "Backup safe", "Always available"],
    accent: "from-slate-500/10 to-zinc-500/10",
    iconBg: "bg-gradient-to-br from-slate-600 to-zinc-500",
  },
];

const FeaturesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Features - Receipt Vault";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <section className="container relative">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-card">
              Core Features
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Powerful tools for every receipt workflow
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore all six modules. Start with AI Receipt Capture today.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                bullets={feature.bullets}
                accent={feature.accent}
                iconBg={feature.iconBg}
                isClickable={Boolean(feature.route)}
                isComingSoon={!feature.route}
                onClick={feature.route ? () => navigate(feature.route) : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeaturesPage;
