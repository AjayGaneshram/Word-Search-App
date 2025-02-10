import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const SearchComponent = () => {
  const [hardcodedData, setHardcodedData] = useState({
    words: [],
    books: [],
    maraiMoozhis: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "words",
    "books",
    "maraiMoozhis",
  ]);
  const [filteredResults, setFilteredResults] = useState({
    words: [],
    books: [],
    maraiMoozhis: [],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { outputJson, setSearchResults, searchResults } =
    useContext(DataContext);
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);
  // Set the data from outputJson when available
  useEffect(() => {
    if (outputJson) {
      const formattedData = {
        words: outputJson.wordList.sort().map((word, index) => ({
          id: index + 1,
          word,
        })),
        books: outputJson.bookList.sort().map((bookName, index) => ({
          id: index + 1,
          bookName,
        })),
        maraiMoozhis: outputJson.maraiMoozhiList.sort().map(
          (maraiMoozhiName, index) => ({
            id: index + 1,
            maraiMoozhiName,
          })
        ),
      };
      setHardcodedData(formattedData);
      setFilteredResults(formattedData);
    }
  }, [outputJson]);

  // Handle search term change and filter results based on selected categories
  const handleSearch = (term, updatedCategories = selectedCategories) => {
    setSearchTerm(term);
    // setIsDropdownOpen(term.length > 0);

    const lowercasedTerm = term.toLowerCase();
    if (!term.trim()) {
      setFilteredResults(hardcodedData);
      return;
    }
    if (!hardcodedData.words.length) return;

    const filteredData = {
      words: updatedCategories.includes("words")
        ? hardcodedData.words.filter((word) =>
            word.word.toLowerCase().includes(lowercasedTerm)
          )
        : [],
      books: updatedCategories.includes("books")
        ? hardcodedData.books.filter((book) =>
            book.bookName.toLowerCase().includes(lowercasedTerm)
          )
        : [],
      maraiMoozhis: updatedCategories.includes("maraiMoozhis")
        ? hardcodedData.maraiMoozhis.filter((maraiMoozhi) =>
            maraiMoozhi.maraiMoozhiName.toLowerCase().includes(lowercasedTerm)
          )
        : [],
    };

    setFilteredResults(filteredData);
    setSearchResults(filteredData);
  };

  // Toggle category selection for filter
  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    handleSearch(searchTerm, updatedCategories);
  };

  // Close the dropdown on button click
  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setSearchResults(filteredResults);
  };

  // Map categories
  const categoryMap = {
    சொல்: "words",
    நூல்: "books",
    "மறை மொழி": "maraiMoozhis",
  };

  // Placeholder text logic based on selected categories
  const placeholderText =
    selectedCategories.length > 0
      ? `${selectedCategories.sort()
          .map((cat) =>
            Object.keys(categoryMap).find((key) => categoryMap[key] === cat)
          )
          .join(", ")} தேடுக`
      : "தேடுக";

  return (
    <div className="p-8">
      <div className="flex gap-2">
        {Object.keys(categoryMap).sort().map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(categoryMap[category])}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              selectedCategories.includes(categoryMap[category])
                ? "bg-red-800 text-white font-bold"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category}
            <span className="text-lg font-bold">
              {selectedCategories.includes(categoryMap[category]) ? "x" : "+"}
            </span>
          </button>
        ))}
      </div>

      <div ref={searchRef} className="relative mt-4">
      <div className="flex items-center gap-2 mb-4 border border-red-500 rounded-lg p-2 bg-white relative">
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
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholderText}
          className="flex-1 p-2 text-lg border-b-2 border-red-500 focus:outline-none w-full bg-white"
          onFocus={() => setIsDropdownOpen(true)}
        />
       {searchTerm.length>0 &&
          <button
           onClick={() => {
            setIsDropdownOpen(false)
            setSearchTerm("");
            setFilteredResults(hardcodedData); 
            setSearchResults(filteredResults);
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
          </button>}
        
</div>
        {isDropdownOpen && (
          <div className="absolute bg-white border border-red-300 rounded-lg w-full mt-2 max-h-64 overflow-y-auto z-10">
            {filteredResults.words.length === 0 &&
            filteredResults.books.length === 0 &&
            filteredResults.maraiMoozhis.length === 0 ? (
              <p className="p-4 text-gray-500">தேடல் முடிவுகள் இல்லை</p>
            ) : (
              <>
                {selectedCategories.includes("words") &&
                  filteredResults.words.length > 0 && (
                    <div className="p-2">
                      <h2 className="text-lg font-bold text-red-600">
                        சொற்கள்
                      </h2>
                      <ul>
                        {filteredResults.words.sort().map((word) => (
                          <li
                            key={word.id}
                            className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <span className="text-gray-700 font-medium">
                              {word.word}
                            </span>
                            <button
                              onClick={() =>
                                {setIsDropdownOpen(false);
                                navigate(`/Word-Search-App/words/${word.word}`)}
                              }
                              className="text-sm text-red-500 hover:text-orange-700 transition"
                            >
                              மேலும் அறிக
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {selectedCategories.includes("books") &&
                  filteredResults.books.length > 0 && (
                    <div className="p-2">
                      <h2 className="text-lg font-bold text-red-600">
                        நூல்கள்
                      </h2>
                      <ul>
                        {filteredResults.books.sort().map((book) => (
                          <li
                            key={book.id}
                            className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
                          >
                            <span className="text-gray-700 font-medium">
                              {book.bookName}
                            </span>
                            <button
                              onClick={() =>
                              { setIsDropdownOpen(false);
                                navigate(
                                  `/Word-Search-App/book/${book.bookName}`
                                )}
                              }
                              className="text-sm text-red-500 hover:text-orange-700 transition"
                            >
                              மேலும் அறிக
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {selectedCategories.includes("maraiMoozhis") &&
                  filteredResults.maraiMoozhis.length > 0 && (
                    <div className="p-2">
                      <h2 className="text-lg font-bold text-red-600">
                        மறை மொழிகள்
                      </h2>
                      <ul>
                        {filteredResults.maraiMoozhis.sort().map((maraiMoozhi) => (
                          <li
                            key={maraiMoozhi.id}
                            className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
                          >
                            <span className="text-gray-700 font-medium">
                              {maraiMoozhi.maraiMoozhiName}
                            </span>
                            <button
                              onClick={() =>{
                                setIsDropdownOpen(false);
                                navigate(
                                  `/Word-Search-App/maraiMozhi/${maraiMoozhi.maraiMoozhiName}`
                                )}
                              }
                              className="text-sm text-red-500 hover:text-orange-700 transition"
                            >
                              மேலும் அறிக
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
