import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { Crop, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCroppedImage } from "@/lib/cropImage";
import "react-easy-crop/react-easy-crop.css";

type CropEditorProps = {
  image: string;
  onApply: (image: string) => void;
  onCancel: () => void;
};

export const CropEditor = ({ image, onApply, onCancel }: CropEditorProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels) {
      setErrorMessage("Please adjust the crop area before applying.");
      return;
    }

    try {
      setIsApplying(true);
      setErrorMessage("");
      const croppedImage = await getCroppedImage(image, croppedAreaPixels);
      onApply(croppedImage);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to crop image. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="animate-fade-in rounded-3xl border border-border bg-gradient-card p-5 shadow-card sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <Crop className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Crop Receipt</h2>
          <p className="text-sm text-muted-foreground">Adjust the frame and apply crop</p>
        </div>
      </div>

      <div className="relative mb-5 h-[420px] overflow-hidden rounded-2xl border border-border bg-secondary/30 sm:h-[520px]">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          cropShape="rect"
          showGrid={false}
          objectFit="contain"
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Zoom</span>
          <span className="text-muted-foreground">{zoom.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
        />
      </div>

      {errorMessage && <p className="mb-4 text-sm font-medium text-destructive">{errorMessage}</p>}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="soft" size="lg" onClick={onCancel}>
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <Button type="button" variant="hero" size="lg" disabled={isApplying} onClick={handleApplyCrop}>
          <Crop className="h-4 w-4" />
          {isApplying ? "Applying..." : "Apply Crop"}
        </Button>
      </div>
    </div>
  );
};
