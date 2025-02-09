import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../HomeComponents/Header";
import { DataContext } from "../DataContext";
import WordDetailsSections from "../words/WordDetailsSection";
import WordDetailsSectionsForMaraimoozhi from "../words/WordDetailsForMaraimoozhi";
import WordList from "../words/WordList";
import WordAccordion from "../words/WordAccordion";

const WordsinMaraiMoozhi = () => {
  const { maraiMoozhi } = useParams();
  const decodedmaraiMoozhi = decodeURIComponent(maraiMoozhi);
  const [wordData, setWordData] = useState([]);
  const { outputJson } = useContext(DataContext);
  // const jsondata = {
  //   "அன்பே சிவம்": [
  //     {
  //       wordName: "சிவம்",
  //       wordNameDescription: "யாவும் யாமே",
  //       bookNames: ["ஊழி நூல்", "எண் நூல்", "வடிவு நூல்", "மூல நூல்"],
  //       maraiMoozhiNames: ["அன்பே சிவம்"],
  //       youTubeNames: ["அன்பு நலம்"],
  //     },
  //     {
  //       wordName: "வேட்டல்",
  //       wordNameDescription: "விருப்பத்தில் நிலைபெறுதல்",
  //       bookNames: ["மெய்", "வேட்டல்"],
  //       maraiMoozhiNames: ["அன்பே சிவம்"],
  //       youTubeNames: ["வேட்டல் இணையவழி வகுப்பு"],
  //     },
  //   ],
  //   "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்": [
  //     {
  //       wordName: "சக்தி",
  //       wordNameDescription: "தன்னிலை தனிநிலையகுக",
  //       bookNames: ["ஊழி நூல்", "மூல நூல்", "எண் நூல்"],
  //       maraiMoozhiNames: [
  //         "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
  //       ],
  //       youTubeNames: [],
  //     },
  //     {
  //       wordName: "இயல்பு",
  //       wordNameDescription:
  //         "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
  //       bookNames: ["மூல நூல்", "எண் நூல்"],
  //       maraiMoozhiNames: [
  //         "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
  //       ],
  //       youTubeNames: [],
  //     },
  //   ],
  //   "சிவமே கொள்கையாம் சக்தியே செயலாம்": [
  //     {
  //       wordName: "சக்தி",
  //       wordNameDescription: "தன்னிலை தனிநிலையகுக",
  //       bookNames: ["எண் நூல்", "ஊழி நூல்", "மூல நூல்"],
  //       maraiMoozhiNames: ["சிவமே கொள்கையாம் சக்தியே செயலாம்"],
  //       youTubeNames: [],
  //     },
  //     {
  //       wordName: "சிவம்",
  //       wordNameDescription: "யாவும் யாமே",
  //       bookNames: ["எண் நூல்", "ஊழி நூல்", "மூல நூல்", "வடிவு நூல்"],
  //       maraiMoozhiNames: ["சிவமே கொள்கையாம் சக்தியே செயலாம்"],
  //       youTubeNames: ["அன்பு நலம்"],
  //     },
  //     {
  //       wordName: "வேட்டல்",
  //       wordNameDescription: "விருப்பத்தில் நிலைபெறுதல்",
  //       bookNames: ["மெய்", "வேட்டல்"],
  //       maraiMoozhiNames: ["சிவமே கொள்கையாம் சக்தியே செயலாம்"],
  //       youTubeNames: ["வேட்டல் இணையவழி வகுப்பு"],
  //     },
  //   ],
  // };
  useEffect(() => {
    const fetchWordData = async () => {
      // setWordData(jsondata[decodedmaraiMoozhi]);
      // fetch("./output.json") // Fetch from public folder
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setWordData(data["eachMaraimoozhi"][decodedmaraiMoozhi]);
      //   })
      //   .catch((error) => console.error("Error fetching JSON:", error));

      setWordData(outputJson["eachMaraimoozhi"][decodedmaraiMoozhi]);
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
        link.classList.remove("text-red-500", "font-bold");
        if (link.classList.contains(current)) {
          link.classList.add("text-red-500", "font-bold");
        }
      });
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();
  const homePageNavigate = (word) => {
    navigate(`/Word-Search-App/home`);
  };
  const handleNavigate = (word) => {
    navigate(`/Word-Search-App/book/${word}`);
  };
  const maraimoozhiHandleNavigate = (word) => {
    navigate(`/Word-Search-App/maraiMozhi/${word}`);
  };
  return (
    <div className="bg-red-50">
       {/* <Header /> */}

      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen relative">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-8 h-8 bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-900 transition-all"
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
        {/* Word List at the Top */}
        <div className="mb-8 text-center">
          <h1 className="sm:text-sm md:text-xl font-extrabold text-red-500 mb-6">
            {decodedmaraiMoozhi}
          </h1>

          {/* <WordList wordData={wordData}/> */}
          <WordAccordion wordData={wordData}/>
        </div>

        {/* Word Details with Scrollspy Section */}
        {wordData.sort().map((word, index) => (
          <section key={index} id={word.wordName} className="mb-8 pt-12 pb-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-red-500 underline mb-4">
                {word.wordName}
              </h2>
              <p className="text-gray-700 mt-4 text-lg mb-4">
                <b className="text-red-600">பொருள்:</b>{" "}
                {word.wordNameDescription}
              </p>

              <WordDetailsSectionsForMaraimoozhi
                wordDetails={word}
                handleNavigate={handleNavigate}
                maraimoozhiHandleNavigate={maraimoozhiHandleNavigate}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
export default WordsinMaraiMoozhi;
