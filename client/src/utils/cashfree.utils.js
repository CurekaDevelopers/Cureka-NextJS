import { load } from "@cashfreepayments/cashfree-js";
import { env } from "../config/env.config";

export async function initializeCashfree() {
  const cashfree = await load({
    mode: env.REACT_ENV === "development" ? "sandbox" : "production",
  });

  return cashfree;
}
