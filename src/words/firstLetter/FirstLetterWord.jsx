import React, { useState, useEffect, useContext } from "react";
import Header from "../../HomeComponents/Header";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../DataContext";
import WordList from "../WordList";

const WordsByFirstLetter = () => {
  const [wordsGroupedByFirstLetter, setWordsGroupedByFirstLetter] = useState(
    {}
  );
  const [wordDetails, setWordDetails] = useState({});
  const { letter } = useParams();
  const decodedLetter = decodeURIComponent(letter);
  const { outputJson } = useContext(DataContext);
  useEffect(() => {
    // fetch("./output.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setWordsGroupedByFirstLetter(data["firstLetterWords"] || {});
    //     setWordDetails(data["eachWord"] || {});
    //   })
    //   .catch((error) => console.error("Error fetching JSON:", error));

    setWordsGroupedByFirstLetter(outputJson["firstLetterWords"] || {});
    setWordDetails(outputJson["eachWord"] || {});
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
          <button className="text-red-500 hover:text-orange-700 transition text-lg flex items-center">
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
          </button>
        </div>
        {console.log(wordsGroupedByFirstLetter[decodedLetter])}
        {/* ✅ Show Words Starting with the Selected Letter */}
        {wordsGroupedByFirstLetter[decodedLetter]?.length > 0 ? (
          <div>
            <div className="mb-8 text-center">
              <h1 className="sm:text-sm md:text-xl font-extrabold text-red-500 mb-6">
                <span className="text-2xl">{decodedLetter}</span> வரிசை சொற்கள்
              </h1>

              <WordList
                wordData={wordsGroupedByFirstLetter[decodedLetter]}
                component="firstLetter"
              />
            </div>

            <div>
              {wordsGroupedByFirstLetter[decodedLetter].map((word,index) =>
                wordDetails[word] ? (
                  <div key={index} id={wordDetails[word].wordName}>
                    {/* Word Title */}
                    <div className="mb-8 text-center">
                      <h1 className="text-4xl font-extrabold text-red-500 underline">
                        {wordDetails[word].wordName}
                      </h1>
                      <p className="text-gray-700 mt-4 text-lg">
                        <b className="text-red-600">பொருள்:</b>{" "}
                        {wordDetails[word].wordNameDescription}
                      </p>
                    </div>

                    {/* Books Section */}
                    {wordDetails[word].books.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2 text-center">
                          நூல்கள்
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {wordDetails[word].books.map((book, index) => (
                            <li
                              key={index}
                              className="p-4 bg-white shadow-xl rounded-md text-gray-700 border border-red-200 hover:shadow-lg text-center cursor-pointer"
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
                        <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2 text-center">
                          மறை மொழிகள்
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {wordDetails[word].maraimoozhis.map(
                            (maraiMoozhi, index) => (
                              <li
                                key={index}
                                className="p-4 bg-white shadow-xl rounded-md text-gray-700 border border-red-200 hover:shadow-lg text-center cursor-pointer"
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
                        <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2 text-center">
                          உரைகள்
                        </h2>
                        <ul className="space-y-4 text-center">
                          {wordDetails[word].youtubeNames.map(
                            (video, index) => (
                              <li key={index} className="text-gray-700">
                                <a
                                  href={video.youTubeURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-500 hover:underline hover:text-orange-700"
                                >
                                  {video.youtubeName}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
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
