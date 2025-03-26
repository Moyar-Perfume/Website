"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, message } from "antd";
import api from "@/constants/apiURL";

export default function ManageProduct() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Phân trang
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  // Thêm state cho modal xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch dữ liệu từ API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      console.log("API response:", response.data);

      // Giả sử response.data trả về trực tiếp là mảng products
      const productsData = Array.isArray(response.data) ? response.data : [];

      // Chuyển đổi dữ liệu để phù hợp với cấu trúc hiển thị
      const formattedProducts = productsData.map((product) => ({
        id: product._id,
        name: product.name,
        tag: product.tag || "",
        quantity: product.quantity,
        updatedAt: product.updatedAt,
      }));

      setProducts(formattedProducts);

      // Áp dụng filter nếu có
      if (searchText) {
        const filtered = formattedProducts.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(formattedProducts);
      }

      // Tính toán số trang
      setTotalPages(Math.ceil(formattedProducts.length / itemsPerPage));
    } catch (error) {
      console.error("Lỗi khi fetch products:", error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Xử lý filter khi searchText thay đổi
  useEffect(() => {
    if (products.length > 0) {
      if (searchText) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }

      // Reset về trang 1 khi filter thay đổi
      setCurrentPage(1);
    }
  }, [searchText, products]);

  // Xử lý sắp xếp
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    // Sắp xếp dữ liệu
    const sortedData = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(sortedData);
  };

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    // Kiểm tra nếu ngày không hợp lệ
    if (isNaN(date.getTime())) return "Invalid date";

    // Format: DD/MM/YYYY HH:MM
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Xử lý thêm sản phẩm mới
  const handleAddProduct = () => {
    router.push("/admin/manage-product/add-product");
  };

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Icon sắp xếp
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="ml-1">⇅</span>;
    }

    return sortConfig.direction === "ascending" ? (
      <span className="ml-1">↑</span>
    ) : (
      <span className="ml-1">↓</span>
    );
  };

  // Tạo các nút phân trang
  const renderPaginationButtons = () => {
    const buttons = [];

    // Nút Trước
    buttons.push(
      <button
        key="prev"
        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-50"
        }`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Trước
      </button>
    );

    // Hiển thị tối đa 5 nút trang
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Tạo các nút số trang
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`relative inline-flex items-center px-4 py-2 border ${
            currentPage === i
              ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          } text-sm font-medium`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Nút Sau
    buttons.push(
      <button
        key="next"
        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-50"
        }`}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        Sau
      </button>
    );

    return buttons;
  };

  // Dữ liệu trang hiện tại
  const currentPageData = getCurrentPageData();

  // Thêm hàm xử lý xóa sản phẩm
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setDeleteLoading(true);
    try {
      // Gọi API để xóa sản phẩm
      await api.delete(`/products/${productToDelete.id}`);

      // Cập nhật danh sách sản phẩm sau khi xóa
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== productToDelete.id)
      );

      // Cập nhật số trang nếu cần
      const newTotalPages = Math.ceil(
        (filteredProducts.length - 1) / itemsPerPage
      );
      setTotalPages(newTotalPages);

      // Nếu trang hiện tại lớn hơn tổng số trang mới, quay về trang cuối cùng
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      message.success(`Đã xóa sản phẩm "${productToDelete.name}" thành công!`);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    } finally {
      setDeleteLoading(false);
      setDeleteModalVisible(false);
      setProductToDelete(null);
    }
  };

  // Hàm mở modal xác nhận xóa
  const showDeleteConfirm = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  // Hàm đóng modal xác nhận
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setProductToDelete(null);
  };

  return (
    <div className="bg-white shadow-md p-4 w-full min-h-[calc(100vh-70px)] flex flex-col">
      {/* Header và Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>

        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-sm pl-10 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>

          <Button
            type="primary"
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="flex-grow overflow-x-auto mb-4 h-full relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-black tracking-wider cursor-pointer bg-gray-200"
                onClick={() => requestSort("name")}
              >
                Tên sản phẩm {getSortIcon("name")}
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-black tracking-wider cursor-pointer bg-gray-200"
                onClick={() => requestSort("updatedAt")}
              >
                Kho hàng {getSortIcon("updatedAt")}
              </th>

              <th
                className="px-6 py-3 text-left text-sm font-medium text-black tracking-wider cursor-pointer bg-gray-200"
                onClick={() => requestSort("updatedAt")}
              >
                Ngày chỉnh sửa {getSortIcon("updatedAt")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black tracking-wider bg-gray-200">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPageData.length > 0
              ? currentPageData.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 whitespace-nowrap text-xs text-black">
                      {product.name}
                    </td>
                    <td className="px-6 whitespace-nowrap text-xs text-black">
                      {product.quantity}
                    </td>
                    <td className="px-6 whitespace-nowrap text-xs text-black">
                      {formatDate(product.updatedAt)}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-xs font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() =>
                            router.push(
                              `/admin/manage-product/edit/${product.id}`
                            )
                          }
                        >
                          Sửa
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => showDeleteConfirm(product)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : !loading && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Không tìm thấy sản phẩm nào
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {/* Thông tin phân trang */}
      <div className="mt-2 text-sm text-gray-600">
        Hiển thị {currentPageData.length} / {filteredProducts.length} sản phẩm |
        Trang {currentPage} / {totalPages}
      </div>

      {/* Phân trang - luôn ở dưới cùng */}
      {totalPages > 1 && (
        <div className="mt-auto flex justify-end border-gray-200">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {renderPaginationButtons()}
          </nav>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            loading={deleteLoading}
            onClick={handleDeleteProduct}
          >
            Xóa
          </Button>,
        ]}
      >
        {productToDelete && (
          <p>
            Bạn có chắc chắn muốn xóa sản phẩm{" "}
            <strong>{productToDelete.name}</strong>?
            <br />
            Hành động này không thể hoàn tác.
          </p>
        )}
      </Modal>
    </div>
  );
}
