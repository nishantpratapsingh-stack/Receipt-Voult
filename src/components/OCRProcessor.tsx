import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExtractedReceiptData } from "@/utils/parseReceipt";
import { extractReceiptFromImage } from "@/utils/receiptParser";

type OCRProcessorProps = {
  image: string;
  loading: boolean;
  rawText: string;
  errorMessage: string;
  onLoadingChange: (value: boolean) => void;
  onRawTextChange: (value: string) => void;
  onExtractedDataChange: (value: ExtractedReceiptData | null) => void;
  onErrorChange: (value: string) => void;
};

export const OCRProcessor = ({
  image,
  loading,
  rawText,
  errorMessage,
  onLoadingChange,
  onRawTextChange,
  onExtractedDataChange,
  onErrorChange,
}: OCRProcessorProps) => {
  const handleExtractData = async () => {
    onLoadingChange(true);
    onErrorChange("");

    try {
      const extracted = await extractReceiptFromImage(image);
      onRawTextChange(extracted.rawText);
      onExtractedDataChange(extracted.data);
    } catch (error) {
      console.error("OCR extraction failed:", error);
      onRawTextChange("");
      onExtractedDataChange(null);
      onErrorChange(
        error instanceof Error && error.message === "NO_TEXT_DETECTED"
          ? "No readable text found. Please try a clearer receipt image."
          : "Unable to extract data. Please try again.",
      );
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="animate-fade-in rounded-3xl border border-border bg-gradient-card p-5 shadow-card sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">AI Data Extraction</h2>
          <p className="text-sm text-muted-foreground">Run OCR and parse key receipt fields</p>
        </div>
        <Button type="button" variant="hero" onClick={handleExtractData} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Extracting data..." : "Extract Data"}
        </Button>
      </div>

      {errorMessage && <p className="text-sm font-medium text-destructive">{errorMessage}</p>}

      {loading && <p className="text-sm text-muted-foreground">Extracting data...</p>}

      {rawText && !loading && (
        <div className="mt-4 rounded-2xl border border-border bg-background/70 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Raw OCR Text</p>
          <pre className="max-h-36 overflow-y-auto whitespace-pre-wrap text-xs text-muted-foreground">{rawText}</pre>
        </div>
      )}
    </div>
  );
};
