import { useEffect, useRef, useState } from "react";
import { CameraSection } from "@/components/CameraSection";
import { DataPreviewCard } from "@/components/DataPreviewCard";
import { Navbar } from "@/components/Navbar";
import { OCRProcessor } from "@/components/OCRProcessor";
import { PreviewCard } from "@/components/PreviewCard";
import { UploadSection } from "@/components/UploadSection";
import { useReceipt } from "@/context/ReceiptContext";
import type { ExtractedReceiptData } from "@/utils/parseReceipt";

const ReceiptCapture = () => {
  const {
    finalImage,
    setCapturedImage,
    setUploadedImage,
    setCroppedImage,
    setIsCropping,
    resetFlow,
  } = useReceipt();
  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const [rawText, setRawText] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedReceiptData | null>(null);
  const [loading, setLoading] = useState(false);
  const [extractionError, setExtractionError] = useState("");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = "Receipt Capture - Receipt Vault";
  }, []);

  useEffect(() => {
    if (!finalImage) {
      setRawText("");
      setExtractedData(null);
      setLoading(false);
      setExtractionError("");
      return;
    }

    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [finalImage]);

  const resetExtractionState = () => {
    setRawText("");
    setExtractedData(null);
    setLoading(false);
    setExtractionError("");
  };

  const handleCapture = (image: string) => {
    setCapturedImage(image);
    setUploadedImage(null);
    setCroppedImage(null);
    setIsCropping(false);
    resetExtractionState();
  };

  const handleUpload = (image: string) => {
    setUploadedImage(image);
    setCapturedImage(null);
    setCroppedImage(null);
    setIsCropping(false);
    resetExtractionState();
  };

  const handleRetake = () => {
    resetFlow();
    setMode("camera");
    resetExtractionState();
  };

  const handleSave = () => {
    if (!finalImage) {
      return;
    }

    localStorage.setItem("receipt-vault:capture", finalImage);
    console.log("Saved final receipt image:", finalImage);
  };

  const handleReupload = () => {
    resetFlow();
    setMode("upload");
    resetExtractionState();
    requestAnimationFrame(() => {
      uploadInputRef.current?.click();
    });
  };

  const handleSaveExtractedData = () => {
    if (!extractedData) {
      return;
    }

    localStorage.setItem("receipt-vault:extracted-data", JSON.stringify(extractedData));
    console.log("Saved extracted receipt data:", extractedData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="container relative">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-card">
              AI Receipt Capture
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Receipt Capture</h1>
            <p className="text-lg text-muted-foreground">Scan or upload your receipts</p>
          </div>

          <div ref={contentRef} className="mx-auto max-w-4xl space-y-5 transition-smooth">
            {!finalImage ? (
              <div className="rounded-3xl border border-border bg-card p-3 shadow-card sm:p-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("camera")}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      mode === "camera"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Use Camera
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("upload")}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      mode === "upload"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            ) : null}

            {finalImage ? (
              <>
                <PreviewCard image={finalImage} onRetake={handleRetake} onReupload={handleReupload} onSave={handleSave} />
                <OCRProcessor
                  image={finalImage}
                  loading={loading}
                  rawText={rawText}
                  errorMessage={extractionError}
                  onLoadingChange={setLoading}
                  onRawTextChange={setRawText}
                  onExtractedDataChange={setExtractedData}
                  onErrorChange={setExtractionError}
                />
                {extractedData ? (
                  <DataPreviewCard data={extractedData} onDataChange={setExtractedData} onSave={handleSaveExtractedData} />
                ) : null}
              </>
            ) : mode === "camera" ? (
              <CameraSection onCapture={handleCapture} />
            ) : (
              <UploadSection ref={uploadInputRef} onImageSelected={handleUpload} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReceiptCapture;
