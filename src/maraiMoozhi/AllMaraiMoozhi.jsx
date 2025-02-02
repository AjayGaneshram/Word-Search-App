import React, { useContext, useEffect, useState } from "react";
import Header from "../HomeComponents/Header";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const itemsPerPageOptions = [8, 16, 24, 32, 40, 48, 56, 64];

const AllMaraiMoozhi = () => {
  const [wordData, setWordData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { outputJson } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  useEffect(() => {
    if (outputJson) {
      setWordData(outputJson["maraiMoozhiList"]);
      setFilteredData(outputJson["maraiMoozhiList"]);
    }
  }, [outputJson]);

  // Update filtered data and reset pagination
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = wordData.filter((word) =>
      word.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination calculations based on filteredData
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return (
      <ul className="flex flex-wrap justify-center gap-2 m-4">
      {currentPage > 1 && (
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 font-semibold border border-red-200 rounded text-red-500 bg-red-50"
          >
            « முந்தைய
          </button>
        </li>
      )}
      {[...Array(totalPages)].map((_, i) => (
        <li key={i}>
          <button
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              i + 1 === currentPage
                ? "bg-red-600 text-white"
                : "text-gray-700 bg-white"
            }`}
          >
            {i + 1}
          </button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 font-semibold border border-red-200 rounded text-red-500 bg-red-50"
          >
            அடுத்து »
          </button>
        </li>
      )}
    </ul>
    );
  };

  const navigate = useNavigate();
  const handleNavigate = (word) => navigate(`/Word-Search-App/maraiMozhi/${word}`);
  const homePageNavigate = () => navigate(`/Word-Search-App/home`);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-red-50">
      <Header />
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>

        {/* Back to Homepage */}
        <div className="mb-4">
          <a
           
            className="text-red-500 hover:text-orange-700 transition text-lg flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span  className="cursor-pointer" onClick={homePageNavigate}>முகப்புப்பக்கம்</span>
          </a>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">மறை மொழிகள்</h1>

        
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="மறை மொழிகளை தேடுக"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-lg border border-gray-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700"
          />
        </div>

        {/* List Section */}
        <ul className="bg-white rounded-lg shadow-lg p-6 divide-y divide-red-200">
          {currentItems.length > 0 ? (
            currentItems.map((word, index) => (
              <li
                key={index}
                className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
              >
                <span className="text-gray-700 font-medium">{word}</span>
                <button
                  onClick={() => handleNavigate(word)}
                  className="text-sm text-red-500 hover:text-orange-700 transition"
                >
                  மேலும் அறிக
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">மறை மொழிகள் கிடைக்கவில்லை.</p>
          )}
        </ul>

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );
};

export default AllMaraiMoozhi;
