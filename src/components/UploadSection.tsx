import { forwardRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type UploadSectionProps = {
  onImageSelected: (image: string) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const readFileAsBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read selected file."));
    };

    reader.onerror = () => reject(new Error("Unable to read selected file."));
    reader.readAsDataURL(file);
  });

export const UploadSection = forwardRef<HTMLInputElement, UploadSectionProps>(({ onImageSelected }, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFile = async (file: File | null) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Invalid file type. Please choose an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File is too large. Please upload an image under 5MB.");
      return;
    }

    try {
      const base64Image = await readFileAsBase64(file);
      setErrorMessage("");
      onImageSelected(base64Image);
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not process this file. Please try another image.");
    }
  };

  return (
    <div className="animate-fade-in rounded-3xl border border-border bg-gradient-card p-5 shadow-card sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <ImagePlus className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Upload Receipt</h2>
          <p className="text-sm text-muted-foreground">Click or drag & drop an image</p>
        </div>
      </div>

      <div
        className={`rounded-2xl border-2 border-dashed bg-background/70 p-8 text-center transition-smooth sm:p-10 ${
          isDragging ? "border-primary bg-accent/60" : "border-border"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const droppedFile = event.dataTransfer.files?.[0] ?? null;
          void handleFile(droppedFile);
        }}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0] ?? null;
            void handleFile(selectedFile);
            event.currentTarget.value = "";
          }}
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="mb-5 text-sm text-muted-foreground">Supported formats: JPG, PNG, WEBP. Max size: 5MB.</p>
        <Button
          type="button"
          variant="soft"
          onClick={() => {
            if (ref && "current" in ref && ref.current) {
              ref.current.click();
            }
          }}
        >
          Choose Image
        </Button>
      </div>

      {errorMessage && <p className="mt-4 text-sm font-medium text-destructive">{errorMessage}</p>}
    </div>
  );
});

UploadSection.displayName = "UploadSection";
