import React, { useState, useEffect, useContext } from "react";
import Header from "../../HomeComponents/Header";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../DataContext";
import WordDetailsSections from "../WordDetailsSection";
import WordListFirstLetter from "../WordListFirstLetter";
import { FaLink } from "react-icons/fa6";
const WordsByFirstLetter = () => {
  const [wordsGroupedByFirstLetter, setWordsGroupedByFirstLetter] = useState(
    {}
  );
  const [wordDetails, setWordDetails] = useState({});
  const { letter } = useParams();
  const decodedLetter = decodeURIComponent(letter);
  const { outputJson } = useContext(DataContext);

  const uriLetterMeaning = {
    அ: "ஆற்றலின் ஈற்றில் 'அ' அமைகிறது",
    இ: "ஆற்றலின் இடை நிலையில் 'இ' இருக்கிறது",
    உ: "ஆற்றலின் முதல் நிலையில் 'உ' உள்ளது",
    எ: "இ அ ஆகிய எழுத்துகள் 'எ' என்றாகின்றன.இவ்வாறு இவை ஆவது அகரத்துடன் உ மற்றும் இ கலவி ஆதலின் விளைவுகளாகும்",
    ஒ: "உ முதலாக அ ஈறாக உள்ள நிலை 'ஒ' என்றாகிறது.உ முதல் அ வரையிலானவற்றை உள் அடக்கி இருத்தல் ஒகரத்தின் இயல்பு",
    ஐ: "அ இ இயைதல் 'ஐ' ஆகிறது.இஃது ஆற்றல் மையம் என்றுள்ளது.ஐ எனும் எழுத்து தலைமை, மையம் என்று பொருளாகும்.",
    ஔ: "அ உ இயைதல் 'ஔ' ஆகிறது",
  };
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="bg-red-50">
      {/* <Header /> */}

      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        {/* Back Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
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
        {/* ✅ Show Words Starting with the Selected Letter */}
        {wordsGroupedByFirstLetter[decodedLetter]?.length > 0 && (
          <div>
            <div className="mb-8 text-center">
              <h1 className="sm:text-sm md:text-xl font-extrabold text-red-500 mb-6">
                <span className="text-2xl">{decodedLetter}</span> வரிசை சொற்கள்
              </h1>
              <h3 className="sm:text-xs md:text-base font-bold text-red-600 mb-6">
                {" "}
                {uriLetterMeaning[decodedLetter]}
              </h3>
              
               <WordListFirstLetter wordData={wordsGroupedByFirstLetter[decodedLetter].sort()} viewType="firstLetter" />  

            </div>
            {/* <div>
              {wordsGroupedByFirstLetter[decodedLetter].sort().map((word, index) =>
                wordDetails[word] ? (
                  <div key={index} id={wordDetails[word].wordName}>
                    <div className="mb-8 text-center">
                      <h1 className="text-4xl font-extrabold text-red-500 underline">
                        {wordDetails[word].wordName}
                      </h1>
                      <p className="text-gray-700 mt-4 text-lg">
                        <b className="text-red-600">பொருள்:</b>{" "}
                        {wordDetails[word].wordNameDescription}
                      </p>
                    </div>
                    <WordDetailsSections
                      wordDetails={wordDetails[word]}
                      handleNavigate={handleNavigate}
                      maraimoozhiHandleNavigate={maraimoozhiHandleNavigate}
                    />
                   
                  </div>
                ) : null
              )}
            </div> */}
          </div>
        )}
        {wordsGroupedByFirstLetter[decodedLetter]?.length == 0 && (
          <p className="text-center text-gray-500 text-lg mt-6">
            இந்த எழுத்திற்கான சொற்கள் இல்லை
          </p>
        )}
      </div>
    </div>
  );
};

export default WordsByFirstLetter;
