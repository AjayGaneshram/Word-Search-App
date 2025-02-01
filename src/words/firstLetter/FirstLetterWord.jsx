import React, { useState, useEffect } from "react";
import Header from "../../HomeComponents/Header";
import { useNavigate, useParams } from "react-router-dom";

const WordsByFirstLetter = () => {
  const [wordsGroupedByFirstLetter, setWordsGroupedByFirstLetter] = useState(
    {}
  );
  const [wordDetails, setWordDetails] = useState({});
  const { letter } = useParams();
  const decodedLetter = decodeURIComponent(letter);

  // ✅ Fetch words grouped by first letter from output.json
  useEffect(() => {
    fetch("./output.json")
      .then((response) => response.json())
      .then((data) => {
        setWordsGroupedByFirstLetter(data["firstLetterWords"] || {});
        setWordDetails(data["eachWord"] || {});
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  const navigate = useNavigate();
  const homePageNavigate = () => navigate("/Word-Search-App/home");
  const handleNavigate = (word) => {
    navigate(`/Word-Search-App/book/${word}`);
  };
  const maraimoozhiHandleNavigate = (word) => {
    navigate(`/Word-Search-App/maraiMozhi/${word}`);
  };
  return (
    <div>
      <Header />
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={homePageNavigate}
            className="text-orange-500 hover:text-orange-700 transition text-lg flex items-center"
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
          </button>
        </div>

        {/* ✅ Show Words Starting with the Selected Letter */}
        {wordsGroupedByFirstLetter[decodedLetter]?.length > 0 ? (
          wordsGroupedByFirstLetter[decodedLetter].map((word) =>
            wordDetails[word] ? (
              <div key={word}>
                {/* Word Title */}
                <div className="mb-8 text-center">
                  <h1 className="text-4xl font-extrabold text-orange-500 underline">
                    {wordDetails[word].wordName}
                  </h1>
                  <p className="text-gray-700 mt-4 text-lg">
                    <b className="text-orange-400">பொருள்:</b>{" "}
                    {wordDetails[word].wordNameDescription}
                  </p>
                </div>

                {/* Books Section */}
                {wordDetails[word].books.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2 text-center">
                      நூல்கள்
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wordDetails[word].books.map((book, index) => (
                        <li
                          key={index}
                          className="p-4 bg-white shadow-md rounded-md text-gray-700 border border-gray-200 hover:shadow-lg text-center cursor-pointer"
                          onClick={() => handleNavigate(book.bookName)}
                        >
                          {book.bookName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Marai Moozhis Section */}
                {wordDetails[word].maraimoozhis.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2 text-center">
                      மறை மொழிகள்
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wordDetails[word].maraimoozhis.map(
                        (maraiMoozhi, index) => (
                          <li
                            key={index}
                            className="p-4 bg-white shadow-md rounded-md text-gray-700 border border-gray-200 hover:shadow-lg text-center cursor-pointer"
                            onClick={() =>
                              maraimoozhiHandleNavigate(
                                maraiMoozhi.maraiMoozhiName
                              )
                            }
                          >
                            {maraiMoozhi.maraiMoozhiName}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* YouTube Videos Section */}
                {wordDetails[word].youtubeNames.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2 text-center">
                      உரைகள்
                    </h2>
                    <ul className="space-y-4 text-center">
                      {wordDetails[word].youtubeNames.map((video, index) => (
                        <li key={index} className="text-gray-700">
                          <a
                            href={video.youTubeURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:underline hover:text-orange-700"
                          >
                            {video.youtubeName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null
          )
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">
            இந்த எழுத்திற்கான சொற்கள் இல்லை
          </p>
        )}
      </div>
    </div>
  );
};

export default WordsByFirstLetter;
