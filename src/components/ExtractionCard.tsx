import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type ExtractionCardProps = {
  image: string | null;
  loading: boolean;
  onExtract: () => void;
  hasExtractedData: boolean;
};

export const ExtractionCard = ({
  image,
  loading,
  onExtract,
  hasExtractedData,
}: ExtractionCardProps) => {
  const extractLabel = hasExtractedData ? "Extract Again" : "Extract Data";

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">Receipt Image</h2>
          <p className="text-sm text-muted-foreground">
            Review the receipt before extraction
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-background/50">
        {image ? (
          <img
            src={image}
            alt="Selected receipt for extraction"
            className="max-h-[520px] w-full object-contain"
          />
        ) : (
          <div className="flex h-60 items-center justify-center p-6 text-center text-sm text-muted-foreground">
            Select a receipt image to start AI extraction.
          </div>
        )}

        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground">Analyzing receipt...</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
        <Button type="button" variant="hero" onClick={onExtract} disabled={!image || loading}>
          <Sparkles className="h-4 w-4" />
          {extractLabel}
        </Button>
      </div>
    </div>
  );
};
