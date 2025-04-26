import CategoryListingPage from "./CategoryList";
import "../../../app/globals.css";
import { fetchProductsFromSlug } from "../../../redux/action";

export async function generateMetadata({ params }) {
  // const slug = params?.categorySlug;
 
  let result = null;
  let products = [];
  
  try {
    result = await fetchProductsFromSlug(slug);
    products = Array.isArray(result?.data?.products) ? result.data.products : [];
  } catch (err) {
    console.error("Error fetching product:", err);
  }
  
  // Use the first product's meta
  const product = products?.[0];
  
  if (!product) {
    return {
      title: "Products Not Found",
      description: "Sorry, we couldn't find the products you're looking for.",
      openGraph: {
        title: "Products Not Found",
        description: "Sorry, we couldn't find the products you're looking for.",
        type: "website",
        images: [
          {
            url: "https://app.cureka.com/assets/images/logo.svg",
            width: 800,
            height: 600,
            alt: "Cureka Logo",
          },
        ],
      },
    };
  }
  
  // Corrected fallback for meta title
  const metaTitle = product?.meta_title && product.meta_title !== "null"
    ? product.meta_title
    : product?.vendor_article_name || "Cureka";
  
  const metaDescription = product?.meta_description || "Find great products on Cureka.";
  
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `https://app.cureka.com/shop/${product?.slug}`,
      images: [
        {
          url: Array.isArray(product?.product_images) && product.product_images.length
            ? product.product_images[0]
            : "https://app.cureka.com/assets/images/logo.svg",
          width: 800,
          height: 600,
          alt: product?.vendor_article_name || "Product image",
        },
      ],
    },
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
    // console.log("The Result is -=-=-=",result.data.products);
    
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
      image: product?.product_images?.[0],
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

