import React, { useEffect, useState } from "react";
import Header from "./HomeComponents/Header";

const HomePage = () => {
  const [wordDetails, setwordDetails] = useState([]);
  const [showMoreMarai, setShowMoreMarai] = useState(false);
  const [showMoreBooks, setShowMoreBooks] = useState(false);
  useEffect(() => {
    const fetchWordData = async () => {
      setwordDetails([
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
        {
          wordName: "வேட்டல்",
          wordNameDescription: "விருப்பத்தில் நிலைபெறுதல்",
          bookNames: ["மெய்", "வேட்டல்"],
          maraiMoozhiNames: ["அன்பே சிவம்", "சிவமே கொள்கையாம் சக்தியே செயலாம்"],
          youTubeNames: ["வேட்டல் இணையவழி வகுப்பு"],
        },
      ]);
      // await fetch(`http://localhost:8080/words/unique-details`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setwordDetails(data);
      //   });
    };
    fetchWordData();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const Card = ({ uniqueDetails }) => {
    const [showMoreMarai, setShowMoreMarai] = useState(false);
    const [showMoreBooks, setShowMoreBooks] = useState(false);
   
    return (
      <div className="m-2 p-4 w-full max-w-sm bg-white shadow-lg rounded-lg border border-orange-200 overflow-visible min-h-[400px]">
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
            .slice(0, showMoreMarai ? uniqueDetails.maraiMoozhiNames.length : 3)
            .map((ele, eleIndex) => (
              <li key={eleIndex} className="list-disc ml-4 text-gray-600">
                {ele}
              </li>
            ))}
          {uniqueDetails.maraiMoozhiNames.length > 3 && (
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
      <Header />
      <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 p-4">
        {wordDetails.length > 0 &&
          wordDetails.map((uniqueDetails, index) => (
            <div key={index}>
              <Card uniqueDetails={uniqueDetails} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
{
  /* <div>
      <div className="bg-orange-400 h-16 w-full ">
        <div className="flex gap-x-8 ml-4 p-4">
          <b className="text-white">சொற்கள்</b>
          <b className="text-white">நூல்கள்</b>
          <b className="text-white">மறை மொழிகள்</b>
        </div>
      </div>
      <div className="grid">
        {wordDetails.length > 0 &&
          wordDetails.map((uniqueDetails) => {
            return (
              <div>
                <div className="m-8 p-8 w-64 shadow-2xl border-solid border-2 border-orange-100">
                  <h1 className="text-2xl text-orange-400 underline underline-offset-3">
                    {" "}
                    <b>{uniqueDetails.wordName}</b>
                  </h1>
                  <ul>
                    <b>மறை மொழிகள்</b>
                    {uniqueDetails.maraiMoozhiNames.length > 0 &&
                      uniqueDetails.maraiMoozhiNames.map((ele) => {
                        return <li className="list-disc m-2">{ele}</li>;
                      })}
                  </ul>
                  <ul>
                    <b>நூல்கள்</b>
                    <br></br>
                    {uniqueDetails.bookNames.length > 0 &&
                      uniqueDetails.bookNames.map((ele, index) => {
                        return (
                          <span key={index}>
                            {ele}
                            {index < uniqueDetails.bookNames.length - 1 && ", "}
                          </span>
                        );
                      })}
                  </ul>
                </div>
              </div>
            );
          })}
      </div>
    </div>  */
}
