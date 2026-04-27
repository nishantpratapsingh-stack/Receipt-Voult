import { parseReceiptText, type ExtractedReceiptData } from "@/utils/parseReceipt";

export type OCRExtractionResult = {
  rawText: string;
  data: ExtractedReceiptData;
};

const MAX_DIMENSION = 1600;

const optimizeImageForOCR = (image: string) =>
  new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (!context) {
        resolve(image);
        return;
      }

      context.imageSmoothingQuality = "high";
      context.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };

    img.onerror = () => resolve(image);
    img.src = image;
  });

export const extractReceiptFromImage = async (
  image: string,
): Promise<OCRExtractionResult> => {
  const optimizedImage = await optimizeImageForOCR(image);
  const { default: Tesseract } = await import("tesseract.js");
  const result = await Tesseract.recognize(optimizedImage, "eng");
  const rawText = result.data.text.trim();

  if (!rawText) {
    throw new Error("NO_TEXT_DETECTED");
  }

  return {
    rawText,
    data: parseReceiptText(rawText),
  };
};
