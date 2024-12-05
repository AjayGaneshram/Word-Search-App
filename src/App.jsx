import { useEffect, useState } from "react";
import WordPage from "./words/WordPage";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const [wordData, setWordData] = useState([]);
  const [bookNameData, setBookNameData] = useState([]);
  const [maraiMoozhiData, setMaraiMoozhiData] = useState([]);
  const [overallwords, setOverallWords] = useState([]);

  const navigate = useNavigate();
  const handleNavigate = (word) => {
    navigate(`/book/${word}`);
  };

  const wordHandleNavigate = (word) => {
    navigate(`/words/${word}`);
  };

  const maraiMoozhiNavigate = (word) => {
    navigate(`/words/by-marai-moozhi/${word}`);
  };
  useEffect(() => {
    const fetchWordData = async () => {
      await fetch("http://localhost:8080/words/names")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWordData(data);
        });
    };
    const fetchOverallWordData = async () => {
      await fetch(
        "http://localhost:8080/words/api/word-book-marai-moozhi-youtube"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setOverallWords(data);
        });
    };
    const fetchBookData = async () => {
      await fetch("http://localhost:8080/words/bookNames")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setBookNameData(data);
        });
    };
    const fetchMaraiMoozhiData = async () => {
      await fetch("http://localhost:8080/words/marai-moozhisNames")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setMaraiMoozhiData(data);
        });
    };

    fetchWordData();
    fetchBookData();
    fetchMaraiMoozhiData();
    fetchOverallWordData();
  }, []);
  return (
    <div>
      <div className="m-4 p-4">
        <div className="flex gap-x-8">
          <ul className="shadow-2xl p-8 w-3/6 w-full border-solid border-2 border-orange-100">
            <b className="text-2xl text-orange-400 underline underline-offset-1">
              சொற்கள்
            </b>
            {wordData.map((word) => {
              return (
                <li className="list-decimal">
                  <a
                    className="cursor-pointer"
                    onClick={() => wordHandleNavigate(word)}
                  >
                    {word}
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className="shadow-2xl p-8 w-3/6 w-full border-solid border-2 border-orange-100">
            <b className="text-2xl text-orange-400 underline underline-offset-1">
              நூல்கள்
            </b>
            {bookNameData.map((word) => {
              return (
                <li className="list-decimal">
                  {/* <Link to="/book"> */}

                  <a
                    className="cursor-pointer"
                    onClick={() => handleNavigate(word)}
                  >
                    {word}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-8">
          <ul className="shadow-2xl p-8 w-3/6 w-full border-solid border-2 border-orange-100">
            <b className="text-2xl text-orange-400 underline underline-offset-1">
              மறை மொழிகள்
            </b>
            {maraiMoozhiData.map((word) => {
              return (
                <li className="list-decimal">
                  <a
                    className="cursor-pointer"
                    onClick={() => maraiMoozhiNavigate(word)}
                  >
                    {word}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default App;
