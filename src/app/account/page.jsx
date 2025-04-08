"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  PackageOpen,
  Map,
  Wallet,
  Heart,
  Ticket,
  User,
  LogOut,
} from "lucide-react";
import Footer from "../../views/Footer";
import Header from "../../views/Header";
import { pagePaths } from "../../utils/constants/constant";
import "../../styles/orders.css";

// Assuming ScrollToTop and houseChimney are defined or imported somewhere
import ScrollToTop from "../../views/ScrollToTop";
import houseChimney from "../../public/images/house-chimney.png";
import Image from "next/image";
const AccountTab = dynamic(() => import("./components/AccountTab"));
const OrdersTab = dynamic(() => import("./components/OrdersTab"));
const AddressTab = dynamic(() => import("./components/AddressTab"));
const MyCouponsTab = dynamic(() => import("./components/MyCouponsTab"));
const MyWalletTab = dynamic(() => import("./components/MyWalletTab"));
const MyWishlistTab = dynamic(() => import("./components/MyWishlistTab"));

export default function Orders() {
  const tabData = [
    { key: "my-orders", label: "My Orders", icon: PackageOpen },
    { key: "address", label: "Address", icon: Map },
    { key: "my-wallet", label: "My Wallet", icon: Wallet },
    { key: "my-wishlist", label: "My Wishlist", icon: Heart },
    { key: "my-coupons", label: "My Coupons", icon: Ticket },
    { key: "my-account", label: "My Account", icon: User },
  ];

  const tabs = [
    { value: "my-account", tabElement: AccountTab },
    { value: "my-orders", tabElement: OrdersTab },
    { value: "address", tabElement: AddressTab },
    { value: "my-wallet", tabElement: MyWalletTab },
    { value: "my-wishlist", tabElement: MyWishlistTab },
    { value: "my-coupons", tabElement: MyCouponsTab },
  ];

  const [activeTab, setActiveTab] = useState("my-account");
  const ActiveComponent = tabs.find(
    (tab) => tab.value === activeTab
  )?.tabElement;

  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header showCategoryNavbar={false} />
      <div className="container-fluid px-0 mt-5">
        <div className="container">
          <div className="d-flex home-back-section pt-1 ">
            <a href={pagePaths.home}>
              <Image
                className="img-fluid d-flex align-self-center home mt-12"
                src={houseChimney}
                width={16}
                height={16}
                alt="home-icon"
              />
            </a>
            <p className="section mb-0 ml-3 mt-5">
              /&nbsp;&nbsp;&nbsp;My Account
            </p>
          </div>
        </div>
        <div className="bottom-border"></div>
      </div>

      <div className="flex gap-8 p-6">
        {/* Sidebar */}
        <div className="w-64 border rounded-lg p-4 shadow-sm space-y-3">
          {tabData.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-2 px-4 py-2 border rounded-lg ${
                activeTab === tab.key
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-4 py-2 text-red-500 border border-red-200 hover:bg-red-50 rounded-lg">
            <LogOut size={18} />
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>

        {/* Scroll To Top */}
        <div>
          <ScrollToTop isVisible={isVisible} />
        </div>
      </div>
      <Footer />
    </>
  );
}
