"use client";

export default function Cart({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        !isOpen ? "pointer-events-none" : ""
      }`}
    >
      {/* Lớp mask đen */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-80" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Nội dung giỏ hàng */}
      <div
        className={`z-60 bg-white w-[30%] p-6 shadow-lg right-0 absolute top-0 bottom-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b-[1px] border-black px-4">
          <h2 className="text-3xl">Cart</h2>
          <button
            className="text-black text-2xl hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
