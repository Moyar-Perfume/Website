"use client";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";
import Cart from "@/components/shared/Cart";
import Navbar from "@/components/layout/user/Navbar";
import Footer from "@/components/layout/user/Footer";

import AdminHeader from "@/components/layout/admin/AdminHeader";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";

export default function RootClient({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminLoginPage = pathname === "/admin/login";
  const { isCartOpen, setIsCartOpen } = useCart();

  // Kiểm soát overflow của body khi mở/đóng giỏ hàng
  useEffect(() => {
    if (isCartOpen) {
      // Ngăn scroll trang
      document.body.style.overflow = "hidden";
    } else {
      // Cho phép scroll trang
      document.body.style.overflow = "auto";
    }

    // Cleanup function khi component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

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
        // User Pages Layout
        <div className="min-h-screen bg-white relative">
          {/* Navbar - luôn fixed ở phía trên */}
          <div className="fixed top-0 left-0 right-0 z-50 w-full">
            <Navbar />
          </div>

          {/* Cart component - Hiển thị từ trên xuống khi mở */}
          <div
            className={`fixed top-0 left-0 right-0 z-[100] max-h-[80vh] bg-white shadow-lg transition-transform duration-300 ease-in-out ${
              isCartOpen
                ? "transform translate-y-0"
                : "transform -translate-y-full"
            } overflow-y-auto`}
          >
            <Cart />
          </div>

          {/* Main content với padding-top tương ứng với chiều cao của navbar */}
          <main className="pt-[70px] md:pt-[90px] xl:pt-[100px]">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Overlay khi giỏ hàng mở */}
          {isCartOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-[90]"
              onClick={() => setIsCartOpen(false)}
            />
          )}
        </div>
      )}
    </AntdRegistry>
  );
}
