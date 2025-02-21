"use client";

import Item from "./list/Item";
import { Product } from "@/app/components/catalog/interface/products";

interface ListProps {
 products: Product[];
}

const List = ({ products }: ListProps) => {
 return (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {
    products.map((product) => (
     <Item key={product.id} product={product} />
    ))
   }
  </ul>
 );
};

export default List;