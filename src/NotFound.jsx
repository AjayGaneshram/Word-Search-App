import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ searchTerm, section }) => {
  const navigate = useNavigate();

  // Custom messages for different sections
  const sectionMessages = {
    words: `நீங்கள் தேடிய "${searchTerm}" சொல் கிடைக்கவில்லை. புதிய சொற்களைத் தேடிப் பாருங்கள்!`,
    books: `நீங்கள் தேடிய "${searchTerm}" புத்தகம் எங்கள் தொகுப்பில் இல்லை. மற்ற புத்தகங்களை ஆராயுங்கள்!`,
    maraiMoozhis: `நீங்கள் தேடிய "${searchTerm}" மறைமொழி கிடைக்கவில்லை. மற்றவற்றைப் பார்வையிடலாம்!`,
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-semibold text-customText">
        தேடல் முடிவுகள் இல்லை
      </h2>
      <p className="text-gray-600 mt-2">
        {sectionMessages[section] ||
          "மன்னிக்கவும், எந்த முடிவுகளும் கிடைக்கவில்லை."}
      </p>
    </div>
  );
};

export default NotFound;
