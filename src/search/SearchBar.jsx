import React, { useState } from "react";

const SearchComponent = () => {
  // Hardcoded data
  const hardcodedData = {
    words: [
      { id: 1, word: "சிவம்" },
      { id: 2, word: "அன்பு" },
      { id: 3, word: "அறிவு" },
    ],
    books: [
      { id: 1, bookName: "வடிவு நூல்" },
      { id: 2, bookName: "எண் நூல்" },
      { id: 3, bookName: "மூல நூல்" },
    ],
    maraiMoozhis: [
      { id: 1, maraiMoozhiName: "சிவமே கொள்கையாம்" },
      { id: 2, maraiMoozhiName: "ஆன்மிகத்தின் மூலம்" },
    ],
  };

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "words",
    "books",
    "maraiMoozhis",
  ]);
  const [filteredResults, setFilteredResults] = useState(hardcodedData);

  // Handle search input
  const handleSearch = (term, updatedCategories) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();

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

  // Handle category toggle
  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    // Reapply filtering for updated categories
    handleSearch(searchTerm, updatedCategories);
  };

  // Map category names to internal keys
  const categoryMap = {
    சொல்: "words",
    நூல்: "books",
    "மறை மொழி": "maraiMoozhis",
  };

  return (
    <div className="p-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="flex gap-2">
          {/* Category Buttons */}
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

        {/* Input and Dropdown */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value, selectedCategories)}
            placeholder={`தேடுக`} // Dynamically construct the placeholder
            className="w-full p-2 mt-4 border border-gray-300 rounded-lg"
          />

          {/* Dropdown Results Inside Search Bar */}
          {searchTerm && (
            <div className="absolute bg-white border border-gray-300 rounded-lg w-full mt-2 max-h-64 overflow-y-auto z-10">
              {selectedCategories.includes("words") &&
                filteredResults.words.length > 0 && (
                  <div className="p-2">
                    <h2 className="text-lg font-bold text-orange-400">
                      சொற்கள்
                    </h2>
                    <ul>
                      {filteredResults.words.map((word) => (
                        <li
                          key={word.id}
                          className="text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          {word.word}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {selectedCategories.includes("books") &&
                filteredResults.books.length > 0 && (
                  <div className="p-2">
                    <h2 className="text-lg font-bold text-orange-400">
                      நூல்கள்
                    </h2>
                    <ul>
                      {filteredResults.books.map((book) => (
                        <li
                          key={book.id}
                          className="text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          {book.bookName}
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
                          className="text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          {maraiMoozhi.maraiMoozhiName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
