"use client";

import Name from "./item/Name";
import Type from "./item/Type";
import Sku from "./item/Sku";
import ImageThumbnail from "./item/ImageThumbnail";
import { Product } from "@/app/components/catalog/interface/products";

interface ItemProps {
 product: Product;
}

const Item = ({ product }: ItemProps) => {
 return (
  <li className="bg-white p-4 shadow-md">
   <Name name={product.name} />
   <Type typeId={product.type_id} />
   <Sku sku={product.sku} />
   {
    product.thumbnail && (
     <ImageThumbnail src={product.thumbnail.url} alt={product.thumbnail.label} />
    )
   }
  </li>
 );
};

export default Item;