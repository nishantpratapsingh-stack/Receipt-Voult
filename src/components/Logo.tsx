import { Receipt } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 group ${className}`}>
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-smooth" />
      <div className="relative w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
        <Receipt className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
    </div>
    <span className="font-display font-bold text-xl tracking-tight">
      Receipt<span className="text-gradient">Vault</span>
    </span>
  </Link>
);
