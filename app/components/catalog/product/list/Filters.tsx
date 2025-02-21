"use client";

import { useState, useEffect } from "react";
import { Category } from "../../interface/category";
import Categories from "./filters/Categories";
import Price from "./filters/Price";

interface FiltersProps {
 currentCategory?: Category;
 maxPrice: number;
 onApplyFilters: (filters: { 
  categoryIds: number[],
  priceRange?: { min: number, max: number }
 }) => void;
}

const Filters = ({ currentCategory, maxPrice, onApplyFilters }: FiltersProps) => {
 const [isFilterOpen, setIsFilterOpen] = useState(false);
 const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
 const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({
  min: 0,
  max: maxPrice,
 });
 
 useEffect(() => {
  setPriceRange((prev) => ({
   ...prev,
   max: maxPrice,
  }));
 }, [maxPrice]);
 
 const handlePriceChange = (min: number, max: number) => {
  if (!isNaN(min) && !isNaN(max)) {
   setPriceRange({ min, max });
  }
 };
 
 const handleApplyFilters = () => {
  onApplyFilters({ 
   categoryIds: selectedCategories,
   priceRange: priceRange
  });
  setIsFilterOpen(false);
 };


 return (
  <>
  
   <button onClick={() => setIsFilterOpen(true)} className="text-white px-4 py-2 bg-[#20232b] hover:bg-[#004672]">Filter</button>
   
   {
    isFilterOpen && (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 w-96 max-h-[80vh] overflow-y-auto shadow-lg">
        
       <h2 className="text-xl text-[#004672] font-bold mb-4">Filters</h2>
       
       <Categories currentCategory={currentCategory} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
       
       <Price minPrice={0} maxPrice={maxPrice} selectedMinPrice={priceRange.min} selectedMaxPrice={priceRange.max} onPriceChange={handlePriceChange} />

       <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => setIsFilterOpen(false)} className="bg-gray-400 text-white px-4 py-2 hover:bg-gray-500">Cancel</button>
        <button onClick={handleApplyFilters} className="bg-[#004672] text-white px-4 py-2 hover:bg-[#20232b]">Apply</button>
       </div>
       
      </div>
     </div>
    )
   }
   
  </>
 
 );

};

export default Filters;