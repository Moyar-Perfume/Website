"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cart from "@/components/shared/Cart";
import Search from "@/components/shared/Search";
import Marquee from "react-fast-marquee";

const menuItems = [
  { name: "RECOMMENDATIONS", path: "/recommendations" },
  { name: "ALL PRODUCTS", path: "/product-list" },
  { name: "BRANDS", path: "/collections" },
  { name: "BLOG", path: "/gifting" },
  { name: "CONTACT", path: "/art-du-parfum" },
];

const mobileIcons = [
  { src: "/icon/search.svg", alt: "Search" },
  { src: "/icon/cart.svg", alt: "Cart" },
];

const desktopIcons = [
  { src: "/icon/search.svg", alt: "Search" },
  { src: "/icon/user.svg", alt: "User", path: "/account" },
  { src: "/icon/cart.svg", alt: "Cart" },
];

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Khi menu mobile mở, ngăn cuộn trang
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed w-full z-50 transition-all duration-300">
        {/* Free Shipping */}
        <div
          className={`bg-black text-white transition-all duration-300 ${
            scrollY > 50 || isMobileMenuOpen
              ? "h-0 opacity-0"
              : "h-8 opacity-100"
          }`}
        >
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={true}
            className="h-full flex items-center text-xs"
          >
            <span className="mx-4">
              FREE worldwide shipping on discovery boxes!
            </span>
            <span className="mx-4">
              FREE worldwide shipping on discovery boxes!
            </span>
            <span className="mx-4">
              Save 10% on first order with code WELCOME10
            </span>
            <span className="mx-4">New fragrances now available</span>
          </Marquee>
        </div>

        {/* Navbar */}
        <section
          className={`w-full h-[70px] md:h-[90px] xl:h-[100px] bg-white flex items-center justify-between transition-all duration-300 shadow-md px-4 xl:px-6 relative z-[60]`}
        >
          {/* Hamburger Menu - Mobile & Tablet (hiển thị khi < 1280px) */}
          <div className="xl:hidden z-20">
            <button
              className="flex flex-col justify-center items-center w-8 h-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black my-1 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 xl:static xl:translate-x-0 w-[150px] md:w-[200px] xl:w-[250px] h-full flex items-center justify-center overflow-hidden z-20">
            <a
              className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] xl:w-[250px] xl:h-[250px]"
              href="/"
            >
              <Image src="/logo/logo_no_bg/logo_black.png" fill alt="Logo" />
            </a>
          </div>

          {/* Menu - Desktop */}
          <nav className="hidden xl:flex items-center gap-14">
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="flex items-center uppercase font-gotu text-[18px] hover:text-gray-500 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Icons - Hiển thị khi < 1280px */}
          <div className="flex xl:hidden items-center gap-4 z-20">
            {mobileIcons.map((icon, index) => (
              <div
                key={index}
                className="relative w-[20px] h-[20px] cursor-pointer"
                onClick={() => {
                  if (icon.alt === "Cart") setIsCartOpen(true);
                  if (icon.alt === "Search") setIsSearchOpen(true);
                }}
              >
                <Image src={icon.src} fill alt={icon.alt} />
              </div>
            ))}
          </div>

          {/* Desktop Icons - Hiển thị khi >= 1280px */}
          <div className="hidden xl:flex items-center gap-8 z-20 pr-4">
            {desktopIcons.map((icon, index) => (
              <div
                key={index}
                className="relative w-[20px] h-[20px] cursor-pointer"
                onClick={() => {
                  if (icon.alt === "Cart") setIsCartOpen(true);
                  if (icon.alt === "Search") setIsSearchOpen(true);
                }}
              >
                {icon.path ? (
                  <Link href={icon.path}>
                    <Image src={icon.src} fill alt={icon.alt} />
                  </Link>
                ) : (
                  <Image src={icon.src} fill alt={icon.alt} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Mobile & Tablet Menu Fullscreen */}
        <div
          className={`xl:hidden fixed inset-0 bg-white z-50 transition-all duration-500 overflow-auto pt-[70px] md:pt-[90px] ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="min-h-[calc(100vh-90px)] flex flex-col justify-between px-6 py-10">
            {/* Main menu items */}
            <div className="flex flex-col items-center mt-10">
              <div className="w-full max-w-md space-y-8">
                {menuItems.map((item, index) => (
                  <Link
                    href={item.path}
                    key={index}
                    className="block text-center uppercase font-gotu text-2xl py-3 hover:text-gray-500 transition-all border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Footer part with additional links */}
              <div className="w-full pt-10 mt-auto">
                {/* Registration & Login Links */}
                <div className="flex justify-center gap-8 pb-6">
                  <Link
                    href="/register"
                    className="uppercase text-sm hover:text-gray-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="uppercase text-sm hover:text-gray-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal giỏ hàng */}
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
