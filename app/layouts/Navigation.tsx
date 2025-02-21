"use client";

import Close from "./navigation/Close";
import Overlay from "./navigation/Overlay";

type NavigationProps = {
 navigation: React.ReactNode;
 isOpen: boolean;
 onClose: () => void;
};

const Navigation = ({ navigation, isOpen, onClose }: NavigationProps) => {
 return (
  <>
   {isOpen && <Overlay onClick={onClose} />}
   <nav className={`fixed inset-y-0 left-0 w-[300px] bg-[#20232b] shadow-lg transform ${ isOpen ? "translate-x-0" : "-translate-x-full" } transition-transform duration-300 ease-in-out z-50`}>
    <div className="flex flex-col h-full">
     <Close onClick={onClose} />
     <div className="p-4 flex-1 overflow-y-auto">{navigation}</div>
    </div>
   </nav>
  </>
 );
};

export default Navigation;