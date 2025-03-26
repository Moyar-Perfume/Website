"use client";

import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

import { FilterContext } from "@/contexts/FilterContext";

export default function ProductListPage() {
  return (
    <FilterContext>
      <main className="pt-[132px]">
        <ProductFilter />
        <ProductList />
      </main>
    </FilterContext>
  );
}
