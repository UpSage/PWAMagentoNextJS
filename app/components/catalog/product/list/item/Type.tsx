"use client";

interface TypeProps {
 typeId: string;
}

const Type = ({ typeId }: TypeProps) => {
 return <p className="text-sm text-gray-600">Type: {typeId}</p>;
};

export default Type;  