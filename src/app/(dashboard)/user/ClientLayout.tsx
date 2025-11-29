"use client";

import { Sheet } from "@/components/ui/sheet";
import DNavbar from "@/components/dashboard/DNavbar";
import DMenubar from "@/components/dashboard/DMenubar";
import CNavbar from "@/components/dashboard/CNavbar";
import { UseDSidebar } from "@/components/dashboard/DSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <UseDSidebar>
      <ProtectedRoute>
        <section className="grid grid-cols-12 h-full">
          <div className="col-start-1 lg:col-start-1 col-span-full h-full row-start-1 lg:h-screen">
            <Sheet>
              <DNavbar />
              <CNavbar />
              <DMenubar />
            </Sheet>
            <div className="h-[calc(100vh-62px)] overflow-y-auto lg:h-[calc(100vh-74px)] no-scrollbar">
              {children}
            </div>
          </div>
        </section>
      </ProtectedRoute>
    </UseDSidebar>
  );
}