import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  accent: string;
  iconBg: string;
  isClickable?: boolean;
  isComingSoon?: boolean;
  onClick?: () => void;
};

const FeatureCardBody = ({
  icon: Icon,
  title,
  desc,
  bullets,
  iconBg,
  isComingSoon,
}: Omit<FeatureCardProps, "accent" | "isClickable" | "onClick">) => (
  <div className="relative">
    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} shadow-soft group-hover:scale-110 transition-smooth`}>
      <Icon className="h-6 w-6 text-primary-foreground" />
    </div>
    <div className="mb-2 flex items-center justify-between gap-2">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      {isComingSoon ? (
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Coming Soon
        </span>
      ) : null}
    </div>
    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    <div className="flex flex-wrap gap-1.5">
      {bullets.map((bullet) => (
        <span key={bullet} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {bullet}
        </span>
      ))}
    </div>
  </div>
);

export const FeatureCard = ({
  icon,
  title,
  desc,
  bullets,
  accent,
  iconBg,
  isClickable = false,
  isComingSoon = false,
  onClick,
}: FeatureCardProps) => {
  const cardClassName =
    "group relative overflow-hidden rounded-3xl border border-border bg-gradient-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elevated";

  if (isClickable && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${cardClassName} w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        aria-label={`Open ${title}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-smooth group-hover:opacity-100`} />
        <FeatureCardBody
          icon={icon}
          title={title}
          desc={desc}
          bullets={bullets}
          iconBg={iconBg}
          isComingSoon={isComingSoon}
        />
      </button>
    );
  }

  return (
    <div className={cardClassName}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-smooth group-hover:opacity-100`} />
      <FeatureCardBody
        icon={icon}
        title={title}
        desc={desc}
        bullets={bullets}
        iconBg={iconBg}
        isComingSoon={isComingSoon}
      />
    </div>
  );
};
