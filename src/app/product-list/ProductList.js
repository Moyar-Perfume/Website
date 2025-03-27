"use client";

import api from "@/constants/apiURL";
import { useFilter } from "@/contexts/FilterContext";
import { useEffect, useState } from "react";
import Product from "@/components/shared/Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { filterProducts } = useFilter();

  // Giả lập fetch sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Trong thực tế, đây sẽ là một API call
        const response = await api.get("/products");

        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = filterProducts(products);
      setFilteredProducts(filtered);
    }
  }, [filterProducts, products]);

  return (
    <section className="flex min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="p-2">
              <Product
                product={product}
                imageSize="h-[300px]"
                showLikeButton={true}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl">
              Không tìm thấy sản phẩm phù hợp với bộ lọc.
            </p>
            <p className="mt-2">Vui lòng thử lại với bộ lọc khác.</p>
          </div>
        )}
      </div>
    </section>
  );
}
