import SubCategoryList from "./SubCategoryList";
import "../../../../app/globals.css";
import { fetchProductsFromSubCategorySlug } from "../../../../redux/action";

export async function generateMetadata({ params }) {
  const slugArr = await params?.subCategorySlug;
  console.log(slugArr,"=-=-=--=-slugArr=-=-=-");
  
  // let products = [];
  //   try {
  //     const result = await fetchProductsFromSubCategorySlug(slugArr);
  //     // console.log("The Result is -=-=-=",result.data.products);    
  //     products = Array.isArray(result?.data.products) ? result.data.products : [];   
  //     // console.log("Products",products);  
  //   } catch (err) {
  //     console.error("Error fetching product:", err);
  //   }
  
  //   // Get the first product to use its meta data
  // const product = products?.[0];

  // if (!product) {
  //   return {
  //     title: "Products Not Found",
  //     description: "Sorry, we couldn't find the products you're looking for.",
  //     openGraph: {
  //       title: "Products Not Found",
  //       description: "Sorry, we couldn't find the products you're looking for.",
  //       type: "website",
  //       images: [
  //         {
  //           url: "https://beta.cureka.com/assets/images/logo.svg",
  //           width: 800,
  //           height: 600,
  //           alt: "Cureka Logo",
  //         },
  //       ],
  //     },
  //   };
  // }

  // return {
  //   title: product?.meta_title === "null" ? product?.vendor_article_name : product?.meta_title,
  //   description: product?.meta_description,
  //   openGraph: {
  //     title: product?.vendor_article_name || "Cureka",
  //     description: product?.meta_description,
  //     type: "website",
  //     url: `https://beta.cureka.com/shop/${product?.slug}`,
  //     images: [
  //       {
  //         url: product?.product_images?.[0] || "https://beta.cureka.com/assets/images/logo.svg",
  //         width: 800,
  //         height: 600,
  //         alt: product?.vendor_article_name,
  //       },
  //     ],
  //   },
  // };


}


export default async function SubCategoryPage({ params }) {
  const slugArr = await params?.subCategorySlug;
  function formatCategoryName(slug) {
    return slug
      .replace(/[-_]/g, ' ') // Replace - and _ with space
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
  }
  const pageTitle = formatCategoryName(slugArr)
  // console.log(pageTitle,"pageTitle");
  
  const fullUrl = `https://beta.cureka.com/product-category/${slugArr}`;

  let products = [];
  try {
    const result = await fetchProductsFromSubCategorySlug(slugArr);
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
      url: `https://beta.cureka.com/shop/${product?.slug}`,
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

      <SubCategoryList
        subCategorySlug={slugArr}        
      />
    </>
  );
}

