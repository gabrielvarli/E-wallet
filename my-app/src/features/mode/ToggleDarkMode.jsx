// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { setMode } from "./modeSlice"; // Importerar action för att ställa in mörkt läge
// import { Button } from "../../components/Button"; // Importerar en knappkomponent
// import { Tooltip } from "flowbite-react"; // Importerar Tooltip-komponenten från Flowbite

// export const ToggleDarkMode = () => {
//     const dispatch = useDispatch(); // Använder useDispatch för att skicka åtgärder till Redux
//     // Hämtar darkMode-värdet från Redux-state
//     const { darkMode } = useSelector((state) => state.darkMode);

//     // Funktion som växlar mellan mörkt och ljust läge
//     const toggleDarkMode = () => {
//         // Skickar en åtgärd till Redux för att uppdatera darkMode-värdet
//         dispatch(setMode(!darkMode));
//     };

//     // Funktion som uppdaterar temat i DOM
//     const updateTheme = (darkMode) => {
//         const root = document.documentElement; // Hämtar rot-elementet i DOM
//         // Sätter attributet data-theme beroende på om mörkt läge är aktivt eller inte
//         root.setAttribute("data-theme", darkMode ? "dark" : "light");
//     };

//     // useEffect-hook som körs när darkMode-värdet ändras
//     useEffect(() => {
//         updateTheme(darkMode); // Anropar updateTheme för att uppdatera DOM med det nya temat
//     }, [darkMode]); // Beror på darkMode

//     return (
//         <Tooltip
//             animation="duration-500" // Ställer in animationens varaktighet
//             content={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} // Tooltip-innehåll baserat på darkMode
//             style={darkMode ? "dark" : "light"} // Ställer in tooltip-stil baserat på darkMode
//         >
//             <div className="flex">
//                 <Button
//                     type="tertiary" // Typ av knapp
//                     onClick={toggleDarkMode} // Anropar toggleDarkMode när knappen klickas
//                 >
//                     {darkMode ? (
//                         // Om mörkt läge är aktivt, visa en ikon för ljus läge
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={2}
//                             stroke="currentColor"
//                             className="w-5 h-5 sm:w-6 sm:h-6"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//                             />
//                         </svg>
//                     ) : (
//                         // Om mörkt läge inte är aktivt, visa en ikon för mörkt läge
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={1.5}
//                             stroke="currentColor"
//                             className="w-6 h-6"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
//                             />
//                         </svg>
//                     )}
//                 </Button>
//             </div>
//         </Tooltip>
//     );
// };

// // Den här komponenten renderar en knapp som låter användaren växla mellan mörkt och ljust läge.


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTheme } from "./modeSlice"; // Importera setTheme-action
import { Button } from "../../components/Button";
import { Tooltip } from "flowbite-react";

const themeOptions = ["light", "dark", "red", "green"]; // Tillgängliga teman

export const ToggleDarkMode = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.darkMode); // Hämta det aktuella temat från Redux
  const [hoveredTheme, setHoveredTheme] = useState(null); // Håll koll på vilket tema som "hoveras"

  // Funktion för att byta tema
  const toggleTheme = () => {
    const nextTheme = themeOptions[(themeOptions.indexOf(theme) + 1) % themeOptions.length];
    dispatch(setTheme(nextTheme)); // Uppdatera temat i Redux
  };

  // Uppdatera DOM med det valda temat
  const updateTheme = (theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    updateTheme(theme); // Anropa updateTheme när temat ändras
  }, [theme]);

  return (
    <Tooltip
      animation="duration-500"
      content={`Switch to ${theme}`}
      style={theme === "light" ? "dark" : "light"}
    >
      <div className="flex">
        <Button
          type="tertiary"
          onClick={toggleTheme} // Byt tema när knappen klickas
          onMouseEnter={() => setHoveredTheme(true)} // Visa förhandsvisning vid hover
          onMouseLeave={() => setHoveredTheme(null)} // Ta bort förhandsvisning
        >
          <div className="relative">
            {hoveredTheme && (
              <div className="absolute top-[-40px] w-[120px] flex justify-between">
                {themeOptions.map((themeOption) => (
                  <div
                    key={themeOption}
                    className={`w-6 h-6 rounded-full cursor-pointer bg-${
                      themeOption === "light"
                        ? "gray-200"
                        : themeOption === "dark"
                        ? "gray-800"
                        : themeOption === "green"
                        ? "green-500"
                        : "red-500"
                    }`}
                    onClick={() => dispatch(setTheme(themeOption))} // Ändra tema vid klick
                  ></div>
                ))}
              </div>
            )}

            {/* Om mörkt läge är aktivt, visa ljusikon, annars mörk */}
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </div>
        </Button>
      </div>
    </Tooltip>
  );
};
