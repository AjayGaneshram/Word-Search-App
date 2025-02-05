import Header from "./HomeComponents/Header";
import LetterHomePage from "./search/TamilLetter";

const HomePage = () => {
  return (
    <div className="bg-stone-50">
      <Header />
      <h2 className="text-sm font-bold text-center m-6 text-red-600">
        {/* சிவமே கொள்கையாம் சக்தியே செயலாம் */}
        மூவா தாயவள் தம்இழ் எனத் தனை <br></br>ஓஆ விரிவொடு இமிழ்தல் 
        <h1 className="font-extrabold text-xl text-red-800">தமிழ்</h1>
      </h2>

      <LetterHomePage />
    </div>
  );
};

export default HomePage;
