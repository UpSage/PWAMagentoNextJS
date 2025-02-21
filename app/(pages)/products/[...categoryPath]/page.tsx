"use client";

import { useCallback } from "react";
import { getCategories } from "@/app/api/category";
import { getProducts } from "@/app/api/products";
import { useCategory } from "@/app/components/catalog/hooks/useCategory";
import Layout from "@/app/layouts/Layout";
import CategoryMenu from "@/app/components/catalog/category/Menu";
import ProductListTemplate from "@/app/components/catalog/templates/ProductList";

export default function Products() {
    
 const memoizedFetchCategories = useCallback(() => getCategories("3"), []);
 const { categories, currentCategory, currentPage, setCurrentPage } = useCategory(memoizedFetchCategories);
 
 return (
  <Layout
   navigation={<CategoryMenu categories={categories} basePath="/products" />}
  >
   <ProductListTemplate
    category={currentCategory}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
    fetchProductsFunc={getProducts}
    />
  </Layout>
 );

}