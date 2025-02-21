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
  sort?: { field: string; direction: string },
  priceRange?: { min: number, max: number }
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
 const [priceRange, setPriceRange] = useState<{ min: number, max: number } | undefined>(undefined);
 const [maxPrice, setMaxPrice] = useState<number>(5000);

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
 
 const handleApplyFilters = (filters: { 
   categoryIds: number[], 
   priceRange?: { min: number, max: number } 
 }) => {
  setSelectedCategoryIds(filters.categoryIds);
  setPriceRange(filters.priceRange);
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
      },
      priceRange
    );

    if (currentRequestId === latestRequestId.current) {
      setProducts(data.items);
      setTotalPages(data.page_info.total_pages);
      setTotalCount(data.total_count);
      
      if (data.max_price !== undefined) {
        setMaxPrice(data.max_price);
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
  selectedCategoryIds,
  priceRange
]);

 
 useEffect(() => {
  fetchProducts();
 }, [fetchProducts, currentPage]);
 
 useEffect(() => {
  setSelectedCategoryIds([]);
  setPriceRange(undefined);
 }, [categoryId]);
 
 if(error) {
  return <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>;
 }
 
 return (
  <>
  
   {
    category && 
     <div className="space-y-6 p-4 min-h-[100px] bg-[#f2f2f2] flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
       <Title category={category} />
      </div>
     </div>
   }
   
   <div className="space-y-6 p-4">
  
    <div className="max-w-7xl w-full mx-auto flex justify-between items-center pb-4 border-b">
    <Filters currentCategory={category} maxPrice={maxPrice} onApplyFilters={handleApplyFilters} />



     <TotalItems totalCount={totalCount} isLoading={isLoading} />
     <Sort onSortChange={handleSortChange} currentSort={currentSort} />
    </div>
  
    {
     isLoading ? (
      <Loader />
     ) : products.length === 0 ? (
      <NoProducts/>
     ) : (
      <div className="max-w-7xl w-full mx-auto pb-6">
       <TotalResult productsLength={products.length} totalPages={totalPages} currentPage={currentPage} />
       <ProductList products={products} />
       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
     )
    }
  
   </div>

  </>
 );

};

export default ProductListTemplate;