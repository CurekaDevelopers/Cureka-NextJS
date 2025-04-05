"use client";
import ReduxProvider from "../redux/provider"; // Import the Redux provider
import './globals.css';
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast"; // Import Toaster
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <HelmetProvider>
            <Toaster position="top-center" reverseOrder={false} /> {children}
          </HelmetProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
