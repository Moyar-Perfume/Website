"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const Product = ({
  product,
  className = "",
  onClick,
  showBrand = true,
  showPrice = true,
  showLikeButton = false,
  imageSize = "h-[300px]", // Kích thước mặc định của ảnh
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState(null);

  if (!product) return null;

  const { id, name, brand, price, images, volumes } = product;

  // URL của sản phẩm
  const productUrl = `/products/${id}`;

  // Chọn volume mặc định (volume đầu tiên) nếu volumes tồn tại
  if (volumes && volumes.length > 0 && !selectedVolume) {
    setSelectedVolume(volumes[0]);
  }

  // Tìm giá thấp nhất trong các volumes
  const lowestPrice =
    volumes && volumes.length > 0
      ? volumes.reduce(
          (min, vol) => (vol.price < min ? vol.price : min),
          volumes[0].price
        )
      : price;

  // Số lượng volume có sẵn
  const volumeCount = volumes ? volumes.length : 0;

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Thêm xử lý thêm vào giỏ hàng ở đây
    console.log("Thêm vào giỏ hàng:", {
      product,
      volume: selectedVolume,
    });
  };

  // Xử lý chọn volume
  const handleSelectVolume = (e, volume) => {
    e.stopPropagation();
    setSelectedVolume(volume);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${className} relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Product Image with subtle shadow */}
      <Link href={productUrl} className="w-full block">
        <div className="w-full flex items-center justify-center overflow-hidden">
          <div
            className={`relative w-full ${imageSize} max-w-[400px] overflow-hidden rounded-sm shadow-sm`}
          >
            <Image
              src={
                images && images.length > 0
                  ? images[0]
                  : "/placeholder-product.png"
              }
              alt={name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105`}
            />

            {showLikeButton && (
              <button className="absolute top-4 right-4 text-gray-800 hover:text-red-500 transition-colors z-10 bg-white bg-opacity-70 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Brand - Always visible - with refined styling - MOVED TO TOP */}
      {showBrand && (
        <div className="text-center flex items-center gap-2 w-full mt-5">
          <hr className="flex-1 border-t border-gray-200" />
          <span className="px-3 py-1 text-sm text-gray-500 tracking-wide uppercase font-gotu">
            {brand}
          </span>
          <hr className="flex-1 border-t border-gray-200" />
        </div>
      )}

      {/* Product Name - Always visible - MOVED ABOVE VOLUME/PRICE */}
      <Link href={productUrl} className="w-full block">
        <p className="text-center mt-1 text-xl sm:text-2xl px-2 transition-colors hover:text-gray-700 text-black">
          {name}
        </p>
      </Link>

      {/* Divider - NEW */}
      <div className="w-16 h-0.5 bg-gray-200 my-2"></div>

      {/* Conditional content based on hover state - MOVED TO BOTTOM */}
      <div className="w-full relative" style={{ height: "150px" }}>
        {/* Always visible non-hover state */}
        <div
          className={`w-full absolute flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-0 transform -translate-y-2" : "opacity-100"
          }`}
        >
          <div className="bg-gray-50 px-5 py-3 rounded-md border border-gray-100 w-full max-w-[250px] text-center">
            <div className="text-center text-sm font-medium text-gray-800">
              {volumeCount > 0 ? `${volumeCount} volumes / From ` : ""}
              <span className="font-semibold text-black">
                {lowestPrice ? lowestPrice.toLocaleString() : 0} VNĐ
              </span>
            </div>
          </div>
        </div>

        {/* Hover state content - absolutely positioned */}
        <div
          className={`w-full absolute inset-0 bg-white z-10 flex flex-col justify-center px-3 py-3 transition-all duration-300 rounded-sm border border-gray-100 shadow-sm ${
            isHovered
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-2 pointer-events-none"
          }`}
        >
          {/* Volume options - made more compact */}
          {volumes && volumes.length > 0 && (
            <div className="flex items-center gap-2 mb-2 justify-center flex-wrap">
              {volumes.map((volume, index) => (
                <div key={index} className="flex items-center justify-center">
                  <input
                    type="radio"
                    id={`volume-${id}-${index}`}
                    name={`volume-${id}`}
                    className="hidden"
                    checked={
                      selectedVolume && selectedVolume.size === volume.size
                    }
                    onChange={(e) => handleSelectVolume(e, volume)}
                  />
                  <label
                    htmlFor={`volume-${id}-${index}`}
                    className={`px-2.5 py-0.5 rounded-full text-xs cursor-pointer transition-colors ${
                      selectedVolume && selectedVolume.size === volume.size
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {volume.size}
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Price - more compact */}
          <div className="text-center my-2 text-black">
            <span className="text-base">
              {selectedVolume && selectedVolume.price
                ? selectedVolume.price.toLocaleString()
                : price
                ? price.toLocaleString()
                : 0}{" "}
              VNĐ
            </span>
          </div>

          {/* Add to cart button - more compact */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors rounded-sm flex items-center justify-center gap-1.5"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
