import React, { useState, useMemo, useRef, useEffect } from "react";

const WordListFirstLetter = ({ wordData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus the input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Filter words based on search query
  const filteredWords = useMemo(() => {
    const words = wordData.filter((word) =>
      word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setIsDropdownOpen(words.length > 0 || searchQuery.length > 0);
    return words;
  }, [searchQuery, wordData]);

  // Group words by first letter
  const groupedWords = useMemo(() => {
    return filteredWords.reduce((acc, word) => {
      const letter = word.charAt(0).toUpperCase();
      acc[letter] = acc[letter] ? [...acc[letter], word] : [word];
      return acc;
    }, {});
  }, [filteredWords]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
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

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="சொற்களை தேடுக"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 text-lg border-b-2 border-red-500 focus:outline-none w-full bg-white"
        />

        {/* Close Button */}
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsDropdownOpen(false);
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

      {/* Word Dropdown */}
      {isDropdownOpen && (
        <div className="relative bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto z-10 p-2">
          {filteredWords.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              சொற்கள் கிடைக்கவில்லை
            </div>
          ) : (
            <div className="space-y-2">
  {Object.entries(groupedWords).map(([letter, words]) => (
    <details key={letter} className="border rounded-lg p-2 bg-gray-50" open={searchQuery.length > 0}>
      <summary className="text-lg font-bold cursor-pointer">
        {letter}
      </summary>
      <div className="mt-2 flex flex-wrap gap-2">
        {words.map((word, idx) => (
          <a
            key={idx}
            href={`#${encodeURIComponent(word)}`}
            className="p-2 rounded-lg bg-gray-100 hover:bg-red-800 hover:text-white transition-all"
          >
            {word}
          </a>
        ))}
      </div>
    </details>
  ))}
</div>

          )}
        </div>
      )}
    </div>
  );
};

export default WordListFirstLetter;
