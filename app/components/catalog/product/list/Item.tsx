"use client";

import Name from "./item/Name";
import Sku from "./item/Sku";
import ImageThumbnail from "./item/ImageThumbnail";
import { Product } from "@/app/components/catalog/interface/products";

interface ItemProps {
 product: Product;
}

const Item = ({ product }: ItemProps) => {
 return (
  <li className="bg-white p-4 border flex flex-col justify-between">
   {
    product.thumbnail && (
     <ImageThumbnail src={product.thumbnail.url} alt={product.thumbnail.label} />
    )
   }
   <div>
    <Name name={product.name} />
    <Sku sku={product.sku} />
   </div>
  </li>
 );
};

export default Item;