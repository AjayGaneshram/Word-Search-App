import React, { useContext, useEffect, useState } from "react";
import Header from "../HomeComponents/Header";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const itemsPerPageOptions = [8, 16, 24, 32, 40, 48, 56, 64];

const AllBooks = () => {
  const [wordData, setWordData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { outputJson } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  useEffect(() => {
    if (outputJson) {
      setWordData(outputJson["bookList"]);
      setFilteredData(outputJson["bookList"]);
    }
  }, [outputJson]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = wordData.filter((word) =>
      word.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const navigate = useNavigate();
  const handleNavigate = (word) => navigate(`/Word-Search-App/book/${word}`);
  const homePageNavigate = () => navigate(`/Word-Search-App/home`);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-red-50">
      
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
           <span  className="cursor-pointer" onClick={homePageNavigate}>முகப்புப்பக்கம்</span>
          </a>
        </div>

        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          நூல்கள்
        </h1>

        <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4 border border-red-500 rounded-lg p-2 bg-white relative">
        {/* Search Icon */}
        <span className="p-2 text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 1 1-1.42 1.42l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.24 10.24A6 6 0 0 0 10 4z" />
          </svg>
        </span>
          <input
            type="text"
            placeholder="நூல்களை தேடுக"
            value={searchTerm}
            onChange={handleSearch}
          className="flex-1 p-2 text-lg border-b-2 border-red-500 focus:outline-none w-full bg-white"
          />
          {searchTerm.length>0 && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFilteredData(outputJson["bookList"]);
            }}
            className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z" />
            </svg>
          </button>
        )}
        </div>
        
        <ul className="bg-white rounded-lg shadow-lg p-6 divide-y divide-red-200">
          {currentItems.length > 0 ? (
            currentItems.sort().map((word, index) => (
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
            <p className="text-gray-500 text-center">நூல்கள் கிடைக்கவில்லை.</p>
          )}
        </ul>
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
          {[...Array(totalPages)].sort().map((_, i) => (
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
      </div>
      </div>
    </div>
  );
};

export default AllBooks;
