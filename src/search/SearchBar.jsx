import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const SearchComponent = () => {
  // ✅ State for storing fetched data
  const [hardcodedData, setHardcodedData] = useState({
    words: [],
    books: [],
    maraiMoozhis: [],
  });

  // ✅ State for search
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
  const navigate = useNavigate();
  const wordHandleNavigate = (word) => {
    navigate(`/Word-Search-App/words/${word}`);
  };
  const handleNavigate = (word) => {
    navigate(`/Word-Search-App/book/${word}`);
  };
  const maraimoozhiHandleNavigate = (word) => {
    navigate(`/Word-Search-App/maraiMozhi/${word}`);
  };
  const { outputJson } = useContext(DataContext);
  // ✅ Fetch data from output.json
  useEffect(() => {
    // fetch("./output.json") // Adjust path if needed
    //   .then((response) => response.json())
    //   .then((data) => {
    if (outputJson != null) {
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
    } // ✅ Initialize filtered data
    // })
    // .catch((error) => console.error("Error fetching JSON:", error));
  }, [outputJson]);

  // ✅ Search Functionality
  const handleSearch = (term, updatedCategories = selectedCategories) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();

    if (!hardcodedData.words.length) return; // ✅ Prevent searching if data not loaded

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

  // ✅ Toggle Category
  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    handleSearch(searchTerm, updatedCategories);
  };

  // ✅ Mapping for category names
  const categoryMap = {
    சொல்: "words",
    நூல்: "books",
    "மறை மொழி": "maraiMoozhis",
  };

  // ✅ Construct dynamic placeholder text
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
      {/* Category Toggle Buttons */}
      <div className="flex gap-2">
        {Object.keys(categoryMap).map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(categoryMap[category])}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              selectedCategories.includes(categoryMap[category])
                ? "bg-orange-400 text-white"
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

      {/* Search Input */}
      <div className="relative mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholderText}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Search Results Dropdown */}
        {searchTerm && (
          <div className="absolute bg-white border border-gray-300 rounded-lg w-full mt-2 max-h-64 overflow-y-auto z-10">
            {selectedCategories.includes("words") &&
              filteredResults.words.length > 0 && (
                <div className="p-2">
                  <h2 className="text-lg font-bold text-orange-400">சொற்கள்</h2>
                  <ul>
                    {filteredResults.words.map((word) => (
                      <li
                        key={word.id}
                        className="p-4 hover:bg-orange-50 rounded-md transition flex items-center justify-between"
                      >
                        <span className="text-gray-700 font-medium">
                          {word.word}
                        </span>
                        <button
                          onClick={() => {
                            wordHandleNavigate(word.word);
                          }}
                          className="text-sm text-orange-500 hover:text-orange-700 transition"
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
                  <h2 className="text-lg font-bold text-orange-400">நூல்கள்</h2>
                  <ul>
                    {filteredResults.books.map((book) => (
                      <li
                        key={book.id}
                        className="p-4 hover:bg-orange-50 rounded-md transition flex items-center justify-between"
                      >
                        <span className="text-gray-700 font-medium">
                          {book.bookName}
                        </span>
                        <button
                          onClick={() => handleNavigate(book.bookName)}
                          className="text-sm text-orange-500 hover:text-orange-700 transition"
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
                  <h2 className="text-lg font-bold text-orange-400">
                    மறை மொழிகள்
                  </h2>
                  <ul>
                    {filteredResults.maraiMoozhis.map((maraiMoozhi) => (
                      <li
                        key={maraiMoozhi.id}
                        className="p-4 hover:bg-orange-50 rounded-md transition flex items-center justify-between"
                      >
                        <span className="text-gray-700 font-medium">
                          {maraiMoozhi.maraiMoozhiName}
                        </span>
                        <button
                          onClick={() =>
                            maraimoozhiHandleNavigate(
                              maraiMoozhi.maraiMoozhiName
                            )
                          }
                          className="text-sm text-orange-500 hover:text-orange-700 transition"
                        >
                          மேலும் அறிக
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
