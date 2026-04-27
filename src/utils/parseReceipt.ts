export type ReceiptCategory =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Utilities"
  | "Other";

export type ConfidenceLevel = "High" | "Medium" | "Low";

export type ReceiptConfidence = {
  vendor: ConfidenceLevel;
  amount: ConfidenceLevel;
  date: ConfidenceLevel;
};

export type ExtractedReceiptData = {
  vendor: string;
  amount: string;
  date: string;
  gst: string;
  category: ReceiptCategory;
  confidence: ReceiptConfidence;
};

const AMOUNT_REGEX = /(?:₹|\$|rs\.?|inr)?\s?\d+(?:[.,]\d{1,2})?/gi;
const GST_REGEX = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]/i;
const DATE_PATTERNS = [
  /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/,
  /\b\d{4}[/-]\d{1,2}[/-]\d{1,2}\b/,
  /\b\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+\d{2,4}\b/i,
  /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+\d{1,2},?\s+\d{2,4}\b/i,
];

const CATEGORY_KEYWORDS: Record<ReceiptCategory, string[]> = {
  Food: ["pizza", "cafe", "restaurant", "zomato", "swiggy", "food"],
  Travel: ["uber", "ola", "taxi", "fuel", "petrol", "flight", "travel"],
  Shopping: ["amazon", "flipkart", "mall", "shopping", "store"],
  Utilities: ["electricity", "water", "broadband", "internet", "bill", "recharge"],
  Other: [],
};

export const cleanReceiptText = (text: string) => {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim()
    .toLowerCase();
};

const normalizeAmount = (value: string) => {
  return value.replace(/[₹$,]/g, "").replace(/(rs\.?|inr)\s?/gi, "").trim();
};

const parseAmountValue = (value: string) => {
  const normalized = normalizeAmount(value).replace(/,/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const extractAmount = (
  rawText: string,
  cleanedText: string,
): { value: string; confidence: ConfidenceLevel } => {
  const keywordLines = rawText
    .split(/\r?\n/)
    .filter((line) => /grand total|total|amount/i.test(line));

  const candidates: number[] = [];
  for (const line of keywordLines) {
    const matches = line.match(AMOUNT_REGEX) ?? [];
    for (const match of matches) {
      const parsed = parseAmountValue(match);
      if (parsed !== null) {
        candidates.push(parsed);
      }
    }
  }

  if (candidates.length > 0) {
    return {
      value: Math.max(...candidates).toFixed(2),
      confidence: "High",
    };
  }

  const fallbackMatches = cleanedText.match(AMOUNT_REGEX) ?? [];
  const fallbackValues = fallbackMatches
    .map(parseAmountValue)
    .filter((value): value is number => value !== null);

  if (fallbackValues.length === 0) {
    return { value: "", confidence: "Low" };
  }

  return {
    value: Math.max(...fallbackValues).toFixed(2),
    confidence: "Medium",
  };
};

const extractDate = (
  cleanedText: string,
): { value: string; confidence: ConfidenceLevel } => {
  for (const pattern of DATE_PATTERNS) {
    const match = cleanedText.match(pattern);
    if (match) {
      const value = match[0];
      const confidence =
        /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2}/.test(value)
          ? "High"
          : "Medium";
      return { value, confidence };
    }
  }

  return { value: "", confidence: "Low" };
};

const extractVendor = (
  rawText: string,
): { value: string; confidence: ConfidenceLevel } => {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5);

  if (lines.length === 0) {
    return { value: "", confidence: "Low" };
  }

  const uppercaseCandidate = lines.find(
    (line) => /^[^0-9]{3,}$/.test(line) && line === line.toUpperCase(),
  );
  if (uppercaseCandidate) {
    return {
      value: uppercaseCandidate
        .replace(/\s{2,}/g, " ")
        .replace(/[^a-zA-Z0-9 &.,'-]/g, "")
        .trim(),
      confidence: "High",
    };
  }

  const fallbackCandidate = lines.find((line) => /^[^0-9]{3,}$/.test(line)) ?? lines[0];
  return {
    value: fallbackCandidate
      .replace(/\s{2,}/g, " ")
      .replace(/[^a-zA-Z0-9 &.,'-]/g, "")
      .trim(),
    confidence: "Medium",
  };
};

const extractGstNumber = (rawText: string) => {
  const match = rawText.toUpperCase().match(GST_REGEX);
  return match?.[0] ?? "";
};

const detectCategory = (cleanedText: string): ReceiptCategory => {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as Array<
    [ReceiptCategory, string[]]
  >) {
    if (keywords.some((keyword) => cleanedText.includes(keyword))) {
      return category;
    }
  }

  return "Other";
};

export const parseReceiptText = (rawText: string): ExtractedReceiptData => {
  const cleanedText = cleanReceiptText(rawText);
  const vendor = extractVendor(rawText);
  const amount = extractAmount(rawText, cleanedText);
  const date = extractDate(cleanedText);

  return {
    vendor: vendor.value,
    amount: amount.value,
    date: date.value,
    gst: extractGstNumber(rawText),
    category: detectCategory(cleanedText),
    confidence: {
      vendor: vendor.confidence,
      amount: amount.confidence,
      date: date.confidence,
    },
  };
};
