"use client";

import React, { ReactNode, useState } from "react";
import Navigation from "./Navigation";
import Header from "./Header";

interface LayoutProps {
 navigation: ReactNode;
 children: ReactNode;
}

const Layout = ({ navigation, children }: LayoutProps) => {
    
 const [isOpen, setIsOpen] = useState(false);
 
 return (
  <div className="relative flex flex-col">
   <Header onOpen={() => setIsOpen(true)} />
   <Navigation navigation={navigation} isOpen={isOpen} onClose={() => setIsOpen(false)} />
   <main className="flex-grow p-4 bg-white">{children}</main>
  </div>
 );

};

export default Layout;