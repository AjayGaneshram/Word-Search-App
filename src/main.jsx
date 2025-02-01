import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import WordsInBook from "./books/WordsInBook.jsx";
import WordDescription from "./words/WordPage.jsx";
import WordsinMaraiMoozhi from "./maraiMoozhi/WordsinMaraiMoozhi.jsx";
import HomePage from "./HomePage.jsx";
import AllBooks from "./books/AllBooks.jsx";
import AllWords from "./words/AllWords.jsx";
import AllMaraiMoozhi from "./maraiMoozhi/AllMaraiMoozhi.jsx";
import WordSummary from "./words/WordSummary.jsx";
import NotFound from "./NotFound.jsx";
import WordsByFirstLetter from "./words/firstLetter/FirstLetterWord.jsx";
import DataProvider, { DataContext } from "./DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Main route */}
          <Route path="/Word-Search-App/" element={<HomePage />}></Route>
          <Route path="/Word-Search-App/home" element={<HomePage />} />
          <Route path="/Word-Search-App/allBooks" element={<AllBooks />} />
          <Route
            path="/Word-Search-App/words/:wordName"
            element={<WordSummary />}
          />
          <Route path="/Word-Search-App/allWords" element={<AllWords />} />
          <Route
            path="/Word-Search-App/allMaraiMoozhis"
            element={<AllMaraiMoozhi />}
          />
          <Route
            path="/Word-Search-App/book/:bookName"
            element={<WordsInBook />}
          />
          <Route
            path="/Word-Search-App/firstLetter/:letter"
            element={<WordsByFirstLetter />}
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/Word-Search-App/maraiMozhi/:maraiMoozhi"
            element={<WordsinMaraiMoozhi />}
          />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </StrictMode>
);
