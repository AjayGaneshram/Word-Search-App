import { useState, useRef, useEffect } from "react";

const WordAccordion = ({ wordData }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
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
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sortedWords = [...wordData].sort((a, b) =>
    a.wordName.localeCompare(b.wordName, "ta")
  );

  const groupedWords = sortedWords.reduce((acc, word) => {
    const firstLetter = word.wordName.charAt(0);
    const family = uyirmeiData.find((group) => group.uyirmei.includes(firstLetter));
    const key = family ? `${firstLetter}` : firstLetter;

    if (!acc[key]) acc[key] = [];
    acc[key].push(word);
    return acc;
  }, {});

  const filteredGroups = Object.entries(groupedWords).filter(([_, words]) =>
    words.some((word) => word.wordName.includes(searchQuery))
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center  mb-4 border border-red-500 rounded-lg p-2">

	  <span className="p-2 text-red-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 1 1-1.42 1.42l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.24 10.24A6 6 0 0 0 10 4z"/>
        </svg>
      </span><input
          ref={inputRef}
          type="text"
          placeholder="சொற்களை தேடுக"
          value={searchQuery}
          onChange={(e) => {
			setExpanded(true)
			setSearchQuery(e.target.value)}}
          className="flex-1 p-2 outline-none text-lg bg-transparent border-b-2 border-red-500"
        />
        {searchQuery && (
           <button
           onClick={() => {
			setExpanded(false)
			setSearchQuery("")}}
           className="p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all flex items-center justify-center"
         >
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
             <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.59 7.1 4.7a1 1 0 1 0-1.4 1.4L10.59 12l-4.89 4.9a1 1 0 1 0 1.4 1.4L12 14.41l4.9 4.89a1 1 0 1 0 1.4-1.4L13.41 12l4.89-4.9z"/>
           </svg>
         </button>
        )}
      </div>

      {/* Accordion */}
      <div className="border border-gray-300 rounded-lg">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex justify-between items-center p-3 bg-red-800 text-white font-bold rounded-lg"
        >
          <span>சொற்கள்</span>
          <span>{expanded ? "▲" : "▼"}</span>
        </button>

        {expanded && (
          <div className="p-3 bg-white border-t border-gray-300 max-h-[300px] overflow-y-auto">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(([key, words]) => (
                <div key={key} className="mb-4">
                  <h3 className="text-red-800 font-bold text-lg mb-2">{key}</h3>
                  <div className="flex flex-wrap gap-2">
                    {words.sort().map((word, index) => (
                      <a
                        key={index}
                        href={`#${encodeURIComponent(word.wordName)}`}
                        className="p-2 text-lg rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none hover:bg-red-800 hover:text-white border border-gray-300"
                      >
                        {word.wordName}
                      </a>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">சொற்கள் கிடைக்கவில்லை.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordAccordion;