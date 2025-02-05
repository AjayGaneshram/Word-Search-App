import React, { useContext, useEffect, useState } from "react";
import Header from "../HomeComponents/Header";
import SearchComponent from "../search/SearchBar";
import CustomDropdown from "./CustomSelector";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
const itemsPerPageOptions = [8, 16, 24, 32];
const WordBookMaraimoozhi = () => {
  const [wordDetails, setWordDetails] = useState([]);
  const { outputJson, searchResults } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (outputJson) {
      setWordDetails(outputJson.words);
    }
  }, [outputJson]);

  const getFilteredData = () => {
    if (
      !searchResults ||
      (!searchResults.words.length &&
        !searchResults.books.length &&
        !searchResults.maraiMoozhis.length)
    ) {
      return outputJson ? outputJson.words : [];
    }

    return outputJson.words.filter(
      (word) =>
        searchResults.words.some((w) => w.word === word.wordName) ||
        searchResults.books.some((b) => word.books.includes(b.bookName)) ||
        searchResults.maraiMoozhis.some((m) =>
          word.maraimoozhis.includes(m.maraiMoozhiName)
        )
    );
  };

  const filteredWordDetails = getFilteredData();
  const totalPages = Math.ceil(filteredWordDetails.length / itemsPerPage);
  const currentItems = filteredWordDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const wordHandleNavigate = (word) =>
    navigate(`/Word-Search-App/words/${word}`);
  const homePageNavigate = () => {
    navigate(`/Word-Search-App/home`);
  };
  const Card = ({ uniqueDetails }) => {
    const [showMoreMarai, setShowMoreMarai] = useState(false);
    const [showMoreBooks, setShowMoreBooks] = useState(false);

    return (
      <div className="m-4 p-6 w-full max-w-sm bg-white shadow-lg rounded-lg border border-red-200 shadow-xl">
        <div className="flex items-center justify-between">
          <h1
            className="text-xl md:text-2xl text-red-600 font-bold underline underline-offset-4 cursor-pointer"
            title="மேலும் காண்க"
            onClick={() => wordHandleNavigate(uniqueDetails.wordName)}
          >
            {uniqueDetails.wordName}
          </h1>
        </div>
        <div className="mt-4">
          <b className="text-gray-800">பொருள் </b>
          <p>{uniqueDetails.wordNameDescription}</p>
        </div>

        <ul className="mt-4">
          <b className="text-gray-800">மறை மொழிகள்</b>
          {uniqueDetails.maraimoozhis
            .slice(0, showMoreMarai ? uniqueDetails.maraimoozhis.length : 2)
            .map((ele, index) => (
              <li key={index} className="list-disc ml-4 text-gray-600">
                {ele}
              </li>
            ))}
          {uniqueDetails.maraimoozhis.length > 2 && (
            <button
              onClick={() => setShowMoreMarai((prev) => !prev)}
              className="text-blue-500 mt-2"
            >
              {showMoreMarai ? "சுருக்குக" : "மேலும் காண்க"}
            </button>
          )}
        </ul>

        <ul className="mt-4">
          <b className="text-gray-800">நூல்கள்: </b>
          {uniqueDetails.books
            .slice(0, showMoreBooks ? uniqueDetails.books.length : 3)
            .map((ele, index) => (
              <span key={index} className="text-gray-600">
                {ele}
                {index < uniqueDetails.books.length - 1 && ", "}
              </span>
            ))}
          {uniqueDetails.books.length > 3 && (
            <button
              onClick={() => setShowMoreBooks((prev) => !prev)}
              className="text-blue-500 mt-2"
            >
              {showMoreBooks ? "சுருக்குக" : "மேலும் காண்க"}
            </button>
          )}
        </ul>
      </div>
    );
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return (
      <ul className="flex space-x-2 mt-4 justify-center">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border rounded text-red-500 bg-red-50"
            >
              « முந்தைய
            </button>
          </li>
        )}
        {pages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-1">{page}</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage ? "bg-red-600 text-white" : ""
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border rounded text-red-500 bg-red-50"
            >
              அடுத்து »
            </button>
          </li>
        )}
      </ul>
    );
  };
  return (
    <div className="bg-stone-50">
      <Header />
      <div className="">
        <div className="mb-4 p-6">
          <a className="text-red-500 hover:text-orange-700 transition text-lg flex items-center">
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
            <span className="cursor-pointer" onClick={homePageNavigate}>
              முகப்புப்பக்கம்
            </span>
          </a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
        <div>
          <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
            திரட்டு
          </h1>
        </div>
        <SearchComponent />
        <div className="p-4">
          <div className="mb-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <label className="font-bold text-red-500">
              {filteredWordDetails.length == wordDetails.length && (
                <>மொத்த சொற்கள்: {filteredWordDetails.length}</>
              )}
              {filteredWordDetails.length != wordDetails.length && (
                <>தேடப்பட்ட முடிவுகள்: {filteredWordDetails.length}</>
              )}
            </label>

            <CustomDropdown
              itemsPerPageOptions={itemsPerPageOptions}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {renderPagination()}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-items-center">
            {currentItems.map((word) => (
              <Card key={word.wordName} uniqueDetails={word} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordBookMaraimoozhi;
