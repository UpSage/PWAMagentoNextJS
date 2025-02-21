"use client";

import { Menu } from "lucide-react";

type OpenProps = {
 onClick: () => void;
};

const Open = ({ onClick }: OpenProps) => (
 <button className="p-1 bg-white text-[#004672] hover:bg-[#004672] hover:text-white transition border" onClick={onClick}>
  <Menu size={24} />
 </button>
);

export default Open;