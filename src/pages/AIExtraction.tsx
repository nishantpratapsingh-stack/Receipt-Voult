import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCcw, Save, Upload } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { UploadSection } from "@/components/UploadSection";
import { ExtractionCard } from "@/components/ExtractionCard";
import { DataPreviewCard } from "@/components/DataPreviewCard";
import { Button } from "@/components/ui/button";
import { useReceipt } from "@/context/ReceiptContext";
import type { ExtractedReceiptData } from "@/utils/parseReceipt";
import { extractReceiptFromImage } from "@/utils/receiptParser";

const CAPTURE_STORAGE_KEY = "receipt-vault:capture";
const EXTRACTION_STORAGE_KEY = "receipt-vault:ai-extraction";

type SourceMode = "upload" | "captured";

const AIExtraction = () => {
  const { finalImage } = useReceipt();
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const [sourceMode, setSourceMode] = useState<SourceMode>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedReceiptData | null>(null);

  useEffect(() => {
    document.title = "AI Data Extraction - Receipt Vault";
  }, []);

  useEffect(() => {
    const storedCapture = localStorage.getItem(CAPTURE_STORAGE_KEY);
    setCapturedImage(finalImage ?? storedCapture ?? null);
  }, [finalImage]);

  const selectedImage = useMemo(
    () => (sourceMode === "upload" ? uploadedImage : capturedImage),
    [sourceMode, uploadedImage, capturedImage],
  );

  const resetExtractionData = () => {
    setRawText("");
    setErrorMessage("");
    setExtractedData(null);
  };

  const handleImageUpload = (image: string) => {
    setSourceMode("upload");
    setUploadedImage(image);
    resetExtractionData();
  };

  const handleExtractData = async () => {
    if (!selectedImage || loading) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const extracted = await extractReceiptFromImage(selectedImage);
      setRawText(extracted.rawText);
      setExtractedData(extracted.data);
    } catch (error) {
      console.error("AI extraction failed:", error);
      setRawText("");
      setExtractedData(null);
      setErrorMessage("Unable to extract data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!extractedData) {
      return;
    }

    localStorage.setItem(
      EXTRACTION_STORAGE_KEY,
      JSON.stringify({
        ...extractedData,
        rawText,
        savedAt: new Date().toISOString(),
      }),
    );

    console.log("Saved AI extracted data:", extractedData);
  };

  const handleReset = () => {
    if (sourceMode === "upload") {
      setUploadedImage(null);
    } else {
      setCapturedImage(null);
    }

    resetExtractionData();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <section className="container relative">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <div className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-card">
              AI Workflow
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              AI Data Extraction
            </h1>
            <p className="text-lg text-muted-foreground">
              Automatically extract key information from your receipts using AI
            </p>
          </div>

          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-xl border border-border bg-card p-3 shadow-md">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-smooth ${
                    sourceMode === "upload"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setSourceMode("upload")}
                >
                  Upload Receipt
                </button>
                <button
                  type="button"
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-smooth ${
                    sourceMode === "captured"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setSourceMode("captured")}
                >
                  Use Captured Receipt
                </button>
              </div>
            </div>

            {sourceMode === "upload" ? (
              <UploadSection ref={uploadInputRef} onImageSelected={handleImageUpload} />
            ) : !capturedImage ? (
              <div className="rounded-xl border border-border bg-card p-6 shadow-md">
                <p className="mb-3 text-sm text-muted-foreground">
                  No captured receipt found. Capture a receipt first, then come back for AI extraction.
                </p>
                <Button type="button" variant="outline" asChild>
                  <Link to="/receipt-capture">Go to Receipt Capture</Link>
                </Button>
              </div>
            ) : null}

            <ExtractionCard
              image={selectedImage}
              loading={loading}
              onExtract={handleExtractData}
              hasExtractedData={Boolean(extractedData)}
            />

            {errorMessage ? (
              <div className="rounded-xl border border-destructive/40 bg-destructive-soft/30 p-4 text-sm font-medium text-destructive shadow-md">
                {errorMessage}
              </div>
            ) : null}

            {extractedData ? (
              <>
                <DataPreviewCard
                  data={extractedData}
                  onDataChange={setExtractedData}
                  showControls={false}
                  showConfidence
                />

                <div className="rounded-xl border border-border bg-card p-4 shadow-md">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button type="button" variant="soft" onClick={handleReset} disabled={loading}>
                      <Upload className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleExtractData}
                      disabled={loading || !selectedImage}
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Re-Extract
                    </Button>
                    <Button type="button" variant="hero" onClick={handleSave} disabled={loading}>
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>

                {rawText ? (
                  <div className="rounded-xl border border-border bg-card p-4 shadow-md">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Raw OCR Text
                    </p>
                    <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap text-xs text-muted-foreground">
                      {rawText}
                    </pre>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AIExtraction;
