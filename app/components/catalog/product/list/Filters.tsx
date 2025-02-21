"use client";

import { useState } from "react";
import { Category } from "../../interface/category";
import Categories from "./filters/Categories";

interface FiltersProps {
 currentCategory?: Category;
 onApplyFilters: (filters: { 
  categoryIds: number[],
 }) => void;
}

const Filters = ({ currentCategory, onApplyFilters }: FiltersProps) => {
    
 const [isFilterOpen, setIsFilterOpen] = useState(false);
 const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
 
 const handleApplyFilters = () => {
  onApplyFilters({ 
   categoryIds: selectedCategories
  });
  setIsFilterOpen(false);
 };

 return (
  <>
   <button onClick={() => setIsFilterOpen(true)} className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Filter</button>
   
   {
    isFilterOpen && (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-96 max-h-[80vh] overflow-y-auto shadow-lg">
        
       <h2 className="text-xl font-bold mb-4">Filters</h2>
       
       <Categories
        currentCategory={currentCategory}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
       />

       <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => setIsFilterOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
        <button onClick={handleApplyFilters} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Apply</button>
       </div>
       
      </div>
     </div>
    )
   }
   
  </>
 
 );

};

export default Filters;