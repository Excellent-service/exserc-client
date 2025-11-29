import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "../../components/Toast";

export const metadata: Metadata = {
  title: "Exserc - Login | Register",
  description: "user login and registration page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {children}
        {/* <ToastContainer theme="dark" pauseOnHover newestOnTop pauseOnFocusLoss /> */}
        </>
  );
}
