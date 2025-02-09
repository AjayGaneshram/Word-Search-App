import React, { useState } from "react";

const WordList = ({ wordData, component }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const isExpanded = visibleCount >= wordData.length;
  return (
    <div className="text-center">
      {component === "firstLetter" ? (
        <div>
          <div className="flex flex-wrap justify-center gap-6">
            {wordData.slice(0, visibleCount).sort().map((word, index) => (
              <a
                key={index}
                href={`#${encodeURIComponent(word)}`}
                className={`p-2 text-lg rounded-lg shadow-xl transition-all transform hover:scale-105 focus:outline-none ${
                  index === 0
                    ? "bg-red-800 text-white font-semibold"
                    : "hover:bg-red-800 hover:text-white"
                }`}
              >
                {word}
              </a>
            ))}
            {wordData.length > 8 && (
              <div className="mt-4">
                <button
                  onClick={() =>
                    setVisibleCount(isExpanded ? 8 : wordData.length)
                  }
                  className="text-red-500 hover:text-orange-700 font-bold"
                >
                  {isExpanded ? "குறைக்க" : "அனைத்தையும் காண்க"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Word List */}
          <div className="flex flex-wrap justify-center gap-6">
            {wordData.slice(0, visibleCount).sort().map((word, index) => (
              <a
                key={index}
                href={`#${encodeURIComponent(word.wordName)}`}
                className={`p-2 text-lg rounded-lg shadow-xl transition-all transform hover:scale-105 focus:outline-none ${
                  index === 0
                    ? "bg-red-800 text-white font-semibold"
                    : "hover:bg-red-800 hover:text-white"
                }`}
              >
                {word.wordName}
              </a>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {wordData.length > 8 && (
            <div className="mt-4">
              <button
                onClick={() =>
                  setVisibleCount(isExpanded ? 8 : wordData.length)
                }
                className="text-red-500 hover:text-orange-700 font-bold"
              >
                {isExpanded ? "குறைக்க" : "அனைத்தையும் காண்க"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordList;