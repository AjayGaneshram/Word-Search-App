import { useState, useEffect } from "react";
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

const WordAccordion = ({ wordData, component }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordions, setOpenAccordions] = useState({});
  const navigate = useNavigate();

  const handleNavigate = (word) => navigate(`/Word-Search-App/words/${word}`);

  const sortedWords = [...wordData].sort((a, b) => a.wordName.localeCompare(b.wordName, "ta"));

  let groupedData = {};

  if (component === "book") {
    groupedData = sortedWords.reduce((acc, word) => {
      const wordIyal = word.bookNames?.[0]?.wordIyal || "சொற்கள்";
      if (!acc[wordIyal]) acc[wordIyal] = {};
      const firstLetter = word.wordName.charAt(0);
      if (!acc[wordIyal][firstLetter]) acc[wordIyal][firstLetter] = [];
      acc[wordIyal][firstLetter].push(word);
      return acc;
    }, {});
  } else if (component === "maraiMoozhi") {
    groupedData = sortedWords.reduce((acc, word) => {
      // Ensure maraiMoozhiNames is present
      word.maraiMoozhiNames?.forEach((maraiMoozhi) => {
        const bookNames = word.bookNames || [];
        
        // If no bookNames, use "சொற்கள்"
        if (bookNames.length === 0) {
          const defaultBookName = "சொற்கள்";
          const defaultWordIyal = "சொற்கள்";
  
          // Initialize the structure for "சொற்கள்" if it doesn't exist yet
          if (!acc[defaultBookName]) acc[defaultBookName] = {};
          if (!acc[defaultBookName][defaultWordIyal]) acc[defaultBookName][defaultWordIyal] = [];
          
          // Push the word to the default "சொற்கள்" group
          acc[defaultBookName][defaultWordIyal].push(word);
        } else {
          // For each book associated with this word, group under each book
          bookNames.forEach((book) => {
            const bookName = book.bookName || "சொற்கள்";
            const wordIyal = book.wordIyal || "சொற்கள்";
            
            // Initialize the structure if it doesn't exist yet
            if (!acc[bookName]) acc[bookName] = {};
            if (!acc[bookName][wordIyal]) acc[bookName][wordIyal] = [];
            
            // Push the word into the corresponding book and wordIyal grouping
            acc[bookName][wordIyal].push(word);
          });
        }
      });
  
      // Handle case where maraiMoozhiNames or bookNames are missing
      if (!word.maraiMoozhiNames || word.maraiMoozhiNames.length === 0) {
        const defaultBookName = "சொற்கள்";
        const defaultWordIyal = "சொற்கள்";
        
        // Initialize the structure for "சொற்கள்" if it doesn't exist yet
        if (!acc[defaultBookName]) acc[defaultBookName] = {};
        if (!acc[defaultBookName][defaultWordIyal]) acc[defaultBookName][defaultWordIyal] = [];
        
        // Push the word to the default "சொற்கள்" group
        acc[defaultBookName][defaultWordIyal].push(word);
      }
      
      return acc;
    }, {});
  }

  const safeGroupedData = groupedData || {};

const filteredGroups = Object.entries(safeGroupedData)
  .map(([mainGroup, subGroups]) => {
    const filteredSubGroups = Object.entries(subGroups).filter(([subGroup, words]) => {
      // Ensure that we correctly handle the search query for multiple books
      return Array.isArray(words)
        ? words.some((word) => word.wordName.includes(searchQuery))
        : Object.values(words).flat().some((word) => word.wordName.includes(searchQuery));
    });

    // Only return groups that contain filtered results
    return filteredSubGroups.length > 0 ? [mainGroup, Object.fromEntries(filteredSubGroups)] : null;
  })
  .filter(Boolean);

  const toggleAccordion = (group) => {
    setOpenAccordions((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center mb-4 border border-red-500 rounded-lg p-2">
        <input
          type="text"
          placeholder="சொற்களை தேடுக"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 outline-none text-lg bg-transparent border-b-2 border-red-500"
        />
      </div>

      {filteredGroups.length > 0 ? (
        filteredGroups.map(([mainGroup, subGroups]) => (
          <div key={mainGroup} className="mb-6">
            <button
              onClick={() => toggleAccordion(mainGroup)}
              className="w-full text-left font-bold text-lg p-3 text-red-800 rounded-lg"
            >
              {mainGroup} {openAccordions[mainGroup] ? "《" : "》"}
            </button>
            {openAccordions[mainGroup] && (
              <div className="ml-4">
                {Object.entries(subGroups).map(([subGroup, items]) => (
                  <PaginatedSection
                    key={subGroup}
                    title={subGroup}
                    items={items}
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
