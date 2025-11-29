import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne", // define your CSS variable
});

export const metadata: Metadata = {
  title: "Exserc - Home",
  description: "Search and hire service workers",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={syne.className}>
        <AuthProvider>
          {children}
        <ToastContainer theme="dark" pauseOnHover newestOnTop pauseOnFocusLoss />
        </AuthProvider>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
