import BrandList from "./BrandList";
import "../../../app/globals.css"
import { fetchProductsForBrand } from "../../../redux/action";
import { apiUrls } from "@/utils/constants/api.constants";
import api from "@/utils/api.utils";

export async function generateMetadata({ params }) {
  const slugArr = params?.brandSlug;
  const fullUrl = `https://app.cureka.com/product-brands/${slugArr}`;

  const fetchProductsForBrandSSR = async (slugArr) => {
    try {
      const { data } = await api.get(apiUrls.brandProduct + "/" + slugArr);
      return data? data : [];
    } catch (error) {
      console.error("Error fetching products:", error?.message);
      return [];
    }
  };
  
  try {
    const data = await fetchProductsForBrandSSR(slugArr);
    const brandData = data?.catadata;

    return {
      title: brandData?.metaTitle || brandData?.name,
      description: brandData?.metaDescription || `Explore ${brandData?.name} products on Cureka.`,
      openGraph: {
        title: brandData?.metaTitle || brandData?.name,
        description: brandData?.metaDescription,
        url: fullUrl,
        images: [
          {
            url: brandData?.image,
            alt: brandData?.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error?.message);
    return {
      title: "Brand Page | Cureka",
      description: "Explore trusted brands on Cureka.",
    };
  }


}


export default async function BrandPage({ params }) {
  const slugArr = await params?.brandSlug;
  
  console.log(slugArr,"slugArr");
  
  const fullUrl = `https://app.cureka.com/product-brands/${slugArr}`;

  const fetchProductsForBrandSSR = async (slugArr) => {
    try {
      const { data } = await api.get(apiUrls.brandProduct + "/" + slugArr);
      return data? data : [];
    } catch (error) {
      console.error("Error fetching products:", error?.message);
      return [];
    }
  };
  const data = await fetchProductsForBrandSSR(slugArr);
  // console.log(data.catadata,"Data");
  const brandData = data?.catadata;
  
  const structuredData = (() => {
    try {
      return {
          "@context": "https://schema.org/",
          "@type": "Brand",
          "name": brandData?.name,
          "url": fullUrl,
          "logo": brandData?.image,
          "description": brandData?.metaDescription,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
          }       
        
  };
} catch (err) {
  console.error("Failed to build structured data", err);
  return null;
}
})();

  return (
    <>
      <h1 className="seo-only-h1">{brandData?.name}</h1>

      {/* Server-rendered JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BrandList
        brandSlug={slugArr}        
      />
    </>
  );
}

