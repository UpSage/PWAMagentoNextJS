"use client";

interface NameProps {
 name: string;
}

const Name = ({ name }: NameProps) => {
 return <h2 className="text-lg font-semibold text-gray-800">{name}</h2>;
};

export default Name;