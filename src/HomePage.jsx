import React, { useEffect, useState } from "react";
import Header from "./HomeComponents/Header";
import SearchComponent from "./search/SearchBar";
// import TamilAlphabetTable from "./search/TamilLetter";
import LetterHomePage from "./search/TamilLetter";

const HomePage = () => {
  const [wordDetails, setWordDetails] = useState([]);
  useEffect(() => {
    const fetchWordData = async () => {
      // Hardcoded data
      setWordDetails([
        {
          wordName: "இயல்பு",
          wordNameDescription:
            "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
          bookNames: ["எண் நூல்", "மூல நூல்"],
          maraiMoozhiNames: [
            "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
          ],
          youTubeNames: [],
        },
        {
          wordName: "சக்தி",
          wordNameDescription: "தன்னிலை தனிநிலையகுக",
          bookNames: ["ஊழி நூல்", "எண் நூல்", "மூல நூல்"],
          maraiMoozhiNames: [
            "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
            "சிவமே கொள்கையாம் சக்தியே செயலாம்",
            "சிவமே கொள்கையாம் சக்தியே செயலாம்",
          ],
          youTubeNames: [],
        },
        {
          wordName: "சிவம்",
          wordNameDescription: "யாவும் யாமே",
          bookNames: ["ஊழி நூல்", "எண் நூல்", "மூல நூல்", "வடிவு நூல்"],
          maraiMoozhiNames: ["அன்பே சிவம்", "சிவமே கொள்கையாம் சக்தியே செயலாம்"],
          youTubeNames: ["அன்பு நலம்"],
        },
      ]);
    };
    fetchWordData();
  }, []);

  // Individual Card Component
  const Card = ({ uniqueDetails }) => {
    const [showMoreMarai, setShowMoreMarai] = useState(false);
    const [showMoreBooks, setShowMoreBooks] = useState(false);

    return (
      <div className="m-4 p-6 w-full max-w-sm bg-white shadow-lg rounded-lg border border-orange-200">
        {/* Word Name */}
        <h1 className="text-xl md:text-2xl text-orange-400 font-bold underline underline-offset-4">
          {uniqueDetails.wordName}
        </h1>
        <div className="mt-4">
          <b className="text-gray-800">பொருள் </b>
          <h1>{uniqueDetails.wordNameDescription}</h1>
        </div>

        {/* Marai Moozhigal */}
        <ul className="mt-4">
          <b className="text-gray-800">மறை மொழிகள்</b>
          {uniqueDetails.maraiMoozhiNames
            .slice(0, showMoreMarai ? uniqueDetails.maraiMoozhiNames.length : 2)
            .map((ele, eleIndex) => (
              <li key={eleIndex} className="list-disc ml-4 text-gray-600">
                {ele}
              </li>
            ))}
          {uniqueDetails.maraiMoozhiNames.length > 2 && (
            <button
              onClick={() => setShowMoreMarai((prev) => !prev)}
              className="text-blue-500 mt-2"
            >
              {showMoreMarai ? "சுருக்குக" : "மேலும் காண்க"}
            </button>
          )}
        </ul>

        {/* Book Names */}
        <ul className="mt-4">
          <b className="text-gray-800">நூல்கள்</b>
          <br />
          {uniqueDetails.bookNames
            .slice(0, showMoreBooks ? uniqueDetails.bookNames.length : 3)
            .map((ele, bookIndex) => (
              <span key={bookIndex} className="text-gray-600">
                {ele}
                {bookIndex < uniqueDetails.bookNames.length - 1 && ", "}
              </span>
            ))}
          {uniqueDetails.bookNames.length > 3 && (
            <button
              onClick={() => setShowMoreBooks((prev) => !prev)}
              className="text-blue-500 mt-2"
            >
              &nbsp;
              {showMoreBooks ? "சுருக்குக" : "மேலும் காண்க"}
            </button>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <Header />
      <h2 className="text-sm font-bold text-center m-6 text-orange-400">
        சிவமே கொள்கையாம் சக்தியே செயலாம்
      </h2>
      {/* Search Component */}
      <SearchComponent />

      {/* Tamil Alphabet Table */}
      <LetterHomePage />

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-8 h-8 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all"
        title="Scroll to Top"
      >
        ↑
      </button>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 justify-items-center ">
        {wordDetails.map((uniqueDetails, index) => (
          <Card key={index} uniqueDetails={uniqueDetails} className="h-full" />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

// "predeploy": "npm run build",
    // "deploy": "gh-pages -d dist",