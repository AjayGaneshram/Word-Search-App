import React, { useState } from "react";

const CustomDropdown = ({
  itemsPerPageOptions,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1);
    setIsOpen(false); // Close dropdown after selecting
  };

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        onClick={toggleDropdown}
        className="flex justify-around p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-72 md:w-80 lg:w-96 text-center"
      >
        {itemsPerPage} சொற்களாக வடி{" "}
        {!isOpen && <h1 className="text-[#dc2626]">▼</h1>}{" "}
        {isOpen && <h1 className="text-[#dc2626]">▲</h1>}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-4 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {itemsPerPageOptions.sort().map((size) => (
            <li
              key={size}
              onClick={() => handleSelectOption(size)}
              className="px-4 py-2 text-center cursor-pointer hover:bg-red-100"
            >
              {size} சொற்களாக வடி
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
