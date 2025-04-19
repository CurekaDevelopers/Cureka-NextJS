import { headers } from "next/headers";
import { fetchProductBySlug } from "../../../redux/action";
import Productdetails from "./Productdetails"; // extract your current code to this file (or keep in same file)

export async function generateMetadata({ params }) {
  const hdrs = headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "";
  const proto = hdrs.get("x-forwarded-proto") || "https";

  // 2. Re‑assemble your path from params
  const path = Array.isArray(params.productSlug) ? `/shop/${params.productSlug.join("/")}` : `/shop/${params.productSlug}`;

  // 3. Build the full URL
  const fullUrl = `${proto}://${host}${path}`;
  const slug = params.productSlug;
  const slugInd = slug.length - 1;
  let product = null;

  try {
    // Fetch product data based on slug (or use other data fetching methods)
    product = await fetchProductBySlug(slug[slugInd]);
  } catch (err) {
    console.error("Error fetching product:", err);
  }

  if (!product) {
    // Return some default metadata if product doesn't exist
    return {
      title: "Product Not Found",
      description: "Sorry, we couldn't find the product you're looking for.",
      openGraph: {
        title: "Product Not Found",
        description: "Sorry, we couldn't find the product you're looking for.",
        url: fullUrl,
        type: "website",
        image: "https://app.cureka.com/assets/images/logo.svg",
      },
      jsonLd: {} // Optional: Empty or default JSON-LD schema
    };
  }

  // Return dynamic metadata
  return {
    title: product?.meta_title === "null" ? product?.vendor_article_name : product?.meta_title,
    description: product?.meta_description,
    openGraph: {
      url: fullUrl,
      type: "website",
      title: "Cureka",
      description: product?.meta_description,
      image: "https://app.cureka.com/assets/images/logo.svg",
    },
    jsonLd: {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product?.vendor_article_name,
      image: product?.images,
      description: product?.meta_description,
      sku: product?.sku_code,
      mpn: product?.vendor_sku_code,
      brand: {
        "@type": "Brand",
        name: product?.brand_name,
      },
      offers: {
        "@type": "Offer",
        url: fullUrl,
        priceCurrency: "INR",
        price: product?.final_price,
        itemCondition: "https://schema.org/NewCondition",
        availability: product?.stock_status === "In stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Cureka",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product?.ratingCount.average,
        reviewCount: product?.ratingCount.totalReviews,
      },
      review: product?.product_reviews?.map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.created_by,
        },
        datePublished: review.created_at,
        description: review.title,
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
        },
      })),
    },
  };
}
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