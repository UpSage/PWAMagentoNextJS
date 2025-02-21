"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Category } from "../../interface/category";

interface ItemProps {
 category: Category;
 basePath: string;
}

const Item = ({ category, basePath }: ItemProps) => {
 const [isExpanded, setIsExpanded] = useState(false);
 const hasChildren = category.children && category.children.length > 0;
 const categoryPath = `${basePath}/${category.url_key}`;

 return (
  <li className="relative pb-2 mb-2">
   <div className="flex items-center gap-2">
    {hasChildren && (
     <button onClick={() => setIsExpanded(!isExpanded)} className="text-white">
      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
     </button>
    )}
    <Link href={categoryPath}>
     <span className="text-white hover:none cursor-pointer">
      {category.name}
     </span>
    </Link>
   </div>
   {hasChildren && isExpanded && (
    <ul className="ml-4 mt-2 border-l border-dotted border-gray-200 pl-4 space-y-2">
     {category.children!.map((child, index, arr) => (
      <Item
       key={child.id}
       category={child}
       basePath={categoryPath}
      />
     ))}
    </ul>
   )}
  </li>
 );
};

export default Item;