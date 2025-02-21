"use client";

import Logo from "./header/Logo";
import Open from "./navigation/Open";

const Header = ({ onOpen }: { onOpen: () => void }) => (
 <header className="p-4 bg-white border-b">
  <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
   <Open onClick={onOpen} />
   <div className="mx-auto">
    <Logo />
   </div>
  </div>
 </header>
);

export default Header;