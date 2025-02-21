"use client";

interface SkuProps {
 sku: string;
}

const Sku = ({ sku }: SkuProps) => {
 return <p className="text-sm text-gray-600">SKU: {sku}</p>;
};

export default Sku;  