import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ReceiptContextValue = {
  capturedImage: string | null;
  uploadedImage: string | null;
  croppedImage: string | null;
  isCropping: boolean;
  sourceImage: string | null;
  finalImage: string | null;
  setCapturedImage: (image: string | null) => void;
  setUploadedImage: (image: string | null) => void;
  setCroppedImage: (image: string | null) => void;
  setIsCropping: (value: boolean) => void;
  startCaptureFlow: (image: string) => void;
  startUploadFlow: (image: string) => void;
  applyCrop: (image: string) => void;
  cancelCrop: () => void;
  resetFlow: () => void;
  clearCapturedImage: () => void;
};

const ReceiptContext = createContext<ReceiptContextValue | undefined>(undefined);

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const clearCapturedImage = () => {
    setCapturedImage(null);
  };

  const resetFlow = () => {
    setCapturedImage(null);
    setUploadedImage(null);
    setCroppedImage(null);
    setIsCropping(false);
  };

  const startCaptureFlow = (image: string) => {
    setCapturedImage(image);
    setUploadedImage(null);
    setCroppedImage(null);
    setIsCropping(true);
  };

  const startUploadFlow = (image: string) => {
    setUploadedImage(image);
    setCapturedImage(null);
    setCroppedImage(null);
    setIsCropping(true);
  };

  const applyCrop = (image: string) => {
    setCroppedImage(image);
    setIsCropping(false);
  };

  const cancelCrop = () => {
    resetFlow();
  };

  const sourceImage = uploadedImage ?? capturedImage;
  const finalImage = croppedImage ?? sourceImage;

  const value = useMemo(
    () => ({
      capturedImage,
      uploadedImage,
      croppedImage,
      isCropping,
      sourceImage,
      finalImage,
      setCapturedImage,
      setUploadedImage,
      setCroppedImage,
      setIsCropping,
      startCaptureFlow,
      startUploadFlow,
      applyCrop,
      cancelCrop,
      resetFlow,
      clearCapturedImage,
    }),
    [capturedImage, uploadedImage, croppedImage, isCropping, sourceImage, finalImage],
  );

  return <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>;
};

export const useReceipt = () => {
  const context = useContext(ReceiptContext);

  if (!context) {
    throw new Error("useReceipt must be used inside a ReceiptProvider.");
  }

  return context;
};
