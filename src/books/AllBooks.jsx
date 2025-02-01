import React, { useContext, useEffect, useState } from "react";
import Header from "../HomeComponents/Header";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const AllBooks = () => {
  const [wordData, setWordData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { outputJson } = useContext(DataContext);
  useEffect(() => {
    const fetchWordData = async () => {
      // setWordData([
      //   "மூல நூல்",
      //   "எண் நூல்",
      //   "மெய்",
      //   "வேட்டல்",
      //   "ஊழி நூல்",
      //   "வடிவு நூல்",
      // ]);
      // setFilteredData([
      //   "மூல நூல்",
      //   "எண் நூல்",
      //   "மெய்",
      //   "வேட்டல்",
      //   "ஊழி நூல்",
      //   "வடிவு நூல்",
      // ]);
      // fetch("./output.json") // Fetch from public folder
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setWordData(data["bookList"]);
      //     setFilteredData(data["bookList"]); // Set both original and filtered data
      //   })
      //   .catch((error) => console.error("Error fetching JSON:", error));

      setWordData(outputJson["bookList"]);
      setFilteredData(outputJson["bookList"]);
    };
    fetchWordData();
  }, []);
  const navigate = useNavigate();
  const handleNavigate = (word) => {
    navigate(`/Word-Search-App/book/${word}`);
  };
  const homePageNavigate = () => {
    navigate(`/Word-Search-App/home`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredData(
      wordData.filter((word) => word.toLowerCase().includes(value))
    );
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-red-50">
      <Header />
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        {/* Back to Homepage */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
        <div className="mb-4">
          <a
            // href="/Word-Search-App"
            onClick={() => homePageNavigate()}
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
            முகப்புப்பக்கம்
          </a>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          நூல்கள்
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="நூல்களை தேடுக"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-lg border border-gray-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700"
          />
        </div>

        {/* List Section */}
        <ul className="bg-white rounded-lg shadow-lg p-6 divide-y divide-red-200">
          {filteredData.length > 0 ? (
            filteredData.map((word, index) => (
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
      </div>
    </div>
  );
};

export default AllBooks;
