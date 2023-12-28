import { Variant } from "@/types";

export const variantMapper: Record<string, Variant> = {
  pending: "info" as Variant,
  confirmed: "success",
  rejected: "destructive",
  unknown: "warning" as Variant,
};

export const translate: Record<string, string> = {
  buy: "خرید",
  sell: "فروش",
  pending: "در انتظار",
  confirmed: "تایید شده",
  rejected: "رد شده",
  unknown: "نامشخص",
};
