// utils/loadShiprocket.js

export const loadShiprocketScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Not in browser");

    if (window.HeadlessCheckout) {
      return resolve(true);
    }

    const existingScript = document.getElementById("shiprocket-checkout");
    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () =>
        reject("❌ Shiprocket checkout script failed to load");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.shiprocket.in/checkout-v2/checkout.js";
    script.async = true;
    script.id = "shiprocket-checkout";

    script.onload = () => {
      console.log("✅ Shiprocket script loaded");
      resolve(true);
    };

    script.onerror = (err) => {
      console.error("❌ Failed to load Shiprocket checkout script", err);
      reject(err);
    };

    document.body.appendChild(script);
  });
};
