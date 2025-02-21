"use client";

import { useState, useEffect, useRef } from "react";

interface PriceFilterProps {
 minPrice?: number;
 maxPrice?: number;
 selectedMinPrice: number;
 selectedMaxPrice: number;
 onPriceChange: (min: number, max: number) => void;
}

const Price = ({
 minPrice = 0,
 maxPrice = 1000,
 selectedMinPrice,
 selectedMaxPrice,
 onPriceChange,
}: PriceFilterProps) => {
    
 const safeSelectedMin = isNaN(selectedMinPrice) ? minPrice : selectedMinPrice;
 const safeSelectedMax = isNaN(selectedMaxPrice) ? maxPrice : selectedMaxPrice;
 const [localMin, setLocalMin] = useState(safeSelectedMin);
 const [localMax, setLocalMax] = useState(safeSelectedMax);
 
 useEffect(() => {
  const newMin = isNaN(selectedMinPrice) ? minPrice : selectedMinPrice;
  const newMax = isNaN(selectedMaxPrice) ? maxPrice : selectedMaxPrice;
  setLocalMin(newMin);
  setLocalMax(newMax);
 }, [selectedMinPrice, selectedMaxPrice, minPrice, maxPrice]);
  
 
 const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  if (!isNaN(value)) {
   const newMin = Math.min(Math.max(value, minPrice), localMax);
   setLocalMin(newMin);
   onPriceChange(newMin, localMax);
  }
 };
 
 const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  if (!isNaN(value)) {
   const newMax = Math.max(Math.min(value, maxPrice), localMin);
   setLocalMax(newMax);
   onPriceChange(localMin, newMax);
  }
 };


  return (
    <div className="mb-6 text-[#20232b]">
      <h3 className="text-md font-semibold mb-3">Price Range</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input 
              type="number"
              value={localMin}
              onChange={handleMinChange}
              min={minPrice}
              max={localMax}
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004672] focus:ring-1 focus:ring-[#004672]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input 
              type="number"
              value={localMax}
              onChange={handleMaxChange}
              min={localMin}
              max={maxPrice}
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004672] focus:ring-1 focus:ring-[#004672]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;