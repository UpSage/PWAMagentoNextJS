"use client";

interface TotalResultProps {
 productsLength: number;
 totalPages: number;
 currentPage: number;
}

const TotalResult = ({ productsLength, totalPages, currentPage }: TotalResultProps) => {
 return (
  <p className="text-sm text-gray-500 pb-6">
   Showing {productsLength} product{productsLength !== 1 ? "s" : ""} 
   {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
  </p>
 );
};

export default TotalResult;