import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../HomeComponents/Header";

const WordsinMaraiMoozhi = () => {
  const { maraiMoozhi } = useParams();
  const decodedmaraiMoozhi = decodeURIComponent(maraiMoozhi);
  const [wordData, setWordData] = useState([]);
  const jsondata = {
    "அன்பே சிவம்": [
      {
        wordName: "சிவம்",
        wordNameDescription: "யாவும் யாமே",
        bookNames: ["ஊழி நூல்", "எண் நூல்", "வடிவு நூல்", "மூல நூல்"],
        maraiMoozhiNames: ["அன்பே சிவம்"],
        youTubeNames: ["அன்பு நலம்"],
      },
      {
        wordName: "வேட்டல்",
        wordNameDescription: "விருப்பத்தில் நிலைபெறுதல்",
        bookNames: ["மெய்", "வேட்டல்"],
        maraiMoozhiNames: ["அன்பே சிவம்"],
        youTubeNames: ["வேட்டல் இணையவழி வகுப்பு"],
      },
    ],
    "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்": [
      {
        wordName: "சக்தி",
        wordNameDescription: "தன்னிலை தனிநிலையகுக",
        bookNames: ["ஊழி நூல்", "மூல நூல்", "எண் நூல்"],
        maraiMoozhiNames: [
          "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
        ],
        youTubeNames: [],
      },
      {
        wordName: "இயல்பு",
        wordNameDescription:
          "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
        bookNames: ["மூல நூல்", "எண் நூல்"],
        maraiMoozhiNames: [
          "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
        ],
        youTubeNames: [],
      },
    ],
    "சிவமே கொள்கையாம் சக்தியே செயலாம்": [
      {
        wordName: "சக்தி",
        wordNameDescription: "தன்னிலை தனிநிலையகுக",
        bookNames: ["எண் நூல்", "ஊழி நூல்", "மூல நூல்"],
        maraiMoozhiNames: ["சிவமே கொள்கையாம் சக்தியே செயலாம்"],
        youTubeNames: [],
      },
      {
        wordName: "சிவம்",
        wordNameDescription: "யாவும் யாமே",
        bookNames: ["எண் நூல்", "ஊழி நூல்", "மூல நூல்", "வடிவு நூல்"],
        maraiMoozhiNames: ["சிவமே கொள்கையாம் சக்தியே செயலாம்"],
        youTubeNames: ["அன்பு நலம்"],
      },
      {
        wordName: "வேட்டல்",
        wordNameDescription: "விருப்பத்தில் நிலைபெறுதல்",
        bookNames: ["மெய்", "வேட்டல்"],
        maraiMoozhiNames: ["சிவமே கொள்கையாம் சக்தியே செயலாம்"],
        youTubeNames: ["வேட்டல் இணையவழி வகுப்பு"],
      },
    ],
  };
  useEffect(() => {
    const fetchWordData = async () => {
      setWordData(jsondata[decodedmaraiMoozhi]);
      //   fetch(
      //     `http://localhost:8080//words/marai-moozhi-summary/${decodedmaraiMoozhi}`,
      //     {
      //       method: "GET", // Adjust to POST if necessary
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //     .then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       setWordData(data);
      //     });
    };
    fetchWordData();
  }, []);
  useEffect(() => {
    // ScrollSpy effect to highlight active section link on scroll
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      links.forEach((link) => {
        link.classList.remove("text-orange-500", "font-bold");
        if (link.classList.contains(current)) {
          link.classList.add("text-orange-500", "font-bold");
        }
      });
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Header />

      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen relative">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all"
          title="Scroll to Top"
        >
          ↑
        </button>
        <div className="mb-4">
          <a
            href="/"
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
          </a>
        </div>
        {/* Word List at the Top */}
        <div className="mb-8 text-center">
          <h1 className="sm:text-sm md:text-xl font-extrabold text-orange-500 mb-6">
            {decodedmaraiMoozhi}
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
            {wordData.map((word, index) => (
              <a
			  key={index}
			  href={`#${word.wordName}`}
			  className={`p-2 text-lg rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none ${
				index === 0
				  ? "bg-orange-500 text-white font-semibold"
				  : "hover:bg-orange-500 hover:text-white"
			  }`}
			>
                {word.wordName}
              </a>
            ))}
          </div>
        </div>

        {/* Word Details with Scrollspy Section */}
        {wordData.map((word, index) => (
          <section key={index} id={word.wordName} className="mb-8 pt-12 pb-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-orange-500 underline mb-4">
                {word.wordName}
              </h2>
              <p className="text-gray-700 mt-4 text-lg">
                <b className="text-orange-400">பொருள்:</b>{" "}
                {word.wordNameDescription}
              </p>

              {/* Books Section */}
              {word.bookNames.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2">
                    நூல்கள்
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {word.bookNames.map((book, bookIndex) => (
                      <li
                        key={bookIndex}
                        className="p-4 bg-white shadow-md rounded-md text-gray-700 border border-gray-200"
                      >
                        {book}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Marai Moozhis Section */}
              {word.maraiMoozhiNames.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2">
                    மறை மொழிகள்
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {word.maraiMoozhiNames.map(
                      (maraiMoozhi, maraiMoozhiIndex) => (
                        <li
                          key={maraiMoozhiIndex}
                          className="p-4 bg-white shadow-md rounded-md text-gray-700 border border-gray-200"
                        >
                          {maraiMoozhi}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* YouTube Videos Section */}
              {word.youTubeNames.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2">
                    YouTube Videos
                  </h3>
                  <ul className="space-y-4">
                    {word.youTubeNames.map((video, videoIndex) => (
                      <li key={videoIndex} className="text-gray-700">
                        <a
                          href={video.youTubeURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:underline hover:text-orange-700"
                        >
                          {video.youTubetitle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
export default WordsinMaraiMoozhi;
