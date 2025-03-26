import { useState } from "react";

export default function Search({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm với searchTerm
    console.log("Searching for:", searchTerm);
    // Thêm logic tìm kiếm ở đây
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center ${
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

      <div
        className={`z-60 bg-white w-full p-6 shadow-lg absolute top-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">Search</h2>
          <button
            className="text-black text-2xl hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập từ khóa tìm kiếm..."
              className="w-full py-3 pl-12 pr-4 text-base border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
              autoFocus={isOpen}
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Press Enter to search
          </div>
        </form>

        {searchTerm && (
          <div className="mt-6">
            <div className="text-gray-500">Searching "{searchTerm}"...</div>
          </div>
        )}
      </div>
    </div>
  );
}
