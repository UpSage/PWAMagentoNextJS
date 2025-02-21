"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Product } from "../interface/products";
import { Category } from "../interface/category";
import Title from "../category/Title";
import ProductList from "../product/List";
import Filters from "../product/list/Filters";
import Loader from "../product/list/message/Loader";
import NoProducts from "../product/list/message/NoProducts";
import TotalItems from "../product/list/toolbars/TotalItems";
import TotalResult from "../product/list/toolbars/TotalResult";
import Sort, { SortOption } from "../product/list/toolbars/Sort";
import Pagination from "../product/list/toolbars/Pagination";

interface ProductListTemplateProps {
 categoryId?: number | null;
 category?: Category;
 currentPage?: number;
 pageSize?: number;
 onPageChange?: (page: number) => void;
 fetchProductsFunc: (
  categoryIds: string[],
  page: number,
  pageSize: number,
  sort?: { field: string; direction: string }
 ) => Promise<any>;
}

const ProductListTemplate = ({
 categoryId: propCategoryId,
 category,
 currentPage = 1,
 pageSize = 12,
 onPageChange,
 fetchProductsFunc,
}: ProductListTemplateProps) => {
    
 const categoryId = category?.id ?? propCategoryId ?? null;
 const [products, setProducts] = useState<Product[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [totalCount, setTotalCount] = useState(0);
 const [totalPages, setTotalPages] = useState(1);
 const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
 
 const [currentSort, setCurrentSort] = useState<SortOption>({
  label: "Position (Low-High)",
  field: "position",
  direction: "ASC",
 });
 
 const latestRequestId = useRef<number>(0);
 
 const handleSortChange = (option: SortOption) => {
  setCurrentSort(option);
 };
 
 const handlePageChange = (page: number) => {
  if(page !== currentPage) {
   onPageChange?.(page);
  }
 };
 
 const handleApplyFilters = (filters: { categoryIds: number[] }) => {
  setSelectedCategoryIds(filters.categoryIds);
  onPageChange?.(1);
 };

 const fetchProducts = useCallback(async () => {
  if (!categoryId) return;
  const currentRequestId = ++latestRequestId.current;
  setIsLoading(true);
  setError(null);

  try {
    let categoryIdsToUse: string[] = [];
    if (selectedCategoryIds.length > 0) {
      categoryIdsToUse = selectedCategoryIds.map(id => id.toString());
    } else {
      categoryIdsToUse = [categoryId.toString()];
    }

    const data = await fetchProductsFunc(
      categoryIdsToUse,
      currentPage,
      pageSize,
      {
        field: currentSort.field,
        direction: currentSort.direction,
      }
    );

    if (currentRequestId === latestRequestId.current) {
      setProducts(data.items);
      setTotalPages(data.page_info.total_pages);
      setTotalCount(data.total_count);
      if (currentPage > data.page_info.total_pages && data.page_info.total_pages > 0) {
        onPageChange?.(1);
      }
    }
  } catch (error) {
    if (currentRequestId === latestRequestId.current) {
      console.error("Error fetching products:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setProducts([]);
      setTotalPages(1);
      setTotalCount(0);
    }
  } finally {
    if (currentRequestId === latestRequestId.current) {
      setIsLoading(false);
    }
  }
}, [
  categoryId,
  currentPage,
  pageSize,
  onPageChange,
  fetchProductsFunc,
  currentSort,
  selectedCategoryIds
]);

 
 useEffect(() => {
  fetchProducts();
 }, [fetchProducts, currentPage]);
 
 useEffect(() => {
  setSelectedCategoryIds([]);
 }, [categoryId]);
 
 if(error) {
  return <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>;
 }
 
 return (
  <div className="space-y-6">
    
   {
    category && <Title category={category} />
   }
  
   <div className="flex justify-between items-center pb-4 border-b">
    <Filters currentCategory={category} onApplyFilters={handleApplyFilters} />
    <TotalResult productsLength={products.length} totalPages={totalPages} currentPage={currentPage} />
    <Sort onSortChange={handleSortChange} currentSort={currentSort} />
   </div>
  
   {
    isLoading ? (
     <Loader />
    ) : products.length === 0 ? (
     <NoProducts/>
    ) : (
     <>
      <TotalItems totalCount={totalCount} isLoading={isLoading} />
      <ProductList products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
     </>
    )
   }
  
  </div>
 );

};

export default ProductListTemplate;