import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between">
      <div className="flex items-center text-xl">
        <span>Search website</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none text-white md:text-black">Search</button>
          </span>
		  <input type="text"></input>
        </div>
        
      </div>
    </nav>
  );
};

export default NavBar;
