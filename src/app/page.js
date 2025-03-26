"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../components/ui/Button";

import React from "react";
import { Carousel, ConfigProvider } from "antd";

import productData from "@/data/productData";
import blogData from "@/data/blogData";

const introItems = [
  {
    id: 1,
    image: "/introduction/intro_01.png",
    title: "1. Enter Your Preferences",
    description:
      "Focus on what you enjoy, the scents you love.\nWe'll handle the hard work for you.",
  },
  {
    id: 2,
    image: "/introduction/intro_02.png",
    title: "2. Your Personalized Selection",
    description:
      "Focus on what you enjoy, the scents you love. \nWe'll handle the hard work for you.",
  },
  {
    id: 3,
    image: "/introduction/intro_03.png",
    title: "3. Receive Your Sample Box",
    description:
      "Focus on what you enjoy, the scents you love. \nWe'll handle the hard work for you.",
  },
];

export default function Home() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const images = Array(10).fill("/logo/logo_no_bg/logo_black_perfume.png");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    setMousePosition({
      x: (clientX - centerX) / 20,
      y: (clientY - centerY) / 20,
    });
  };

  const [newestProduct, setNewestProduct] = useState(productData);

  const [blogPost, setBlogPost] = useState(blogData);

  return (
    <main
      className="w-full flex flex-col items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Banner */}
      <section className="w-full pt-[132px] min-h-screen max-h-screen bg-black flex overflow-hidden">
        <div className="text-3xl z-30 text-[#fff] text-center absolute w-full h-[80%] flex flex-col items-center justify-center gap-4">
          <span className="text-xl">
            Selections of Exclusive Scents for just 20$
          </span>
          <span className="font-gotu">
            Each Moyar Perfume scent is crafted to inspire hope,
            <br />
            reveal beauty, and spark extraordinary moments in the everyday.
          </span>

          <Button>Find Your Scent</Button>
        </div>
        <div className="grid grid-cols-3 w-full relative">
          <div className="absolute inset-0 bg-black opacity-80 z-10"></div>
          {/* Trái */}
          <div className="col-span-1 flex flex-col gap-20 items-end justify-center">
            <div
              className="relative transition-all duration-200
              w-[100px] h-[60px]
              md:w-[170px] md:h-[100px] 
              lg:w-[220px] lg:h-[120px] 
              xl:w-[250px] xl:h-[150px] 
              2xl:w-[300px] 2xl:h-[200px]"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
            >
              <Image
                src="/banner/banner-left-01.jpg"
                alt="Banner 1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw "
                className="object-cover"
              />
            </div>
            <div
              className="relative mr-14 transition-all duration-200
              w-[200px] h-[120px]
              md:w-[340px] md:h-[200px]
              lg:w-[440px] lg:h-[240px]
              xl:w-[500px] xl:h-[300px]"
              style={{
                transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px) `,
              }}
            >
              <Image
                src="/banner/banner-left-02.jpg"
                alt="Banner 2"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Giữa */}
          <div className="h-full flex flex-col col-span-1 items-center pt-6 gap-24 justify-center">
            <div
              className="relative transition-all duration-200
              w-[100px] h-[200px]
              md:w-[100px] md:h-[240px]
              lg:w-[150px] lg:h-[300px]
              xl:w-[200px] xl:h-[350px]"
              style={{
                transform: `translateY(${mousePosition.y}px)`,
              }}
            >
              <Image
                src="/banner/banner-center-01.jpg"
                alt="Banner 3"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className="object-cover"
              />
            </div>
            <div
              className="w-[0px] h-[0px]
              xl:w-[400px] xl:h-[200px]
              relative transition-all duration-200"
              style={{
                transform: `translateY(${-mousePosition.y}px)`,
              }}
            >
              <Image
                src="/banner/banner-center-02.jpg"
                alt="Banner 4"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Phải */}
          <div className="col-span-1 flex flex-col gap-20 items-start justify-center">
            <div
              className="relative transition-all duration-200
              w-[100px] h-[60px]
              md:w-[170px] md:h-[100px] 
              lg:w-[220px] lg:h-[120px] 
              xl:w-[250px] xl:h-[150px] 
              2xl:w-[300px] 2xl:h-[200px]"
              style={{
                transform: `translate(${
                  mousePosition.x
                }px, ${-mousePosition.y}px)`,
              }}
            >
              <Image
                src="/banner/banner-right-01.jpg"
                alt="Banner 5"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className="object-cover "
              />
            </div>
            <div
              className="relative mr-14 transition-all duration-200
              w-[200px] h-[120px]
              md:w-[340px] md:h-[200px]
              lg:w-[440px] lg:h-[240px]
              xl:w-[500px] xl:h-[300px]"
              style={{
                transform: `translate(${-mousePosition.x}px, ${
                  mousePosition.y
                }px)`,
              }}
            >
              <Image
                src="/banner/banner-right-02.jpg"
                alt="Banner 6"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full flex max-w-[1400px] py-[100px] gap-28">
        {/* About Moyar */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-5 w-[75%]">
            <div className="absolute w-[550px] h-[150px]">
              <Image
                src="/about/bg-01.png"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                alt="about-bg"
              />
            </div>
            <h1 className=" font-gotu text-4xl pt-8 z-10">About Moyar</h1>
            <p className="text-center z-10 text-lg">
              Welcome to Moyar, your destination for captivating scents.
              Discover a refined collection of perfumes carefully curated to
              reflect your unique style and personality. Let us guide you on a
              personalized olfactory journey, where each fragrance becomes a
              distinctive signature. Immerse yourself in the world of Moyar and
              awaken your senses.
            </p>
            <Button variant="inverse">More About Us</Button>
          </div>
        </div>

        {/* About Banner */}
        <div className="flex items-center">
          <div className="w-[500px] h-[600px] relative">
            <Image
              src="/about/about-01.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
              alt="about-banner"
              className=" object-cover"
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full grid grid-cols-3 gap-20 max-w-[1500px] py-[100px]">
        {introItems.map((item) => (
          <div key={item.id} className="col-span-1 text-center flex flex-col">
            <div className="relative w-full h-[450px]">
              <Image
                src={item.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                alt={`intro_${item.id}`}
                className="object-cover"
              />
            </div>
            {item.title && (
              <h2 className="text-xl font-medium pt-6">{item.title}</h2>
            )}
            {item.description && (
              <p className="pt-3">
                {item.description.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < item.description.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* New Lauch */}
      <section className="w-full py-[100px]">
        <div className="absolute w-full h-[500px] opacity-50">
          <Image
            src="/about/bg-01.png"
            fill
            className=" object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
            alt="new_bg"
          />
        </div>
        <div className="w-full flex justify-between px-10">
          <span className=" text-lg">Belive in Miracle?</span>
          <Button variant="inverse">See all Fragrances</Button>
        </div>

        <div className="font-gotu w-full text-4xl text-center py-6 pb-8">
          New Lauch
        </div>

        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 24,
                arrowOffset: 25,
              },
            },
          }}
        >
          <Carousel
            slidesToShow={4}
            dots={false}
            arrows
            autoplay
            autoplaySpeed={3000}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
          >
            {newestProduct.map((product) => (
              <div
                key={product.id}
                className="p-4 flex flex-col items-center justify-center px-12"
              >
                <div className="w-full flex items-center justify-center">
                  <div className="relative w-[400px] h-[300px]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-center flex items-center gap-2 w-full">
                  <hr className="flex-1 border-t border-gray-400" />
                  <span className="px-2">{product.brand}</span>
                  <hr className="flex-1 border-t border-gray-400" />
                </div>

                <p className="text-center mt-2 font-medium text-2xl">
                  {product.name}
                </p>

                <div className="w-full flex items-center justify-center mt-4">
                  <Button variant="inverse">{product.price} VNĐ</Button>
                </div>
              </div>
            ))}
          </Carousel>
        </ConfigProvider>
      </section>

      {/* Category */}
      <section className="w-full bg-black py-[100px]">
        <div className="w-full flex justify-between px-10">
          <span className=" text-lg text-white">Belive in Miracle?</span>
          <Button className=" font-normal">See all Fragrances</Button>
        </div>
        <div className="flex flex-col md:flex-row px-4 md:px-20 gap-8 md:gap-16">
          {/* Men */}
          <div
            className="w-full flex flex-col items-center justify-center text-white gap-10"
            onMouseEnter={() => setHoveredCategory("men")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="w-full h-[350px] relative overflow-hidden">
              <Image
                src="/category/men.png"
                alt="Men's perfume"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className={`object-cover transition-transform duration-500 ${
                  hoveredCategory === "men" ? "scale-110" : "scale-100"
                }`}
              />
            </div>

            <h2 className="flex items-center w-full justify-between">
              <span
                className={`relative font-gotu text-2xl pb-2 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[6px] after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-ocean after:to-black`}
              >
                Men Parfum
              </span>

              <span
                className={`transition-transform duration-300 ${
                  hoveredCategory === "men" ? "translate-x-2" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </h2>

            <p
              className={`text-lg transition-opacity duration-300 ${
                hoveredCategory === "men" ? "opacity-100" : "opacity-80"
              }`}
            >
              An introduction to the layers of fragrance notes, accords, and
              families that make up the symphony of each scent.
            </p>
          </div>

          {/* Women */}
          <div
            className="w-full flex flex-col items-center text-white gap-10"
            onMouseEnter={() => setHoveredCategory("women")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="w-[60%] h-[500px] relative overflow-hidden">
              <Image
                src="/category/women.png"
                alt="Women Parfum"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className={`object-cover transition-transform duration-500 ${
                  hoveredCategory === "women" ? "scale-110" : "scale-100"
                }`}
              />
            </div>

            <h2 className="flex items-center w-full justify-between">
              <span
                className={` after:h-[6px] relative font-gotu text-2xl pb-2 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 after:bg-gradient-to-r after:from-rose after:to-black after:w-full`}
              >
                Women Parfum
              </span>

              <span
                className={`transition-transform duration-300 ${
                  hoveredCategory === "women" ? "translate-x-1" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </h2>

            <p
              className={`text-lg transition-opacity duration-300 ${
                hoveredCategory === "women" ? "opacity-100" : "opacity-80"
              }`}
            >
              Niche perfumery is the rebellious child of the fragrance world,
              growing in popularity each year. But what sets it apart from
              mainstream brands found in most perfume shops?
            </p>
          </div>

          {/* Unisex */}
          <div
            className="w-full flex flex-col items-center justify-center text-white gap-10"
            onMouseEnter={() => setHoveredCategory("unisex")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="w-full h-[350px] relative overflow-hidden">
              <Image
                src="/category/unisex.png"
                alt="Unisex Parfum"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                className={`object-cover transition-transform duration-500 ${
                  hoveredCategory === "unisex" ? "scale-110" : "scale-100"
                }`}
              />
            </div>

            <h2 className="flex items-center w-full justify-between">
              <span
                className={` after:h-[6px] relative font-gotu text-2xl pb-2 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 after:bg-gradient-to-r after:from-sweet after:to-black after:w-full
            `}
              >
                Unisex Parfum
              </span>

              <span
                className={`transition-transform duration-300 ${
                  hoveredCategory === "unisex" ? "translate-x-2" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </h2>

            <p
              className={`text-lg transition-opacity duration-300 ${
                hoveredCategory === "unisex" ? "opacity-100" : "opacity-80"
              }`}
            >
              An introduction to the layers of fragrance notes, accords, and
              families that make up the symphony of each scent.
            </p>
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="w-full py-[100px]">
        <div className="absolute w-full h-[500px] opacity-50">
          <Image
            src="/about/bg-01.png"
            fill
            className=" object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
            alt="best_seller"
          />
        </div>

        <div className="font-gotu w-full text-4xl text-center py-6 pb-8">
          Our Bestseller
        </div>

        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 24,
                arrowOffset: 25,
              },
            },
          }}
        >
          <Carousel
            slidesToShow={5}
            dots={false}
            arrows
            autoplay
            autoplaySpeed={3000}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
          >
            {newestProduct.map((product) => (
              <div
                key={product.id}
                className="p-4 flex flex-col items-center justify-center px-12"
              >
                <div className="w-full flex items-center justify-center">
                  <div className="relative w-[400px] h-[300px]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-center flex items-center gap-2 w-full">
                  <hr className="flex-1 border-t border-gray-400" />
                  <span className="px-2">{product.brand}</span>
                  <hr className="flex-1 border-t border-gray-400" />
                </div>

                <p className="text-center mt-2 font-medium text-2xl">
                  {product.name}
                </p>

                <div className="w-full flex items-center justify-center mt-4">
                  <Button variant="inverse">{product.price} VNĐ</Button>
                </div>
              </div>
            ))}
          </Carousel>
        </ConfigProvider>
      </section>

      {/* Blog */}
      <section className="w-full py-[100px] ">
        <div className="w-full flex items-end gap-5 px-4 md:px-14">
          <hr className="flex-1 border-t-2 border-gray-400" />
          <span className="text-4xl whitespace-nowrap font-gotu">
            Moyar's Blog
          </span>
        </div>

        <div className="w-full pt-20">
          <ConfigProvider
            theme={{
              components: {
                Carousel: {
                  arrowSize: 24,
                  arrowOffset: 25,
                },
              },
            }}
          >
            <Carousel
              slidesToShow={3}
              dots={false}
              arrows
              autoplay
              autoplaySpeed={3000}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {blogPost.map((blog, index) => (
                <div className="px-28 flex relative w-full" key={index}>
                  {/* Container cho ảnh absolute */}
                  <div className="relative w-full">
                    <div className="absolute top-0  right-0 w-[40vw] max-w-[70%] h-[160px] border-[16px] border-[#fff] z-10">
                      <Image
                        src={blog.images[0]}
                        fill
                        alt={blog.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Các ảnh chính bên dưới */}
                  <div className="flex justify-between items-center w-full pt-20 gap-4">
                    <div className="relative w-[55%] h-[250px]">
                      <Image
                        src={blog.images[1]}
                        fill
                        alt={blog.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-[40%] h-[250px]">
                      <Image
                        src={blog.images[2]}
                        fill
                        alt={blog.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="pt-6 w-full items-center justify-center flex flex-col gap-4 h-[200px] ">
                    <div className="w-full flex items-center gap-4">
                      <hr className="flex-1 border-t border-black" />
                      <span className="whitespace-nowrap">{blog.subTitle}</span>
                      <hr className="flex-1 border-t border-black" />
                    </div>
                    <div className="text-xl text-center line-clamp-2 font-gotu w-[80%]">
                      {blog.title}
                    </div>
                    <Button variant="inverse">Xem Ngay</Button>
                  </div>
                </div>
              ))}
            </Carousel>
          </ConfigProvider>
        </div>
      </section>

      {/* Feature Brand */}
      <section className="w-full py-[100px] flex flex-col gap-16">
        <div className="w-full flex justify-center items-center gap-5 px-14">
          <span className="text-4xl whitespace-nowrap font-gotu">
            Featured Brands
          </span>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 24,
                arrowOffset: 25,
              },
            },
          }}
        >
          <Carousel
            slidesToShow={5}
            dots={false}
            arrows
            autoplay
            autoplaySpeed={3000}
          >
            {images.map((src, index) => (
              <div key={index} className="w-[200px] h-[200px] relative">
                <Image
                  src={src}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                  className="object-cover"
                  alt={`Logo ${index}`}
                />
              </div>
            ))}
          </Carousel>
        </ConfigProvider>

        <div className=" w-full flex items-center justify-center">
          <p className="max-w-[850px] text-center font-gotu leading-8">
            Explore Moyar Perfume's selection of top fragrance brands, each
            known for their craftsmanship and unique scent profiles. Discover a
            world of captivating aromas designed to leave a lasting impression,
            carefully curated to match your personal style and preferences.
          </p>
        </div>
      </section>

      {/* Feedback */}
      <section className="px-10 py-[150px] flex flex-col justify-center items-center gap-10 w-full bg-gradient-to-t from-floral to-[#fff]">
        <div className="w-full text-4xl font-gotu text-center">
          Please share your feedback with us!
        </div>
        <div className="px-10 py-3 bg-black text-white text-2xl font-gotu">
          200,000+
        </div>
        <div className="text-3xl font-gotu">Join the Community</div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto md:grid-rows-2 gap-6 w-full max-w-[1400px] px-4 md:px-0">
          {/* Ô 1 */}
          <div className="w-full bg-white flex flex-col gap-10 p-6">
            <div className=" gap-2 flex justify-between">
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[30px] h-[30px] relative">
                    <Image
                      src="/element/flower_blue.svg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      alt={`flower_blue ${index} `}
                    />
                  </div>
                ))}
              </div>
              <div>01/11/2024</div>
            </div>
            <p>
              Asks all the right questions to develop an accurate profile of
              your tastes. The suggestions are on point, interesting, and
              unique, not on my radar, so it's fun to look them up.
            </p>
          </div>

          {/* Ô 2 */}
          <div className="w-full bg-white flex flex-col gap-10 p-6">
            <div className=" gap-2 flex justify-between">
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[30px] h-[30px] relative">
                    <Image
                      src="/element/flower_puple.svg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      alt={`flower_puple ${index} `}
                    />
                  </div>
                ))}
              </div>
              <div>01/11/2024</div>
            </div>
            <p>
              Asks all the right questions to develop an accurate profile of
              your tastes. The suggestions are on point, interesting, and
              unique, not on my radar, so it's fun to look them up.
            </p>
          </div>

          {/* Ô 3 */}
          <div className="w-full bg-white flex flex-col gap-10 p-6">
            <div className=" gap-2 flex justify-between">
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[30px] h-[30px] relative">
                    <Image
                      src="/element/flower_pink.svg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      alt={`flower_pink ${index} `}
                    />
                  </div>
                ))}
              </div>
              <div>01/11/2024</div>
            </div>
            <p>
              Asks all the right questions to develop an accurate profile of
              your tastes. The suggestions are on point, interesting, and
              unique, not on my radar, so it's fun to look them up.
            </p>
          </div>

          {/* Ô 4 */}
          <div className="w-full bg-white flex flex-col gap-10 p-6">
            <div className=" gap-2 flex justify-between">
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-[30px] h-[30px] relative">
                    <Image
                      src="/element/flower_green.svg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                      alt={`flower_green ${index} `}
                    />
                  </div>
                ))}
              </div>
              <div>01/11/2024</div>
            </div>
            <p>
              Asks all the right questions to develop an accurate profile of
              your tastes. The suggestions are on point, interesting, and
              unique, not on my radar, so it's fun to look them up.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
