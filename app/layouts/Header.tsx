"use client";

import Logo from "./header/Logo";
import Open from "./navigation/Open";

const Header = ({ onOpen }: { onOpen: () => void }) => (
 <header className="flex items-center p-4 bg-[#004672] text-white">
  <Open onClick={onOpen} />
  <div className="ml-4">
   <Logo />
  </div>
 </header>
);

export default Header;