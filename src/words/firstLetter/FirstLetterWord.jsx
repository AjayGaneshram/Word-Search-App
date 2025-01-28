import React, { useState, useEffect } from "react";

const WordsByFirstLetter = () => {
  const [wordsGroupedByFirstLetter, setWordsGroupedByFirstLetter] = useState(
    {}
  );

  // Fetch words grouped by first letter from API
  useEffect(() => {
    setWordsGroupedByFirstLetter({
      இ: ["இயல்பு"],
      ச: ["சக்தி"],
      சி: ["சிவம்"],
      வே: ["வேட்டல்"],
    });
    // axios
    //   .get("/api/words/grouped-by-first-letter") // Update the endpoint as needed
    //   .then((response) => setWordsGroupedByFirstLetter(response.data))
    //   .catch((error) => console.error("Error fetching words:", error));
  }, []);

  return (
    <div>
      {/* Iterate over each group of words */}
      {Object.keys(wordsGroupedByFirstLetter).map((firstLetter) => (
        <div key={firstLetter}>
          {/* First Letter Header */}
          <div className="bg-orange-400 h-16 w-full">
            <h1 className="pt-4 pl-4 text-2xl font-bold text-white">
              {firstLetter}
            </h1>
          </div>

          {/* Word List */}
          <div className="m-8">
            <b className="text-2xl text-orange-400">Words</b>
            <ul>
              {wordsGroupedByFirstLetter[firstLetter].map((word, index) => (
                <li key={index} className="list-decimal">
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordsByFirstLetter;
