'use client'

import { useState, useEffect } from 'react';

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./globals.css";

const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if(isSSR) return null;

  return (
    <html lang="en">
      <body>
        <div>
          <Navbar /> 
          <div className="flex gap-6 md:gap-20">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;