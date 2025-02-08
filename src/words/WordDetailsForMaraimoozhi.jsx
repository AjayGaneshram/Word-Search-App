import React, { useState } from "react";

const Section = ({ title, items, renderItem, expandLabel, collapseLabel }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 4);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#991b1b] mb-4 text-center">
        {title}
      </h2>
      {title != "உரைகள்" ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleItems.sort().map(renderItem)}
        </ul>
      ) : (
        <ul className="grid gap-4">{visibleItems.sort().map(renderItem)}</ul>
      )}
      {items.length > 4 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#dc2626] font-bold hover:text-orange-700 "
          >
            {expanded ? " ‹‹ " + collapseLabel : expandLabel + " ›› "}
          </button>
        </div>
      )}
    </div>
  );
};

const WordDetailsSectionsForMaraimoozhi = ({
  wordDetails,
  handleNavigate,
  maraimoozhiHandleNavigate,
}) => {
  return (
    <div className="border-b-2 border-red-200 pb-2">
      {/* Books Section */}
      {wordDetails.bookNames.length > 0 && (
        <Section
          title="நூல்கள்"
          items={wordDetails.bookNames}
          expandLabel="அனைத்தையும் காண்க"
          collapseLabel="குறைக்க"
          renderItem={(book, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow-xl rounded-md text-gray-700 border border-red-200 hover:shadow-lg text-center cursor-pointer"
              onClick={() => handleNavigate(book)}
            >
              {book}
            </li>
          )}
        />
      )}

      {wordDetails.maraiMoozhiNames.length > 0 && (
        <Section
          title="மறை மொழிகள்"
          items={wordDetails.maraiMoozhiNames}
          expandLabel="அனைத்தையும் காண்க"
          collapseLabel="குறைக்க"
          renderItem={(maraiMoozhi, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow-xl rounded-md text-gray-700 border border-red-200 hover:shadow-lg text-center cursor-pointer"
              onClick={() => maraimoozhiHandleNavigate(maraiMoozhi)}
            >
              {maraiMoozhi}
            </li>
          )}
        />
      )}

      {/* YouTube Videos Section */}
      {wordDetails.youtubeNames.length > 0 && (
        <Section
          title="உரைகள்"
          items={wordDetails.youtubeNames}
          expandLabel="அனைத்தையும் காண்க"
          collapseLabel="குறைக்க"
          renderItem={(video, index) => (
            <li key={index} className="text-gray-700 text-center">
              <a
                href={video.youTubeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#dc2626] hover:text-orange-700 "
              >
                {video.youtubeName}
              </a>
            </li>
          )}
        />
      )}
    </div>
  );
};

export default WordDetailsSectionsForMaraimoozhi;
