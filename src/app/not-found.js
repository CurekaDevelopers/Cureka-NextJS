"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/views/Header";
import Footer from "@/views/Footer";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer when unmounting
  }, [router]);

  return (
    <>
      <Header />

      <div className="flex flex-col h-screen text-black">
        {/* Header */}

        {/* Main Content */}
        <main className="flex flex-grow flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl ">⚠️ 404 - Page Not Found</h1>
          <p className="text-lg mt-4">We apologize for the inconvenience.</p>
          <p className="text-sm mt-2 text-gray-400">
            You will be redirected to the homepage in 5 seconds...
          </p>
        </main>

        {/* Footer */}
        <Footer />
        <footer className="bg-gray-800 py-4 px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </footer>
      </div>
    </>
  );
}
