import { load } from "@cashfreepayments/cashfree-js";
import { env } from "../../src/config/env.config.js";

export async function initializeCashfree() {
  const cashfree = await load({
    mode: env.REACT_ENV === "development" ? "sandbox" : "production",
  });

  return cashfree;
}
