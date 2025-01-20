import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WordsInBook from "./books/WordsInBook.jsx";
import WordDescription from "./words/WordPage.jsx";
import WordsinMaraiMoozhi from "./maraiMoozhi/WordsinMaraiMoozhi.jsx";
import HomePage from "./HomePage.jsx";
import AllBooks from "./books/AllBooks.jsx";
import AllWords from "./words/AllWords.jsx";
import AllMaraiMoozhi from "./maraiMoozhi/AllMaraiMoozhi.jsx";
import WordSummary from "./words/WordSummary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main route */}
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path="uniqueWords" element={<HomePage />} /> */}
        <Route path="allBooks" element={<AllBooks />} />
        <Route path="words/:wordName" element={<WordSummary />} />
        <Route path="allWords" element={<AllWords />} />
        <Route path="allMaraiMoozhis" element={<AllMaraiMoozhi />} />
        <Route path="book/:bookName" element={<WordsInBook />} />
        {/* <Route path="words/:wordName" element={<WordDescription />} /> */}
        <Route path="maraiMoli/:maraiMoozhi" element={<WordsinMaraiMoozhi />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
