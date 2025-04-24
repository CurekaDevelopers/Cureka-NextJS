import CategoryListingPage from "./CategoryList";
import "../../../app/globals.css";
import { fetchProductsFromSlug } from "../../../redux/action";

export async function generateMetadata({ params }) {
  const slug = params?.categorySlug;
   let data = null;
    try {
      data = await fetchProductsFromSlug(slug);      
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  
    if (!data) {
      return {
        title: "Product Not Found",
        description: "Sorry, we couldn't find the product you're looking for.",
        openGraph: {
          title: "Product Not Found",
          description: "Sorry, we couldn't find the product you're looking for.",
          type: "website",
          image: "https://app.cureka.com/assets/images/logo.svg",
        },
      };
    }
  
    return {
      // title: product?.meta_title === "null" ? product?.vendor_article_name : product?.meta_title,
      // description: product?.meta_description,
      // openGraph: {
      //   title: product?.vendor_article_name || "Cureka",
      //   description: product?.meta_description,
      //   type: "website",
      //   image: "https://app.cureka.com/assets/images/logo.svg",
      // },
    };


}


export default async function CategoryPage({ params }) {
  const slugArr = await params?.categorySlug;
  // console.log("fetchProductsFromSlug slug:", params.categorySlug);
  function formatCategoryName(slugArr) {
    return slugArr
      .replace(/[-_]/g, ' ')           // Replace hyphens/underscores with space
      .replace(/\b\w/g, char => char.toUpperCase());  // Capitalize first letter of each word
  }
  const pageTitle = formatCategoryName(slugArr)
  // console.log(pageTitle,"pageTitle");
  
  const fullUrl = `https://app.cureka.com/product-category/${slugArr}`;

  let products = [];
  try {
    const result = await fetchProductsFromSlug(slugArr);
    console.log("The Result is -=-=-=",result.data.products);
    
    products = Array.isArray(result?.data.products) ? result.data.products : [];
    // console.log("Products",result);
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const structuredData = (() => {
    try {
      return {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: pageTitle,
    description: `Explore our collection of ${pageTitle} at Cureka.`,
    url: fullUrl,
    mainEntity: products.map((product) => ({
      "@type": "Product",
      name: product?.vendor_article_name,
      url: `https://app.cureka.com/shop/${product?.slug}`,
      image: product?.images?.[0],
      price: product?.final_price,
      priceCurrency: "INR",
      aggregateRating: product?.ratingCount
        ? {
            "@type": "AggregateRating",
            ratingValue: product.ratingCount.average,
            reviewCount: product.ratingCount.totalReviews,
          }
        : undefined,
      offers: {
        "@type": "Offer",
        price: product?.final_price,
        priceCurrency: "INR",
        availability:
          product?.stock_status === "In stock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
    })),
  };
} catch (err) {
  console.error("Failed to build structured data", err);
  return null;
}
})();

  return (
    <>
      <h1 className="seo-only-h1">{pageTitle}</h1>

      {/* Server-rendered JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <CategoryListingPage
        categorySlug={slugArr}
        
      />
    </>
  );
}

