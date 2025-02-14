import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-2 m-4">
      {currentPage > 1 && (
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 font-semibold border border-red-200 rounded text-red-500 bg-red-50"
          >
            « முந்தைய
          </button>
        </li>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li key={page}>
          <button
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border border-red-200 rounded ${
              page === currentPage ? "bg-red-600 text-white" : ""
            }`}
          >
            {page}
          </button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 font-semibold border rounded text-red-500 bg-red-50"
          >
            அடுத்து »
          </button>
        </li>
      )}
    </ul>
  );
};

const PaginatedSection = ({ title, items, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth > 1200) setItemsPerPage(20);
      else if (window.innerWidth > 900) setItemsPerPage(16);
      else if (window.innerWidth > 600) setItemsPerPage(12);
      else setItemsPerPage(8);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="mb-4">
      <h3 className="text-red-800 font-bold text-lg mb-2">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {visibleItems.map(renderItem)}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />
      )}
    </div>
  );
};

const WordAccordion = ({ wordData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordions, setOpenAccordions] = useState({});
  const navigate = useNavigate();

  const handleNavigate = (word) => navigate(`/Word-Search-App/words/${word}`);

  const sortedWords = [...wordData].sort((a, b) => a.wordName.localeCompare(b.wordName, "ta"));

  const groupedByWordIyal = sortedWords.reduce((acc, word) => {
    const category = word.bookNames?.[0]?.wordIyal || "Ungrouped";
    if (!acc[category]) acc[category] = [];
    acc[category].push(word);
    return acc;
  }, {});

  const finalGroupedWords = Object.entries(groupedByWordIyal).reduce((acc, [wordIyal, words]) => {
    const groupedByFirstLetter = words.reduce((subAcc, word) => {
      const firstLetter = word.wordName.charAt(0);
      if (!subAcc[firstLetter]) subAcc[firstLetter] = [];
      subAcc[firstLetter].push(word);
      return subAcc;
    }, {});
    acc[wordIyal] = groupedByFirstLetter;
    return acc;
  }, {});

  const filteredGroups = Object.entries(finalGroupedWords)
    .map(([wordIyal, letterGroups]) => {
      const filteredLetterGroups = Object.entries(letterGroups).filter(([_, words]) =>
        words.some(word => word.wordName.includes(searchQuery))
      );
      return filteredLetterGroups.length > 0 ? [wordIyal, Object.fromEntries(filteredLetterGroups)] : null;
    })
    .filter(Boolean);

  const toggleAccordion = (wordIyal) => {
    setOpenAccordions((prev) => ({ ...prev, [wordIyal]: !prev[wordIyal] }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center mb-4 border border-red-500 rounded-lg p-2">
        <input
          type="text"
          placeholder="சொற்களை தேடுக"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 p-2 outline-none text-lg bg-transparent border-b-2 border-red-500"
        />
      </div>

      {filteredGroups.length > 0 ? (
        filteredGroups.map(([wordIyal, letterGroups]) => (
          <div key={wordIyal} className="mb-6">
            <button
              onClick={() => toggleAccordion(wordIyal)}
              className="w-full text-left font-bold text-sm mb-2 p-3  text-red-800 rounded-lg"
            >
              <span className="text-">{wordIyal !== "Ungrouped" ? wordIyal : "சொற்கள்"} {openAccordions[wordIyal] ? "«" : "»"}</span>
            </button>
            {openAccordions[wordIyal] && (
              <div className="ml-4">
                {Object.entries(letterGroups).map(([letter, words]) => (
                  <PaginatedSection
                    key={letter}
                    title={letter}
                    items={words}
                    renderItem={({ wordName }) => (
                      <span
                        className="mb-4 p-2 bg-gray-100 text-center rounded-lg hover:bg-red-800 hover:text-white transition-all cursor-pointer"
                        onClick={() => handleNavigate(wordName)}
                      >
                        {wordName}
                      </span>
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">சொற்கள் கிடைக்கவில்லை.</p>
      )}
    </div>
  );
};

export default WordAccordion;