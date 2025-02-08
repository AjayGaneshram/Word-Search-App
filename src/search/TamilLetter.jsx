import React, { useState, useEffect, useContext } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
// JSON structure for Uyir-Mei combinations
const uyirmeiData = [
  {
    mei: "க்",
    uyirmei: [
      "க",
      "கா",
      "கி",
      "கீ",
      "கு",
      "கூ",
      "கெ",
      "கே",
      "கை",
      "கொ",
      "கோ",
      "கௌ",
    ],
  },
  {
    mei: "ங்",
    uyirmei: [
      "ங",
      "ஙா",
      "ஙி",
      "ஙீ",
      "ஙு",
      "ஙூ",
      "ஙெ",
      "ஙே",
      "ஙை",
      "ஙொ",
      "ஙோ",
      "ஙௌ",
    ],
  },
  {
    mei: "ச்",
    uyirmei: [
      "ச",
      "சா",
      "சி",
      "சீ",
      "சு",
      "சூ",
      "செ",
      "சே",
      "சை",
      "சொ",
      "சோ",
      "சௌ",
    ],
  },
  {
    mei: "ஞ்",
    uyirmei: [
      "ஞ",
      "ஞா",
      "ஞி",
      "ஞீ",
      "ஞு",
      "ஞூ",
      "ஞெ",
      "ஞே",
      "ஞை",
      "ஞொ",
      "ஞோ",
      "ஞௌ",
    ],
  },
  {
    mei: "ட்",
    uyirmei: [
      "ட",
      "டா",
      "டி",
      "டீ",
      "டு",
      "டூ",
      "டெ",
      "டே",
      "டை",
      "டொ",
      "டோ",
      "டௌ",
    ],
  },
  {
    mei: "த்",
    uyirmei: [
      "த",
      "தா",
      "தி",
      "தீ",
      "து",
      "தூ",
      "தெ",
      "தே",
      "தை",
      "தொ",
      "தோ",
      "தௌ",
    ],
  },
  {
    mei: "ந்",
    uyirmei: [
      "ந",
      "நா",
      "நி",
      "நீ",
      "நு",
      "நூ",
      "நெ",
      "நே",
      "நை",
      "நொ",
      "நோ",
      "நௌ",
    ],
  },
  {
    mei: "ப்",
    uyirmei: [
      "ப",
      "பா",
      "பி",
      "பீ",
      "பு",
      "பூ",
      "பெ",
      "பே",
      "பை",
      "பொ",
      "போ",
      "பௌ",
    ],
  },
  {
    mei: "ம்",
    uyirmei: [
      "ம",
      "மா",
      "மி",
      "மீ",
      "மு",
      "மூ",
      "மெ",
      "மே",
      "மை",
      "மொ",
      "மோ",
      "மௌ",
    ],
  },
  {
    mei: "ய்",
    uyirmei: [
      "ய",
      "யா",
      "யி",
      "யீ",
      "யு",
      "யூ",
      "யெ",
      "யே",
      "யை",
      "யொ",
      "யோ",
      "யௌ",
    ],
  },
  {
    mei: "ர்",
    uyirmei: [
      "ர",
      "ரா",
      "ரி",
      "ரீ",
      "ரு",
      "ரூ",
      "ரெ",
      "ரே",
      "ரை",
      "ரொ",
      "ரோ",
      "ரௌ",
    ],
  },
  {
    mei: "ல்",
    uyirmei: [
      "ல",
      "லா",
      "லி",
      "லீ",
      "லு",
      "லூ",
      "லெ",
      "லே",
      "லை",
      "லொ",
      "லோ",
      "லௌ",
    ],
  },
  {
    mei: "வ்",
    uyirmei: [
      "வ",
      "வா",
      "வி",
      "வீ",
      "வு",
      "வூ",
      "வெ",
      "வே",
      "வை",
      "வொ",
      "வோ",
      "வௌ",
    ],
  },
  {
    mei: "ழ்",
    uyirmei: [
      "ழ",
      "ழா",
      "ழி",
      "ழீ",
      "ழு",
      "ழூ",
      "ழெ",
      "ழே",
      "ழை",
      "ழொ",
      "ழோ",
      "ழௌ",
    ],
  },
  {
    mei: "ள்",
    uyirmei: [
      "ள",
      "ளா",
      "ளி",
      "ளீ",
      "ளு",
      "ளூ",
      "ளெ",
      "ளே",
      "ளை",
      "ளொ",
      "ளோ",
      "ளௌ",
    ],
  },
  {
    mei: "ற்",
    uyirmei: [
      "ற",
      "றா",
      "றி",
      "றீ",
      "று",
      "றூ",
      "றெ",
      "றே",
      "றை",
      "றொ",
      "றோ",
      "றௌ",
    ],
  },
  {
    mei: "ன்",
    uyirmei: [
      "ன",
      "னா",
      "னி",
      "னீ",
      "னு",
      "னூ",
      "னெ",
      "னே",
      "னை",
      "னொ",
      "னோ",
      "னௌ",
    ],
  },
];

