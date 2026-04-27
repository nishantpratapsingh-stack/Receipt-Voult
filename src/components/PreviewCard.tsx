import { RotateCcw, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type PreviewCardProps = {
  image: string;
  onRetake: () => void;
  onReupload: () => void;
  onSave: () => void;
};

export const PreviewCard = ({ image, onRetake, onReupload, onSave }: PreviewCardProps) => {
  return (
    <div className="animate-fade-in rounded-3xl border border-border bg-gradient-card p-5 shadow-card sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Receipt Preview</h2>
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Ready to save
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30">
        <img src={image} alt="Captured receipt preview" className="max-h-[560px] w-full object-contain" />
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="soft" size="lg" onClick={onRetake}>
          <RotateCcw className="h-4 w-4" />
          Retake
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onReupload}>
          <Upload className="h-4 w-4" />
          Reupload
        </Button>
        <Button type="button" variant="hero" size="lg" onClick={onSave}>
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
};
