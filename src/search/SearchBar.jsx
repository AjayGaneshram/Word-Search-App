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

  // Set the data from outputJson when available
  useEffect(() => {
    if (outputJson) {
      const formattedData = {
        words: outputJson.wordList.map((word, index) => ({
          id: index + 1,
          word,
        })),
        books: outputJson.bookList.map((bookName, index) => ({
          id: index + 1,
          bookName,
        })),
        maraiMoozhis: outputJson.maraiMoozhiList.map(
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
      setSearchResults(hardcodedData);
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
      ? `${selectedCategories
          .map((cat) =>
            Object.keys(categoryMap).find((key) => categoryMap[key] === cat)
          )
          .join(", ")} தேடுக`
      : "தேடுக";

  return (
    <div className="p-8">
      <div className="flex gap-2">
        {Object.keys(categoryMap).map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(categoryMap[category])}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              selectedCategories.includes(categoryMap[category])
                ? "bg-red-700 text-white"
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
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholderText}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          onFocus={() => setIsDropdownOpen(true)}
        />

        {isDropdownOpen && (
          <div className="absolute bg-white border border-red-300 rounded-lg w-full mt-2 max-h-64 overflow-y-auto z-10">
            <button
              onClick={closeDropdown}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-gray-300 hover:text-red-900 transition  
             text-sm sm:w-6 sm:h-7 sm:text-base md:w-6 md:h-6 md:text-sm float-right"
            >
              ✕
            </button>
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
                        {filteredResults.words.map((word) => (
                          <li
                            key={word.id}
                            className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
                          >
                            <span className="text-gray-700 font-medium">
                              {word.word}
                            </span>
                            <button
                              onClick={() =>
                                navigate(`/Word-Search-App/words/${word.word}`)
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
                        {filteredResults.books.map((book) => (
                          <li
                            key={book.id}
                            className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
                          >
                            <span className="text-gray-700 font-medium">
                              {book.bookName}
                            </span>
                            <button
                              onClick={() =>
                                navigate(
                                  `/Word-Search-App/book/${book.bookName}`
                                )
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
                        {filteredResults.maraiMoozhis.map((maraiMoozhi) => (
                          <li
                            key={maraiMoozhi.id}
                            className="p-4 hover:bg-red-50 rounded-md transition flex items-center justify-between"
                          >
                            <span className="text-gray-700 font-medium">
                              {maraiMoozhi.maraiMoozhiName}
                            </span>
                            <button
                              onClick={() =>
                                navigate(
                                  `/Word-Search-App/maraiMozhi/${maraiMoozhi.maraiMoozhiName}`
                                )
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