// Uyir letters (Vowels)
const uyirEzhuthukkal = [
  "அ",
  "ஆ",
  "இ",
  "ஈ",
  "உ",
  "ஊ",
  "எ",
  "ஏ",
  "ஐ",
  "ஒ",
  "ஓ",
  "ஔ",
];

const TamilAlphabetTable = ({ words }) => {
  // Extract first letters of all words
  const firstLetters = words.sort().map((word) => word.word.slice(0, 2)); // Extract first two characters (e.g., "கோ" or "சி")

  // Function to check if a specific Uyir is present
  const isUyirHighlighted = (uyir) =>
    firstLetters.some((letter) => letter.startsWith(uyir));

  const navigate = useNavigate();
  const handleNavigate = (letter) => {
    navigate(`/Word-Search-App/firstLetter/${letter}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-red-600">
        தொடரடைவுகள்
      </h2>
      <div className="overflow-x-auto overflow-y-auto max-h-[400px] border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            {/* <th className="px-4 py-2 bg-gray-200 font-bold border border-gray-300"></th> */}
            {uyirEzhuthukkal.sort().map((uyir, index) => (
              <th
                key={index}
                className="px-4 py-2 bg-gray-200 font-bold border border-gray-300 text-center"
              >
                {isUyirHighlighted(uyir) ? (
                  <a
                    onClick={() => handleNavigate(uyir)}
                    className={`${"highlighted"}`}
                  >
                    {uyir}
                  </a>
                ) : (
                  <span className="no-underline">{uyir}</span>
                )}
              </th>
            ))}
          </thead>
          <tbody>
            {uyirmeiData.sort().map((row, index) => {
              const rowHasMatch = row.uyirmei.some((uyirmei) =>
                firstLetters.includes(uyirmei)
              );
              return (
                <tr
                  key={index}
                  className={`${rowHasMatch ? "" : "hidden"} ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  {/* <td className="px-4 py-2 bg-gray-200 font-bold border border-gray-300">
                    {row.mei}
                  </td> */}
                  {row.uyirmei.sort().map((uyirmei, i) => (
                    <td
                      key={i}
                      className="px-4 py-2 border border-gray-300 text-center"
                    >
                      {firstLetters.includes(uyirmei) ? (
                        <a
                          onClick={() => handleNavigate(uyirmei)}
                          className={`${"highlighted"}`}
                        >
                          {uyirmei}
                        </a>
                      ) : (
                        <span className="text-gray-800"> {uyirmei}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LetterHomePage = () => {
  const [wordDetails, setWordDetails] = useState([]);
  const { outputJson } = useContext(DataContext);
  useEffect(() => {
    // fetch("./output.json") // Fetch from public folder
    //   .then((response) => response.json())
    //   .then((data) => {
    outputJson != null &&
      setWordDetails(
        outputJson["words"].sort().map((word) => ({
          word: word.wordName,
          wordNameDescription: word.wordNameDescription,
        }))
      );
    // })
    // .catch((error) => console.error("Error fetching JSON:", error));
  }, [outputJson]);

  return (
    <div>
      {/* Render the TamilAlphabetTable component */}
      <TamilAlphabetTable words={wordDetails} />
    </div>
  );
};

export default LetterHomePage;
