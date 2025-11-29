import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Sheet } from "@/components/ui/sheet";
import DNavbar from "@/components/dashboard/DNavbar";
import DMenubar from "@/components/dashboard/DMenubar";

export const metadata: Metadata = {
  title: "Dashboard - seeker & provider",
  description: "User dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section className="h-full">
         <Sheet>
          <DNavbar />
          <DMenubar />
        </Sheet>
        <div className="h-[calc(100vh-62px)] overflow-y-auto lg:h-[calc(100vh-85px)] no-scrollbar">
          {children}
          <Footer />
        </div>
      </section>
  );
}
