import React, { useEffect, useState } from "react";
import Header from "../HomeComponents/Header";
import { useNavigate } from "react-router-dom";

const AllWords = () => {
  const [wordData, setWordData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWordData = async () => {
      setWordData(["இயல்பு", "வேட்டல்", "சிவம்", "சக்தி"]);
      setFilteredData(["இயல்பு", "வேட்டல்", "சிவம்", "சக்தி"]);
      // await fetch("http://localhost:8080/words/names")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setWordData(data);
      //     setFilteredData(data); // Set both original and filtered data
      //   });
    };
    fetchWordData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredData(
      wordData.filter((word) => word.toLowerCase().includes(value))
    );
  };
  const wordHandleNavigate = (word) => {
    navigate(`/words/${word}`);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Header />
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-8 h-8 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all"
        title="Scroll to Top"
      >
        ↑
      </button>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Back to Homepage */}

        <div className="mb-4">
          <a
            href="/"
            className="text-orange-500 hover:text-orange-700 transition text-lg flex items-center"
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
            முகப்புப்பக்கம்
          </a>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          சொற்கள்
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="சொற்களை தேடு"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
          />
        </div>

        {/* List Section */}
        <ul className="bg-white rounded-lg shadow-lg p-6 divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((word, index) => (
              <li
                key={index}
                className="p-4 hover:bg-orange-50 rounded-md transition flex items-center justify-between"
              >
                <span className="text-gray-700 font-medium">{word}</span>
                <button
                  onClick={() => wordHandleNavigate(word)}
                  className="text-sm text-orange-500 hover:text-orange-700 transition"
                >
                  மேலும் அறிக
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">சொற்கள் கிடைக்கவில்லை.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AllWords;
