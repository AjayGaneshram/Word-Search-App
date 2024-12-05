import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../HomeComponents/Header";

const WordSummary = () => {
  const [wordDetails, setWordDetails] = useState([]);
  const { wordName } = useParams();
  const decodedWord = decodeURIComponent(wordName);
  console.log(decodedWord);

  const jsonData={
    "இயல்பு": {
      "id": 1,
      "wordName": "இயல்பு",
      "wordNameDescription": "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
      "wordName_FirstLetter": "இ",
      "books": [
        {
          "id": 2,
          "bookName": "எண் நூல்",
          "bookName_firstLetter": null,
          "bookNameDescription": null
        },
        {
          "id": 1,
          "bookName": "மூல நூல்",
          "bookName_firstLetter": null,
          "bookNameDescription": null
        }
      ],
      "maraimoozhis": [
        {
          "id": 1,
          "maraiMoozhiName": "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
          "maraiMoozhiDescription": null
        }
      ],
      "youTubeVideos": []
    },
    "வேட்டல்": {
      "id": 2,
      "wordName": "வேட்டல்",
      "wordNameDescription": "விருப்பத்தில் நிலைபெறுதல்",
      "wordName_FirstLetter": "வே",
      "books": [
        {
          "id": 3,
          "bookName": "மெய்",
          "bookName_firstLetter": null,
          "bookNameDescription": null
        },
        {
          "id": 4,
          "bookName": "வேட்டல்",
          "bookName_firstLetter": null,
          "bookNameDescription": null
        }
      ],
      "maraimoozhis": [
        {
          "id": 2,
          "maraiMoozhiName": "அன்பே சிவம்",
          "maraiMoozhiDescription": null
        },
        {
          "id": 3,
          "maraiMoozhiName": "சிவமே கொள்கையாம் சக்தியே செயலாம்",
          "maraiMoozhiDescription": null
        }
      ],
      "youTubeVideos": [
        {
          "id": 1,
          "youTubetitle": "வேட்டல் இணையவழி வகுப்பு",
          "youTubeURL": "https://youtu.be/zifcxn9SSIs?si=3K8LOnLp1ZCP9QZI"
        }
      ]
    },
    "சிவம்": {
      "id": 3,
      "wordName": "சிவம்",
      "wordNameDescription": "யாவும் யாமே",
      "wordName_FirstLetter": "சி",
      "books": [
        {
          "id": 5,
          "bookName": "ஊழி நூல்",
          "bookName_firstLetter": null,
          "bookNameDescription": null
        },
        2,
        {
          "id": 6,
          "bookName": "வடிவு நூல்",
          "bookName_firstLetter": null,
          "bookNameDescription": null
        },
        1
      ],
      "maraimoozhis": [
        {
          "id": 2,
          "maraiMoozhiName": "அன்பே சிவம்",
          "maraiMoozhiDescription": null
        },
        {
          "id": 3,
          "maraiMoozhiName": "சிவமே கொள்கையாம் சக்தியே செயலாம்",
          "maraiMoozhiDescription": null
        }
      ],
      "youTubeVideos": [
        {
          "id": 2,
          "youTubetitle": "அன்பு நலம்",
          "youTubeURL": "https://youtu.be/KWl2xH_YgS0?si=D_U6Mgo04cbAd79u"
        }
      ]
    },
    "சக்தி": {
      "id": 4,
      "wordName": "சக்தி",
      "wordNameDescription": "தன்னிலை தனிநிலையகுக",
      "wordName_FirstLetter": "ச",
      "books": [
        5,
        2,
        1
      ],
      "maraimoozhis": [
        {
          "id": 3,
          "maraiMoozhiName": "சிவமே கொள்கையாம் சக்தியே செயலாம்",
          "maraiMoozhiDescription": null
        },
        {
          "id": 1,
          "maraiMoozhiName": "இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்",
          "maraiMoozhiDescription": null
        }
      ],
      "youTubeVideos": []
    }
  }
  useEffect(() => {
    const fetchWordData = async () => {
      setWordDetails(jsonData[decodedWord]);
      // await fetch(`http://localhost:8080/words/${decodedWord}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //     setWordDetails(data);
      //   });
    };
    fetchWordData();
    console.log(wordDetails);
  }, []);

  return (
    <div>
      <Header />
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        {wordDetails.length != 0 && (
          <div>
            {/* Word Title */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-orange-500 underline">
                {wordDetails.wordName}
              </h1>
              <p className="text-gray-700 mt-4 text-lg">
                <b className="text-orange-400">பொருள்:</b>{" "}
                {wordDetails.wordNameDescription}
              </p>
            </div>

            {/* Books Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2">
                நூல்கள்
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wordDetails.books.map((book, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white shadow-md rounded-md text-gray-700 border border-gray-200 hover:shadow-lg"
                  >
                    {book.bookName}
                  </li>
                ))}
              </ul>
            </div>

            {/* Marai Moozhis Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2">
                மறை மொழிகள்
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wordDetails.maraimoozhis.map((maraiMoozhi, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white shadow-md rounded-md text-gray-700 border border-gray-200 hover:shadow-lg"
                  >
                    {maraiMoozhi.maraiMoozhiName}
                  </li>
                ))}
              </ul>
            </div>

            {/* YouTube Videos Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b-2 border-orange-200 pb-2">
                YouTube Videos
              </h2>
              <ul className="space-y-4">
                {wordDetails.youTubeVideos.map((video, index) => (
                  <li key={index} className="text-gray-700">
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

            {/* Back to Home Button */}
            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-orange-400 text-white rounded-md shadow-md hover:bg-orange-500"
              >
                முகப்புப்பக்கம்
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordSummary;
