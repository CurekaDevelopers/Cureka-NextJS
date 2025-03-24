"use client";

import { useState } from "react";
import Category from "./components/CategoriesManagementPage/page";
import SubCategory from "./components/SubCategoriesManagementPage/page";
import SubSubCategory from "./components/SubSubCategoriesManagementPage/page";
import SubSubSubCategory from "./components/SubSubSubCategoriesManagementPage/page";
import PreferenceTypeManagement from "./components/PreferenceTypeManagementPage/page";
import ArticalTypeManagementPage from "../ArticalTypeManagementPage/page";

const CategoriesManagementPage = () => {
  const [activeTab, setActiveTab] = useState("Category");

  const renderContent = () => {
    switch (activeTab) {
      case "Category":
        return <Category />;
      case "Sub Category":
        return <SubCategory />;
      case "Sub Sub Category":
        return <SubSubCategory />;
      case "Sub Sub Sub Category":
        return <SubSubSubCategory />;
      case "Article Type Management":
        return <ArticalTypeManagementPage />;
      case "Preference Type Management":
        return <PreferenceTypeManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4 border-b border-gray-300 pb-2">
        {[
          "Category",
          "Sub Category",
          "Sub Sub Category",
          "Sub Sub Sub Category",
          "Article Type Management",
          "Preference Type Management",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="content-area">{renderContent()}</div>
    </div>
  );
};

export default CategoriesManagementPage;
