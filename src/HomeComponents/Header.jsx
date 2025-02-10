import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true, // ✅ Instantly register and activate SW
  onNeedRefresh() {
    location.reload(); // ✅ Auto-refresh the page when an update is available
  },
});

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref for detecting outside clicks

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
   
  }, [menuOpen]);

  const handleNavigate = () => {
    navigate(`/Word-Search-App/allBooks`);
    setMenuOpen(false);
  };
  const wordNavigate = () => {
    navigate(`/Word-Search-App/allWords`);
    setMenuOpen(false);
  };
  const maraiMoozhiNavigate = () => {
    navigate(`/Word-Search-App/allMaraiMoozhis`);
    setMenuOpen(false);
  };
  const homePageNavigate = () => {
    navigate(`/Word-Search-App/home`);
    setMenuOpen(false);
  };
  const tirattuPageNavigate = () => {
    navigate(`/Word-Search-App/tirattu`);
    setMenuOpen(false);
  };

  return (
    <div className="bg-red-800 h-16 w-full relative">
      {/* Navbar */}
      <div className="flex justify-between items-center h-full px-4 md:px-8 border-b-2 border-white-200 border-b-white-500">
        {/* App Name */}
        <h1 className="text-white font-bold text-lg md:text-2xl cursor-pointer">
          <a onClick={() => homePageNavigate()}>செம்மை</a>
        </h1>
        {/* Hamburger Icon */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="text-white text-3xl">
              {/* &times; */}
              </span>
          ) : 
          (
            <span className="text-white text-3xl">&#9776;</span>
          )}
        </button>

        {/* Menu Items for Desktop */}
        <div className="hidden md:flex gap-x-8">
          <b onClick={tirattuPageNavigate} className="text-white text-base md:text-lg cursor-pointer">
            <a>திரட்டு</a>
          </b>
          <b onClick={wordNavigate} className="text-white text-base md:text-lg cursor-pointer">
            <a>சொற்கள்</a>
          </b>
          <b onClick={maraiMoozhiNavigate} className="text-white text-base md:text-lg cursor-pointer">
            <a> மறை மொழிகள்</a>
          </b>
          <b onClick={handleNavigate} className="text-white text-base md:text-lg cursor-pointer">
            <a>நூல்கள்</a>
          </b>
        </div>
      </div>

      {/* Collapsible Menu for Mobile */}
      {menuOpen && (
        <div
          ref={menuRef} // Attach ref to the menu
          className="absolute top-full left-0 w-full bg-red-800 z-50 md:hidden flex flex-col gap-y-2 p-4 shadow-lg"
        >
          <b onClick={tirattuPageNavigate} className="text-white text-base md:text-lg cursor-pointer">
            <a>திரட்டு</a>
          </b>
          <b onClick={wordNavigate} className="text-white text-base cursor-pointer">
            <a>சொற்கள்</a>
          </b>
          <b onClick={maraiMoozhiNavigate} className="text-white text-base cursor-pointer">
            <a> மறை மொழிகள்</a>
          </b>
          <b onClick={handleNavigate} className="text-white text-base cursor-pointer">
            <a>நூல்கள்</a>
          </b>
        </div>
      )}
    </div>
  );
};

export default Header;
