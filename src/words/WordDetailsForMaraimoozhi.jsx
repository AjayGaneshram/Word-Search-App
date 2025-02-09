import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

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
      {pages.map((page) => (
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

const PaginatedSection = ({ title, items, renderItem, itemsPerPage = 4, layout }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4 pb-2 text-center underline underline-offset-1">
        {title}
      </h2>
      {layout === "row" ? (
        <div className="flex flex-wrap justify-center gap-4">
          {visibleItems.map(renderItem)}
        </div>
      ) : (
        <ul className="divide-y divide-gray-300">{visibleItems.map(renderItem)}</ul>
      )}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />}
    </div>
  );
};

const WordDetailsSectionsForMaraimoozhi = ({ wordDetails, handleNavigate, maraimoozhiHandleNavigate }) => {
  return (
    <div className="border-b-2 border-red-200 mb-8 p-4">
      {/* Books Section - Multi-Column Grid */}
      {wordDetails.bookNames.length > 0 && (
        <PaginatedSection
          title="நூல்கள்"
          items={wordDetails.bookNames}
          layout="row"
          renderItem={(book, index) => (
            <li
              key={index}
              className="flex items-center justify-center p-3  rounded-lg hover:bg-red-50 transition cursor-pointer"
              onClick={() => handleNavigate(book)}
            >
             {book} <span className="text-red-500">🔗</span>
            </li>
          )}
        />
      )}

      {/* Marai Moozhis Section */}
      {wordDetails.maraiMoozhiNames.length > 0 && (
        <PaginatedSection
          title="மறை மொழிகள்"
          items={wordDetails.maraiMoozhiNames}
          renderItem={(maraiMoozhi, index) => (
            <li
              key={index}
              className="flex items-center justify-center p-3 rounded-lg hover:bg-red-50 transition cursor-pointer"
              onClick={() => maraimoozhiHandleNavigate(maraiMoozhi)}
            >
              {maraiMoozhi} <span className="text-red-500">🔗</span>
            </li>
          )}
        />
      )}

      {/* YouTube Videos Section */}
      {wordDetails.youtubeNames.length > 0 && (
        <PaginatedSection
          title="உரைகள்"
          items={wordDetails.youtubeNames}
          renderItem={(video, index) => (
            <li
              key={index}
              className="flex items-center justify-center p-3 rounded-lg hover:bg-red-50 transition"
            >
              <a
                href={video.youTubeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-700  flex items-center gap-2"
              >
                 {video.youtubeName} <span className="text-red-500">🔗</span>
              </a>
            </li>
          )}
        />
      )}
    </div>
  );
};

export default WordDetailsSectionsForMaraimoozhi;
