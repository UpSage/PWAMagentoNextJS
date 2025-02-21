"use client";

import { X } from "lucide-react";

type CloseProps = {
 onClick: () => void;
};

const Close = ({ onClick }: CloseProps) => (
 <button className="self-end p-2 text-white bg-[#004672] hover:text-[#004672] hover:bg-gray-300 transition" onClick={onClick}>
  <X size={24} />
 </button>
);

export default Close;