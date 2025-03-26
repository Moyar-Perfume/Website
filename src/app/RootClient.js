"use client";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/user/Navbar";
import Footer from "@/components/layout/user/Footer";

import AdminHeader from "@/components/layout/admin/AdminHeader";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";

export default function RootClient({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminLoginPage = pathname === "/admin/login";

  return (
    <AntdRegistry>
      {isAdminPage ? (
        isAdminLoginPage ? (
          children
        ) : (
          <div>
            <AdminSidebar />
            <div className="overflow-hidden">
              <AdminHeader />
              <div className="pt-[60px] pl-[200px]">{children}</div>
            </div>
          </div>
        )
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </AntdRegistry>
  );
}
