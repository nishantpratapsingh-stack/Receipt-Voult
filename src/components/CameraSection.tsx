import { CameraView } from "@/components/CameraView";

type CameraSectionProps = {
  onCapture: (image: string) => void;
};

export const CameraSection = ({ onCapture }: CameraSectionProps) => {
  return <CameraView onCapture={onCapture} />;
};
