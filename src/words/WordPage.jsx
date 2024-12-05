import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WordDescription = () => {
  const { wordName } = useParams();
  const decodedWord = decodeURIComponent(wordName);
  const [wordData, setWordData] = useState([]);
  const jsondata={
    "இயல்பு":{"id":1,"wordName":"இயல்பு","wordNameDescription":"இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்","wordName_FirstLetter":"இ","books":[{"id":1,"bookName":"மூல நூல்","bookName_firstLetter":null,"bookNameDescription":null},{"id":2,"bookName":"எண் நூல்","bookName_firstLetter":null,"bookNameDescription":null}],"maraimoozhis":[{"id":1,"maraiMoozhiName":"இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்","maraiMoozhiDescription":null}],"youTubeVideos":[]}
    ,"வேட்டல்":{"id":2,"wordName":"வேட்டல்","wordNameDescription":"விருப்பத்தில் நிலைபெறுதல்","wordName_FirstLetter":"வே","books":[{"id":3,"bookName":"மெய்","bookName_firstLetter":null,"bookNameDescription":null},{"id":4,"bookName":"வேட்டல்","bookName_firstLetter":null,"bookNameDescription":null}],"maraimoozhis":[{"id":2,"maraiMoozhiName":"அன்பே சிவம்","maraiMoozhiDescription":null},{"id":3,"maraiMoozhiName":"சிவமே கொள்கையாம் சக்தியே செயலாம்","maraiMoozhiDescription":null}],"youTubeVideos":[{"id":1,"youTubetitle":"வேட்டல் இணையவழி வகுப்பு","youTubeURL":"https://youtu.be/zifcxn9SSIs?si=3K8LOnLp1ZCP9QZI"}]}
    ,"சிவம்":{"id":3,"wordName":"சிவம்","wordNameDescription":"யாவும் யாமே","wordName_FirstLetter":"சி","books":[{"id":2,"bookName":"எண் நூல்","bookName_firstLetter":null,"bookNameDescription":null},{"id":1,"bookName":"மூல நூல்","bookName_firstLetter":null,"bookNameDescription":null},{"id":5,"bookName":"ஊழி நூல்","bookName_firstLetter":null,"bookNameDescription":null},{"id":6,"bookName":"வடிவு நூல்","bookName_firstLetter":null,"bookNameDescription":null}],"maraimoozhis":[{"id":2,"maraiMoozhiName":"அன்பே சிவம்","maraiMoozhiDescription":null},{"id":3,"maraiMoozhiName":"சிவமே கொள்கையாம் சக்தியே செயலாம்","maraiMoozhiDescription":null}],"youTubeVideos":[{"id":2,"youTubetitle":"அன்பு நலம்","youTubeURL":"https://youtu.be/KWl2xH_YgS0?si=D_U6Mgo04cbAd79u"}]}
    ,"சக்தி":{"id":4,"wordName":"சக்தி","wordNameDescription":"தன்னிலை தனிநிலையகுக","wordName_FirstLetter":"ச","books":[{"id":5,"bookName":"ஊழி நூல்","bookName_firstLetter":null,"bookNameDescription":null},{"id":1,"bookName":"மூல நூல்","bookName_firstLetter":null,"bookNameDescription":null},{"id":2,"bookName":"எண் நூல்","bookName_firstLetter":null,"bookNameDescription":null}],"maraimoozhis":[{"id":3,"maraiMoozhiName":"சிவமே கொள்கையாம் சக்தியே செயலாம்","maraiMoozhiDescription":null},{"id":1,"maraiMoozhiName":"இயலெனபடுவது இருத்தலை தக்கவைத்தலும் மூலத்தை உணர்வதும்","maraiMoozhiDescription":null}],"youTubeVideos":[]}
  }
  useEffect(() => {
    const fetchWordData = async () => {

      setWordData(jsondata[decodedWord]);
      // await fetch(`http://localhost:8080/words/${decodedWord}`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setWordData(data);
      //   });
    };
    fetchWordData();
  }, []);

  return (
    <div>
      <div className="bg-orange-400 h-16 w-full">
        {
          <h1 className="pt-4 pl-4 text-2xl font-bold text-white">
            {wordName}
          </h1>
        }
      </div>
      <div className="m-8 ">
        <b className="text-2xl text-orange-400">பொருள் </b>
        <h1> {wordData.wordNameDescription}</h1>
        <ul>
          <b className="text-2xl text-orange-400 underline underline-offset-1">
            நூல்கள்
          </b>
          {wordData !== undefined &&
            wordData !== null &&
            wordData.books !== undefined &&
            wordData.books !== null &&
            wordData.books.map((ele) => {
              return <li className="list-decimal">{ele.bookName}</li>;
            })}
        </ul>
        <ul>
          <b className="text-2xl text-orange-400 underline underline-offset-1">
            மறை மொழிகள்
          </b>
          {wordData !== undefined &&
            wordData !== null &&
            wordData.maraimoozhis !== undefined &&
            wordData.maraimoozhis !== null &&
            wordData.maraimoozhis.map((ele) => {
              return <li className="list-decimal">{ele.maraiMoozhiName}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default WordDescription;
