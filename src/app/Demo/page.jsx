"use client";

import SearchAutocomplete from "../../components/SearchAutocomplete";
import { apiUrls } from "../../utils/constants/api.constants";
import api from "../../utils/api.utils";
import { useSearchParams,useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { pagePaths } from "../../utils/constants/constant";
import {
  commonHeaderFixedHeight,
  generateUrl,
} from "../../utils/constants/common.constants";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search_term") || "");

  useEffect(() => {
    if (searchTerm.length >= 3) {
      fetchItems(searchTerm);
    } else {
      setItems([]);
    }
  }, [searchTerm]);
  // Function to preprocess and encode concern names
    const preprocessConcernName = (name) => {
    // Replace spaces and slashes with hyphens and collapse multiple hyphens
        let formattedName = name.replace(/\s+/g, "-").replace(/\//g, "-");
        formattedName = formattedName.replace(/-+/g, "-");
    
        return encodeURIComponent(formattedName);
    };
//   const fetchItems = async (term) => {
//     try {
//       const response = await api.get(`${apiUrls.productsSuggestions}?search_term=${term}`);
//       setItems([
//         ...response.data.brands,
//         ...response.data.categories,
//         ...response.data.products,
//         ...response.data.concerns,
//       ]);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setItems([]);
//     }
//   };
const fetchItems = async (term) => {
    try {
      console.log("Fetching suggestions for:", term);
      const response = await api.get(`${apiUrls.productsSuggestions}?search_term=${term}`);
      console.log("API Response:", response.data);
  
      const { brands, categories, products, concerns } = response.data;
  
      setItems([
        { type: "Brands", data: brands },
        { type: "Concerns", data: concerns },
        { type: "Categories", data: categories },
        { type: "Products", data: products },
      ]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setItems([]);
    }
  };
  

  const handleInputChange = (value) => {
    setSearchTerm(value); // Fix: Accepts the string directly instead of event
  };

//   const handleSelect = (item) => {
//     let searchPageUrl = `${pagePaths.products}?search_term=${searchTerm}`;
//     console.log(pagePaths.products,"Search Page Url");
    
//     if (item.type === "Category" && item.id) {

//         searchPageUrl = `/product-category/${item.slug}`;

//     }else if (item.type === "Concern" && item.name) {

//         // Navigate to /concern/{processed-name}
//         const processedName = preprocessConcernName(item.name);
//         searchPageUrl = `/concern/${processedName}`;

//       }else if (item.type === "Brand" && item.name) {
       
//         searchPageUrl = `/product-brands/${encodeURIComponent(item.name)}`;

//       }else if (item.type === "Brand" && item.name) {   

//         searchPageUrl = `/product-category/${item.slug}`;
//       }
  
//     router.push(encodeURI(searchPageUrl));
//   };

const handleSelect = (item,type) => {
    console.log(item);
    
    switch (type) {
        case "Categories":
          router.push(`/product-category/${item.slug}`);
          break;
        case "Concerns":
          router.push(`/concern/${preprocessConcernName(item.name)}`);
          break;
        case "Products":
          router.push(`${generateUrl(item)}`);
          break;
        case "Brands":
          router.push(`/product-brands/${item.name}`);
          break;
        default:
          console.warn("Unknown item type:", type);
      }
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Search for Skincare Products</h2>
      <SearchAutocomplete items={items} onSelect={handleSelect} onChange={handleInputChange} />
    </div>
  );
}
