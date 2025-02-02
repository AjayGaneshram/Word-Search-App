import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../HomeComponents/Header";
import { DataContext } from "../DataContext";
import WordDetailsSections from "./WordDetailsSection";

const WordSummary = () => {
  const [wordDetails, setWordDetails] = useState([]);
  const { wordName } = useParams();
  const decodedWord = decodeURIComponent(wordName);
  console.log(decodedWord);
  const navigate = useNavigate();
  const homePageNavigate = () => {
    navigate(`/Word-Search-App/home`);
  };

  const { outputJson } = useContext(DataContext);

  // const jsonData = {
  //   சக்தி: {
  //     id: 4,
  //     wordName: "சக்தி",
  //     wordNameDescription: "தன்னிலை தனிநிலையகுக",
  //     wordName_FirstLetter: "ச",
  //     books: [
  //       {
  //         id: 2,
  //         bookName: "எண் நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 1,
  //         bookName: "மூல நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 5,
  //         bookName: "ஊழி நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //     ],
  //     maraimoozhis: [
  //       {
  //         id: 3,
  //         maraiMoozhiName: "சிவமே கொள்கையாம் சக்தியே செயலாம்",
  //         maraiMoozhiDescription: null,
  //       },
  //       {
  //         id: 1,
  //         maraiMoozhiName:
  //           "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
  //         maraiMoozhiDescription: null,
  //       },
  //     ],
  //     youTubeVideos: [],
  //   },
  //   வேட்டல்: {
  //     id: 2,
  //     wordName: "வேட்டல்",
  //     wordNameDescription: "விருப்பத்தில் நிலைபெறுதல்",
  //     wordName_FirstLetter: "வே",
  //     books: [
  //       {
  //         id: 4,
  //         bookName: "வேட்டல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 3,
  //         bookName: "மெய்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //     ],
  //     maraimoozhis: [
  //       {
  //         id: 3,
  //         maraiMoozhiName: "சிவமே கொள்கையாம் சக்தியே செயலாம்",
  //         maraiMoozhiDescription: null,
  //       },
  //       {
  //         id: 2,
  //         maraiMoozhiName: "அன்பே சிவம்",
  //         maraiMoozhiDescription: null,
  //       },
  //     ],
  //     youTubeVideos: [
  //       {
  //         id: 1,
  //         youTubetitle: "வேட்டல் இணையவழி வகுப்பு",
  //         youTubeURL: "https://youtu.be/zifcxn9SSIs?si=3K8LOnLp1ZCP9QZI",
  //       },
  //     ],
  //   },
  //   சிவம்: {
  //     id: 3,
  //     wordName: "சிவம்",
  //     wordNameDescription: "யாவும் யாமே",
  //     wordName_FirstLetter: "சி",
  //     books: [
  //       {
  //         id: 1,
  //         bookName: "மூல நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 6,
  //         bookName: "வடிவு நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 5,
  //         bookName: "ஊழி நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 2,
  //         bookName: "எண் நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //     ],
  //     maraimoozhis: [
  //       {
  //         id: 2,
  //         maraiMoozhiName: "அன்பே சிவம்",
  //         maraiMoozhiDescription: null,
  //       },
  //       {
  //         id: 3,
  //         maraiMoozhiName: "சிவமே கொள்கையாம் சக்தியே செயலாம்",
  //         maraiMoozhiDescription: null,
  //       },
  //     ],
  //     youTubeVideos: [
  //       {
  //         id: 2,
  //         youTubetitle: "அன்பு நலம்",
  //         youTubeURL: "https://youtu.be/KWl2xH_YgS0?si=D_U6Mgo04cbAd79u",
  //       },
  //     ],
  //   },
  //   இயல்பு: {
  //     id: 1,
  //     wordName: "இயல்பு",
  //     wordNameDescription:
  //       "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
  //     wordName_FirstLetter: "இ",
  //     books: [
  //       {
  //         id: 1,
  //         bookName: "மூல நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //       {
  //         id: 2,
  //         bookName: "எண் நூல்",
  //         bookName_firstLetter: null,
  //         bookNameDescription: null,
  //       },
  //     ],
  //     maraimoozhis: [
  //       {
  //         id: 1,
  //         maraiMoozhiName:
  //           "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
  //         maraiMoozhiDescription: null,
  //       },
  //     ],
  //     youTubeVideos: [],
  //   },
  // };
  useEffect(() => {
    const fetchWordData = async () => {
      // fetch("../public/output.json") // Fetch from public folder
      //   .then((response) => {
      //     console.log(response);
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     // console.log(data["eachWord"][decodedWord])
      //     setWordDetails(data["eachWord"][decodedWord]);
      //   })
      //   .catch((error) => console.error("Error fetching JSON:", error));
      setWordDetails(outputJson["eachWord"][decodedWord]);
      // setWordDetails(jsonData[decodedWord]);
    };
    fetchWordData();
    console.log(wordDetails);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
        <div className="mb-4">
          <a
          
            className="text-red-500 hover:text-orange-700 transition text-lg flex items-center"
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
            <span  className="cursor-pointer" onClick={homePageNavigate}>முகப்புப்பக்கம்</span>
          </a>
        </div>
        {wordDetails.length != 0 && (
          <div>
            {/* Word Title */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-red-500 underline">
                {wordDetails.wordName}
              </h1>
              <p className="text-gray-700 mt-4 text-lg">
                <b className="text-red-600">பொருள்:</b>{" "}
                {wordDetails.wordNameDescription}
              </p>
            </div>
            <WordDetailsSections
              wordDetails={wordDetails}
              handleNavigate={handleNavigate}
              maraimoozhiHandleNavigate={maraimoozhiHandleNavigate}
            />

            {/* <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2 text-center">
                நூல்கள்
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wordDetails.books.map((book, index) => (
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2 text-center">
                மறை மொழிகள்
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wordDetails.maraimoozhis.map((maraiMoozhi, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white shadow-xl rounded-md text-gray-700 border border-red-200 hover:shadow-lg text-center cursor-pointer"
                    onClick={() =>
                      maraimoozhiHandleNavigate(maraiMoozhi.maraiMoozhiName)
                    }
                  >
                    {maraiMoozhi.maraiMoozhiName}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2 text-center">
                உரைகள்
              </h2>
              <ul className="space-y-4 text-center">
                {wordDetails.youtubeNames.map((video, index) => (
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
                ))}
              </ul>
            </div> */}

            {/* Back to Home Button */}
            {/* <div className="text-center">
              <button
                onClick={() => homePageNavigate()}
                className="px-6 py-2 bg-red-700 text-white rounded-md shadow-xl hover:bg-red-800"
              >
                முகப்புப்பக்கம்
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordSummary;
