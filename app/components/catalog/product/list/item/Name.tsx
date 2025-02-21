"use client";

interface NameProps {
 name: string;
}

const Name = ({ name }: NameProps) => {
 return <h2 className="text-md font-semibold text-[#004672] mb-2">{name}</h2>;
};

export default Name;