"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

export interface SortOption {
 label: string;
 field: string;
 direction: "ASC" | "DESC";
}

interface SortProps {
 onSortChange: (option: SortOption) => void;
 currentSort?: SortOption;
}

const Sort = ({ onSortChange, currentSort }: SortProps) => {
  
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);
 
 const sortFields = [
  { label: "Name", field: "name" },
  { label: "Relevance", field: "relevance" },
  { label: "Position", field: "position" },
  { label: "Price", field: "price" },
 ];
 
 const handleSortChange = (field: string) => {
  if(!currentSort || currentSort.field !== field) {
   onSortChange({
    label: getSortLabel(field, "ASC"),
    field,
    direction: "ASC",
   });
  }
  setIsOpen(false);
 };
 
 const toggleDirection = () => {
  if(!currentSort) return;
  const newDirection = currentSort.direction === "ASC" ? "DESC" : "ASC";
  onSortChange({
   label: getSortLabel(currentSort.field, newDirection),
   field: currentSort.field,
   direction: newDirection,
  });
  setIsOpen(false);
 };
 
 const getSortLabel = (field: string, direction: "ASC" | "DESC"): string => {
  return sortFields.find((f) => f.field === field)?.label || field;
 };
 
 const currentFieldLabel = currentSort ? sortFields.find((f) => f.field === currentSort.field)?.label || currentSort.field : "Sort by";
 
 useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
   if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    setIsOpen(false);
   }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);
 
 return (
  <div className="flex items-center relative" ref={dropdownRef}>
   <div className="relative mr-2">
    
    <button
     className="flex items-center justify-between w-36 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm hover:bg-gray-100 transition"
     onClick={() => setIsOpen(!isOpen)}
     aria-haspopup="listbox"
     aria-expanded={isOpen}
     type="button"
    >
     <span>{currentFieldLabel}</span>
     <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    
    {
     isOpen && (
      <ul className="absolute z-10 w-36 mt-1 bg-white border border-gray-300 rounded-md shadow-lg py-1 max-h-60 overflow-auto" role="listbox">
       {
        sortFields.map((option) => (
         <li
          key={option.field}
          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition ${ currentSort && currentSort.field === option.field ? "bg-gray-50 font-medium" : ""}`}
          onClick={() => handleSortChange(option.field)}
          role="option"
          aria-selected={currentSort && currentSort.field === option.field}
         >{option.label}</li>
        ))
       }
      </ul>
     )
    }
    
   </div>
   
   {
    currentSort && (
     <button
      onClick={toggleDirection}
      className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition"
      aria-label={`Sort ${currentSort.direction === "ASC" ? "ascending" : "descending"}`}
      title={`Currently sorted ${currentSort.direction === "ASC" ? "ascending" : "descending"}`}
     >
      {currentSort.direction === "ASC" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
     </button>
    )
   }
   
  </div>
 );
};

export default Sort;