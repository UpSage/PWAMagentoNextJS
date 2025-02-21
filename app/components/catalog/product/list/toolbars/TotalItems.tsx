"use client";

interface TotalItemsProps {
 totalCount: number;
 isLoading: boolean;
}

const TotalItems = ({ totalCount, isLoading }: TotalItemsProps) => {
 return (
  <div className="text-sm text-gray-500">
   {
    isLoading ? (
     <p>Loading products...</p>
    ) : (
     <p>
      {
       totalCount > 0 ? `Total Products: ${totalCount}` : "No products available"
      }
     </p>
    )
   }
  </div>
 );
};

export default TotalItems;