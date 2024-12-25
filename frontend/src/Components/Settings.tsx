import { useState } from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import Brightness2Icon from "@mui/icons-material/Brightness2"; // Dark theme icon
import LanguageIcon from "@mui/icons-material/Language"; // Language change icon

export default function Settings() {
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState(false); // false = light theme, true = dark theme
  const [language, setLanguage] = useState("en"); // Language state (default is English)

  // Toggle theme between light and dark
  const changeTheme = () => {
    setTheme((prevTheme: boolean) => !prevTheme);
    window.location.reload(); // Reload the page to apply theme changes
  };

  // Toggle language (for simplicity, just between 'en' and 'es')
  const changeLanguage = () => {
    setLanguage(language === "en" ? "es" : "en"); // Toggle between English and Spanish
  };

  return (
    <div
      onClick={() => setSettings(false)}
      className={`${
        settings
          ? "w-full h-screen fixed md:hidden bg-opacity-50 top-0 left-0 z-30 bg-black"
          : ""
      } md:hidden`}
    >
      <div className="md:hidden absolute z-50 top-1/2 left-1/4 lg:w-[100%] w-[60%]">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            theme ? "bg-[#282828] text-white" : "bg-white"
          } md:hidden w-[100%] transform -translate-y-1/2 absolute left-1/2 -translate-x-1/2 p-6 rounded-md md:w-[30%] ws-[100%]`}
        >
          <h2 className="text-lg font-semibold mb-4">Settings</h2>

          {/* Theme Settings */}
          <div className="flex flex-row items-center gap-2 mb-4">
            <button onClick={changeTheme} className="flex items-center gap-2">
              {theme ? "Dark theme" : "Light theme"}{" "}
              {theme ? <Brightness2Icon /> : <WbSunnyOutlinedIcon />}
            </button>
          </div>

          {/* Language Settings */}
          <div className="flex flex-row items-center gap-2 mb-4">
            <button onClick={changeLanguage} className="flex items-center gap-2">
              {language === "en" ? "Switch to Spanish" : "Switch to English"}{" "}
              <LanguageIcon />
            </button>
          </div>

          {/* Additional Settings (example) */}
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() => alert("Other settings functionality can go here")}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Other Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
