import { useMemo, useState } from "react";
import { AlertTriangle, Edit3, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  ConfidenceLevel,
  ExtractedReceiptData,
  ReceiptCategory,
} from "@/utils/parseReceipt";

type DataPreviewCardProps = {
  data: ExtractedReceiptData;
  onDataChange: (value: ExtractedReceiptData) => void;
  onSave?: () => void;
  showControls?: boolean;
  showConfidence?: boolean;
};

const CATEGORY_OPTIONS: ReceiptCategory[] = [
  "Food",
  "Travel",
  "Shopping",
  "Utilities",
  "Other",
];

const confidenceTone = (confidence: ConfidenceLevel) => {
  if (confidence === "High") {
    return "bg-success/20 text-success border-success/40";
  }

  if (confidence === "Medium") {
    return "bg-warning/20 text-warning border-warning/40";
  }

  return "bg-destructive/20 text-destructive border-destructive/40";
};

const confidenceBorder = (confidence?: ConfidenceLevel, showConfidence?: boolean) => {
  if (!showConfidence || !confidence) {
    return "";
  }

  if (confidence === "Low") {
    return "border-destructive/60 focus-visible:ring-destructive/40";
  }

  if (confidence === "Medium") {
    return "border-warning/60 focus-visible:ring-warning/40";
  }

  return "";
};

export const DataPreviewCard = ({
  data,
  onDataChange,
  onSave,
  showControls = true,
  showConfidence = false,
}: DataPreviewCardProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const allowEditing = showControls ? isEditing : true;

  const fields = useMemo(
    () => [
      {
        key: "vendor",
        label: "Vendor Name",
        placeholder: "Enter vendor name",
        confidence: data.confidence.vendor,
      },
      {
        key: "amount",
        label: "Total Amount",
        placeholder: "Enter amount",
        confidence: data.confidence.amount,
      },
      {
        key: "date",
        label: "Date",
        placeholder: "Enter date",
        confidence: data.confidence.date,
      },
      {
        key: "gst",
        label: "GST Number",
        placeholder: "Enter GST number",
        confidence: undefined,
      },
    ] as const,
    [data.confidence.amount, data.confidence.date, data.confidence.vendor],
  );

  const handleTextFieldChange = (
    key: keyof Pick<ExtractedReceiptData, "vendor" | "amount" | "date" | "gst">,
    value: string,
  ) => {
    onDataChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-md">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Extracted Receipt Data
          </h2>
          <p className="text-sm text-muted-foreground">
            Review and edit extracted data if needed
          </p>
        </div>

        {showControls && onSave ? (
          <div className="flex items-center gap-2">
            <Button type="button" variant="soft" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4" />
              Edit
            </Button>
            <Button
              type="button"
              variant="hero"
              onClick={() => {
                onSave();
                setIsEditing(false);
              }}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        ) : null}
      </div>

      {showConfidence ? (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-border bg-background/60 p-3 text-xs text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-warning" />
          Confidence helps identify fields that may need manual correction.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor={`receipt-${field.key}`}>{field.label}</Label>
              {showConfidence && field.confidence ? (
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${confidenceTone(field.confidence)}`}
                >
                  {field.confidence}
                </span>
              ) : null}
            </div>
            <Input
              id={`receipt-${field.key}`}
              value={data[field.key]}
              placeholder={field.placeholder}
              onChange={(event) =>
                handleTextFieldChange(field.key, event.target.value)
              }
              disabled={!allowEditing}
              className={confidenceBorder(field.confidence, showConfidence)}
            />
          </div>
        ))}

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="receipt-category">Category</Label>
          <select
            id="receipt-category"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={data.category}
            onChange={(event) =>
              onDataChange({
                ...data,
                category: event.target.value as ReceiptCategory,
              })
            }
            disabled={!allowEditing}
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
