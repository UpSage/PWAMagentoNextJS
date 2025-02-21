import React, { useEffect, useState } from "react";

interface PaginationProps {
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    
 const [page, setPage] = useState(currentPage);
 
 useEffect(() => {
  if (page > totalPages) {
   setPage(totalPages);
   onPageChange(totalPages);
  }
 }, [totalPages, page, onPageChange]);
 
 if (totalPages <= 1) return null;
 
 const getPageNumbers = () => {
  const pages: (number | string)[] = [];
  const delta = 2;
  
  if (totalPages <= 7) {
   return [...Array(totalPages)].map((_, index) => index + 1);
  }
  
  pages.push(1);
  
  if (page > delta + 2) {
   pages.push("...");
  }
  
  for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
   pages.push(i);
  }
  
  if (page < totalPages - (delta + 1)) {
   pages.push("...");
  }
  
  pages.push(totalPages);
  
  return pages;

 };
 
 return (
  <nav className="flex justify-center mt-8">
   <ul className="flex items-center space-x-1">
    
    <li>
     <button
      onClick={() => {
       const newPage = Math.max(1, page - 1);
       setPage(newPage);
       onPageChange(newPage);
      }}
      disabled={page === 1}
      className={`px-3 py-2 ${page === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
     >&laquo;
     </button>
    </li>
    
    {
     getPageNumbers().map((p, index) => (
      <li key={index}>
       {
        typeof p === "number" ? (
         <button
          onClick={() => {
           setPage(p);
           onPageChange(p);
          }}
          className={`px-3 py-2 ${page === p ? "bg-blue-500 text-white font-bold" : "text-gray-700 hover:bg-gray-200"}`}
         >{p}
         </button>
        ) : (
         <span className="px-3 py-2 text-gray-500">...</span>
        )
       }
      </li>
     ))
    }
    
    <li>
     <button
      onClick={() => {
       const newPage = Math.min(totalPages, page + 1);
       setPage(newPage);
       onPageChange(newPage);
      }}
      disabled={page >= totalPages}
      className={`px-3 py-2 ${page >= totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
     >&raquo;
     </button>
    </li>
  
   </ul>
  </nav>
 );
 
};

export default Pagination;