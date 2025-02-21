"use client";

import { Category } from "../../../interface/category";

interface CategoriesFilterProps {
 currentCategory?: Category;
 selectedCategories: number[];
 setSelectedCategories: (categories: number[]) => void;
}

const Categories = ({ 
 currentCategory,
 selectedCategories,
 setSelectedCategories 
}: CategoriesFilterProps) => {
    
 const handleCheckboxChange = (categoryId: number) => {
  const updatedCategories = selectedCategories.includes(categoryId)
   ? selectedCategories.filter((id) => id !== categoryId)
   : [...selectedCategories, categoryId];
   setSelectedCategories(updatedCategories);
 };
 
 if(!currentCategory || !currentCategory.children || currentCategory.children.length === 0) {
  return null;
 }
 
 return (
  <div className="mb-4 text-[#20232b]">
   <h3 className="text-md font-semibold mb-2">Category</h3>
   <div className="flex flex-col gap-2 max-h-48 overflow-y-auto text-sm"> 
    {
     currentCategory.children.map((category) => (
      <label key={category.id} className="flex items-center gap-2">
       <input type="checkbox" value={category.id} checked={selectedCategories.includes(category.id)} onChange={() => handleCheckboxChange(category.id)} className="w-4 h-4" />{category.name}
      </label>
     ))
    }
   </div>
  </div>
 );

};

export default Categories;