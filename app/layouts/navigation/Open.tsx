"use client";

import { Menu } from "lucide-react";

type OpenProps = {
 onClick: () => void;
};

const Open = ({ onClick }: OpenProps) => (
 <button className="p-2 text-white hover:bg-gray-700 transition" onClick={onClick}>
  <Menu size={24} />
 </button>
);

export default Open;