import { headers } from "next/headers";
import { fetchProductBySlug } from "../../../redux/action";
import Productdetails from "./Productdetails"; // extract your current code to this file (or keep in same file)

export default async function ProductPage({ params }) {
  
  const slug = params.productSlug;
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  let ssrProduct = null;

  if (/bot|crawl|slurp|spider|mediapartners/i.test(userAgent)) {
    try {
      ssrProduct = await fetchProductBySlug(slug);
    } catch (err) {
      console.error("SSR fetch failed for bot:", err);
    }
  }

  return <Productdetails productSlug={slug} ssrProduct={ssrProduct} />;
}