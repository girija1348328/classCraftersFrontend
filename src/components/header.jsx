import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
      <div className="text-xl font-bold text-[#557A66]">
        ClassCrafters
      </div>
      <nav className="flex items-center gap-6">
        <a href="/" className="text-gray-700 hover:text-[#557A66] font-medium">Home</a>
        <a href="/about" className="text-gray-700 hover:text-[#557A66] font-medium">About</a>
        <a href="/contact" className="text-gray-700 hover:text-[#557A66] font-medium">Contact</a>
      </nav>
    </header>
  );
};

export default Header;