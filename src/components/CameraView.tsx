import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type CameraViewProps = {
  onCapture: (image: string) => void;
};

export const CameraView = ({ onCapture }: CameraViewProps) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cameraKey, setCameraKey] = useState(0);

  const handleCapture = useCallback(() => {
    const imageSource = webcamRef.current?.getScreenshot();

    if (!imageSource) {
      return;
    }

    onCapture(imageSource);
  }, [onCapture]);

  const handleCameraReady = useCallback(() => {
    setIsInitializing(false);
    setErrorMessage("");
  }, []);

  const handleCameraError = useCallback((error: string | DOMException) => {
    console.error("Camera access error:", error);
    setIsInitializing(false);
    setErrorMessage("Camera permission denied. Please allow camera access and try again.");
  }, []);

  const handleRetry = () => {
    setIsInitializing(true);
    setErrorMessage("");
    setCameraKey((currentKey) => currentKey + 1);
  };

  if (errorMessage) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive-soft/40 p-6 sm:p-8 shadow-card">
        <p className="mb-2 text-base font-semibold text-destructive">Camera access required</p>
        <p className="mb-5 text-sm text-muted-foreground">{errorMessage}</p>
        <Button type="button" variant="outline" onClick={handleRetry}>
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card shadow-card">
      <Webcam
        key={cameraKey}
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.92}
        videoConstraints={{ facingMode: "environment" }}
        onUserMedia={handleCameraReady}
        onUserMediaError={handleCameraError}
        className="h-[420px] w-full object-cover sm:h-[520px]"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="absolute left-1/2 top-1/2 h-[58%] w-[82%] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-dashed border-white/75 bg-white/10 shadow-inner" />
      </div>

      {isInitializing && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
          <p className="text-sm font-medium text-muted-foreground">Initializing camera...</p>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <Button
          type="button"
          variant="hero"
          size="icon"
          onClick={handleCapture}
          disabled={isInitializing}
          className="h-16 w-16 rounded-full border-4 border-background shadow-premium hover:scale-105"
          aria-label="Capture receipt"
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
