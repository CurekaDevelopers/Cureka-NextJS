"use client";
import ReduxProvider from "../redux/provider"; // Import the Redux provider
import "./globals.css";
import { HelmetProvider } from "react-helmet-async";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
