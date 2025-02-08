import "./disabledevTools.js";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import DataProvider from "./DataContext.jsx";
import Header from "./HomeComponents/Header.jsx";
import { registerSW } from "virtual:pwa-register";
import CacheInfo from "./CacheInfo.jsx";

// Register the service worker
registerSW({ immediate: true });
// Lazy-loaded components
const HomePage = lazy(() => import("./HomePage.jsx"));
const AllBooks = lazy(() => import("./books/AllBooks.jsx"));
const AllWords = lazy(() => import("./words/AllWords.jsx"));
const AllMaraiMoozhi = lazy(() => import("./maraiMoozhi/AllMaraiMoozhi.jsx"));
const WordSummary = lazy(() => import("./words/WordSummary.jsx"));
const NotFound = lazy(() => import("./NotFound.jsx"));
const WordsByFirstLetter = lazy(() =>
  import("./words/firstLetter/FirstLetterWord.jsx")
);
const WordsInBook = lazy(() => import("./books/WordsInBook.jsx"));
const WordsinMaraiMoozhi = lazy(() =>
  import("./maraiMoozhi/WordsinMaraiMoozhi.jsx")
);
const WordBookMaraimoozhi = lazy(() =>
  import("./words/WordBookMaraimoozhi.jsx")
);


createRoot(document.getElementById("root")).render(
  <DataProvider>
    <BrowserRouter>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/Word-Search-App/" element={<HomePage />} />
          <Route path="/Word-Search-App/home" element={<HomePage />} />
          <Route path="/Word-Search-App/allBooks" element={<AllBooks />} />
          <Route path="/Word-Search-App/allWords" element={<AllWords />} />
          <Route
            path="/Word-Search-App/allMaraiMoozhis"
            element={<AllMaraiMoozhi />}
          />
          <Route
            path="/Word-Search-App/words/:wordName"
            element={<WordSummary />}
          />
          <Route
            path="/Word-Search-App/book/:bookName"
            element={<WordsInBook />}
          />
          <Route
            path="/Word-Search-App/firstLetter/:letter"
            element={<WordsByFirstLetter />}
          />
          <Route
            path="/Word-Search-App/maraiMozhi/:maraiMoozhi"
            element={<WordsinMaraiMoozhi />}
          />
          <Route
            path="/Word-Search-App/tirattu"
            element={<WordBookMaraimoozhi />}
          />
          <Route
            path="/Word-Search-App/cache"
            element={<CacheInfo />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </DataProvider>
);
