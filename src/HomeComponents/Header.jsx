import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/allBooks`);
  };
  const wordNavigate = () => {
    navigate(`/allWords`);
  };
  const maraiMoozhiNavigate = () => {
    navigate(`/allMaraiMoozhis`);
  };
  return (
    <div className="bg-orange-400 h-16 w-full relative">
      {/* Navbar */}
      <div className="flex justify-between items-center h-full px-4 md:px-8">
        {/* App Name */}
        <h1 className="text-white font-bold text-lg md:text-2xl cursor-pointer">
          <a onClick={() => navigate(`/`)}>செம்மை</a>
        </h1>

        {/* Hamburger Icon */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu Items for Desktop */}
        <div className="hidden md:flex gap-x-8">
          <b className="text-white text-base md:text-lg cursor-pointer">
            <a onClick={() => wordNavigate()}>சொற்கள்</a>
          </b>
          <b className="text-white text-base md:text-lg cursor-pointer">
            <a onClick={() => handleNavigate()}>நூல்கள்</a>
          </b>
          <b className="text-white text-base md:text-lg cursor-pointer">
            <a onClick={() => maraiMoozhiNavigate()}> மறை மொழிகள்</a>
          </b>
        </div>
      </div>

      {/* Collapsible Menu for Mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-orange-500 z-50 md:hidden flex flex-col gap-y-2 p-4 shadow-lg">
          <b className="text-white text-base cursor-pointer">
            {" "}
            <a onClick={() => wordNavigate()}>சொற்கள்</a>
          </b>
          <b className="text-white text-base cursor-pointer">
            {" "}
            <a onClick={() => handleNavigate()}>நூல்கள்</a>
          </b>
          <b className="text-white text-base cursor-pointer">
            <a onClick={() => maraiMoozhiNavigate()}> மறை மொழிகள்</a>
          </b>
        </div>
      )}
    </div>
  );
};

export default Header;
