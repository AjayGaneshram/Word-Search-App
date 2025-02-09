import React, { useState, useMemo, useRef, useEffect } from "react";
const WordListFirstLetter = ({ wordData, component, viewType }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef(null);

  // Auto-focus the input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  // Search Filter

  const filteredWords = useMemo(() => {
    if(viewType=='firstLetter'){
      return wordData.filter(word =>
        word.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return wordData.map((word)=>{
      return word.wordName
    }).filter(word =>
      word.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, wordData]);

  // Group words by first letter for Accordion View
  const groupedWords = useMemo(() => {
    if(viewType=="firstLetter"){
      return filteredWords.reduce((acc, word) => {
        const letter = word.charAt(0).toUpperCase();
        acc[letter] = acc[letter] ? [...acc[letter], word] : [word];
        return acc;
      }, {});
    }
   return filteredWords.map((word)=>{
    return word.wordName
  }).reduce((acc, word) => {
    const letter = word.charAt(0).toUpperCase();
    acc[letter] = acc[letter] ? [...acc[letter], word] : [word];
    return acc;
  }, {});
  }, [filteredWords]);


  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center justify-center mb-4 border border-red-500 rounded-lg p-2">
      {/* Search Icon */}
      <span className="p-2 text-red-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 1 1-1.42 1.42l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.24 10.24A6 6 0 0 0 10 4z"/>
        </svg>
      </span>

      {/* Search Input */}
      <input
        ref={inputRef}
        type="text"
        placeholder="சொற்களை தேடுக"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 p-2 outline-none text-lg bg-transparent border-b-2 border-red-500"
      />

      {/* Close Button */}
      {searchQuery && (
           <button
           onClick={() => setSearchQuery("")}
           className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center"
         >
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
             <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z"/>
           </svg>
         </button>
      )}
    </div>
      {viewType=="firstLetter" &&<div className="space-y-4">
          {Object.entries(groupedWords).map(([letter, words], index) => (
            <details key={index} className="border rounded-lg p-2 bg-white shadow">
              <summary className="text-lg font-bold cursor-pointer">{letter}</summary>
              <div className="mt-2 flex flex-wrap gap-4">
                {words.sort().map((word, idx) => (
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
        </div>}
    </div>
  );
};

export default WordListFirstLetter;
