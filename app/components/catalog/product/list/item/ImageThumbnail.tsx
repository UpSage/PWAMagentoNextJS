"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageThumbnailProps {
 src: string;
 alt: string;
}

const fallbackImage = process.env.NEXT_PUBLIC_MEDIA_URL + "catalog/product/placeholder/default/Image-Coming-Soon_1.jpg";

const processImageUrl = (url: string) => {
 const cleanedUrl = url.replace(/\/cache\/[^/]+\//, "/");
 try {
  const urlObj = new URL(cleanedUrl);
  return `${urlObj.origin}/fit-in/500x500/filters:format(webp)${urlObj.pathname}`;
 } catch {
  return cleanedUrl;
 }
};

const ImageThumbnail = ({ src, alt }: ImageThumbnailProps) => {
    
 const [imageSrc, setImageSrc] = useState<string>("");
 useEffect(() => {
  if(src) {
   const transformedSrc = processImageUrl(src);
   setImageSrc(transformedSrc);
  } else {
   setImageSrc(fallbackImage);
  }
 }, [src]);
 
 return (
  <figure className="mb-4">
   {
    imageSrc && (
     <Image
      src={imageSrc}
      alt={alt}
      width={250}
      height={250}
      className="rounded-md"
      layout="responsive"
      loading="lazy"
      onError={(e) => {
       setImageSrc(fallbackImage);
      }}
     />
    )
   }
  </figure>
 );

};

export default ImageThumbnail;