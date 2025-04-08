// "use client";

// import dynamic from "next/dynamic";
// import Layout from "./components/Layout";

// // Lazy load all the tab components
// const AccountTab = dynamic(() => import("./components/AccountTab"));
// const OrdersTab = dynamic(() => import("./components/OrdersTab"));
// const AddressTab = dynamic(() => import("./components/AddressTab"));
// const MyCouponsTab = dynamic(() => import("./components/MyCouponsTab"));
// const MyWalletTab = dynamic(() => import("./components/MyWalletTab"));
// const MyWishlistTab = dynamic(() => import("./components/MyWishlistTab"));

// export default function AccountPage() {
//   const tabs = [
//     { value: "my-account", tabElement: AccountTab },
//     { value: "my-orders", tabElement: OrdersTab },
//     { value: "address", tabElement: AddressTab },
//     { value: "my-wallet", tabElement: MyWalletTab },
//     { value: "my-wishlist", tabElement: MyWishlistTab },
//     { value: "my-coupons", tabElement: MyCouponsTab },
//   ];

//   return <Layout tabs={tabs} />;
// }
