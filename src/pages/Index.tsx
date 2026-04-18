import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Features } from "@/components/sections/Features";
import { ReceiptFeed } from "@/components/sections/ReceiptFeed";
import { Dashboard } from "@/components/sections/Dashboard";
import { CADashboard } from "@/components/sections/CADashboard";
import { Automation } from "@/components/sections/Automation";
import { Nudges } from "@/components/sections/Nudges";
import { Engagement } from "@/components/sections/Engagement";
import { ExportTrust } from "@/components/sections/ExportTrust";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA, Footer } from "@/components/sections/FinalCTA";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Receipt Vault — AI-Powered Receipt & GST Assistant";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Capture receipts automatically, track expenses, save GST, and manage everything effortlessly. Built for individuals and Chartered Accountants.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <ReceiptFeed />
        <Dashboard />
        <CADashboard />
        <Automation />
        <Nudges />
        <Engagement />
        <ExportTrust />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
