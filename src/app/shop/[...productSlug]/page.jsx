import { headers } from "next/headers";
import Script from "next/script";
import { fetchProductBySlug } from "../../../redux/action";
import Productdetails from "./Productdetails";
import '../../../app/globals.css';

export async function generateMetadata({ params }) {
  const hdrs = headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "";
  const proto = hdrs.get("x-forwarded-proto") || "https";

  const path = Array.isArray(params.productSlug) ? `/shop/${params.productSlug.join("/")}`: `/shop/${params.productSlug}`;
  const fullUrl = `${proto}://${host}${path}`;
  const slug = params.productSlug;
  const slugInd = slug.length - 1;
  let product = null;

  try {
    product = await fetchProductBySlug(slug[slugInd]);
  } catch (err) {
    console.error("Error fetching product:", err);
  }

  if (!product) {
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
    };
  }

  return {
    title:
      product?.meta_title === "null"
        ? product?.vendor_article_name
        : product?.meta_title,
    description: product?.meta_description,
    openGraph: {
      url: fullUrl,
      type: "website",
      title: "Cureka",
      description: product?.meta_description,
      image: "https://app.cureka.com/assets/images/logo.svg",
    },
  };
}

export default async function ProductPage({ params }) {
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const slug = params.productSlug;
  const slugInd = slug.length - 1;
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "https";

  const fullUrl = `${proto}://${host}/shop/${slug.join("/")}`;

  let isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);
  let ssrProduct = null;

  if (isBot) {
    try {
      ssrProduct = await fetchProductBySlug(slug[slugInd]);
    } catch (err) {
      console.error("SSR fetch failed for bot:", err);
    }
  }

  return (
    <>
      {isBot && (
        <>
          <h1 className="seo-only-h1">
            {toTitleCase(slug[slugInd].replace(/-/g, " "))}
          </h1>
          {ssrProduct && (
            <Script id="product-schema" type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Product",
                name: ssrProduct?.vendor_article_name,
                image: ssrProduct?.images,
                description: ssrProduct?.meta_description,
                sku: ssrProduct?.sku_code,
                mpn: ssrProduct?.vendor_sku_code,
                brand: {
                  "@type": "Brand",
                  name: ssrProduct?.brand_name,
                },
                offers: {
                  "@type": "Offer",
                  url: fullUrl,
                  priceCurrency: "INR",
                  price: ssrProduct?.final_price,
                  itemCondition: "https://schema.org/NewCondition",
                  availability:
                    ssrProduct?.stock_status === "In stock"
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                  seller: {
                    "@type": "Organization",
                    name: "Cureka",
                  },
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: ssrProduct?.ratingCount?.average,
                  reviewCount: ssrProduct?.ratingCount?.totalReviews,
                },
                review: ssrProduct?.product_reviews?.map((review) => ({
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
              })}
            </Script>
          )}
        </>
      )}
      <Productdetails productSlug={slug} ssrProduct={ssrProduct} />
    </>
  );
}