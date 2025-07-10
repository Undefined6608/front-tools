type Procedure = (...args: unknown[]) => void;

type FormatTimeString = "{y}-{m}-{d} {h}:{i}:{s}" | string;
type TimeType = number | string | Date | undefined;
type TimeUnit =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "years";
type PlusDaysType = "time" | "date";

type StorageType = "string" | "json";

type CheckStrType =
  | "phone"
  | "tel"
  | "card"
  | "pwd"
  | "postal"
  | "QQ"
  | "email"
  | "money"
  | "URL"
  | "IP"
  | "number"
  | "english"
  | "chinese"
  | "lower"
  | "upper"
  | "HTML"
  | "date";

type MapPointType = {
  longitude: number;
  latitude: number;
};
