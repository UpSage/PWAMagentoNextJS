"use client";

import { Category } from "../interface/category";
import Item from "./menu/Item";

interface ListProps {
 categories: Category[];
 basePath: string;
}

const Menu = ({ categories, basePath }: ListProps) => {
 return (
  <ul className="space-y-2 text-[15px]">
   {
    categories.map((category) => (
     <Item key={category.id} category={category} basePath={basePath} />
    ))
   }
  </ul>
 );
};

export default Menu;