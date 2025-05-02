import React from 'react';

import { footerList2, footerList3 } from '../utils/constants';

const List = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-5">
    {items.map((item) => (
      <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer">
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <div className="flex flex-wrap gap-2">
        <p key="About" className="text-gray-400 text-sm hover:underline cursor-pointer">
          <a href="https://github.com/Sal-Adrian/youtok_app">About</a></p>
        <p key="AboutMe" className="text-gray-400 text-sm hover:underline cursor-pointer">
          <a href="https://sal-adrian.github.io/">About Me</a></p>
        <p key="AboutMe" className="text-gray-400 text-sm hover:underline cursor-pointer">
          <a href="https://github.com/Sal-Adrian">Github</a></p>
      </div>
      <List items={footerList2} />
      <List items={footerList3} />
      <p className="text-gray-400 text-sm mt-5">2025 YouTok</p>
    </div>
  )
}

export default Footer