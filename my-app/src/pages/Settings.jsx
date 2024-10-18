// import { useDispatch, useSelector } from "react-redux";
// import { deleteInactiveCards } from "../features/cards/cardsSlice";
// import { useState } from "react";

// export const Settings = () => {
//     const dispatch = useDispatch();
//     const { darkMode } = useSelector((state) => state.darkMode); // Lägg till om du har darkMode state
//     const [theme, setTheme] = useState(darkMode ? "dark" : "light"); // Förvalt tema

//     const handleDeleteInactive = () => {
//         if (window.confirm("Vill du radera alla inaktiva kort?")) {
//             dispatch(deleteInactiveCards()); // Radera inaktiva kort från Redux
//         }
//     };

//     const handleThemeChange = (e) => {
//         const selectedTheme = e.target.value;
//         setTheme(selectedTheme);
//         // Du kan även implementera logik för att ändra tema här om du har ett Redux state för det
//     };

//     return (
// <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md mt-10 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
//             <h2 className="text-xl font-bold mb-6 text-center text-black">Settings</h2>

//             <label className="block text-lg font-semibold mb-4 text-black">
//                 Theme
//                 <select
//                     value={theme}
//                     onChange={handleThemeChange}
//                     className="block w-full p-2 mt-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded "
//                 >
//                     <option value="light">Light</option>
//                     <option value="dark">Dark</option>
//                     <option value="dark">Red</option>
//                     <option value="green">Green</option> {/* Exempel på ytterligare tema */}
//                 </select>
//             </label>

//             <button
//                 onClick={handleDeleteInactive}
//                 className="block w-full p-2 mt-6 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//                 Delete all inactive cards
//             </button>
//         </div>
//     );
// };



// import { useDispatch, useSelector } from "react-redux";
// import { deleteInactiveCards } from "../features/cards/cardsSlice";
// import { setTheme } from "../features/mode/modeSlice"; // Importera setTheme-action
// import { useState, useEffect } from "react";

// export const Settings = () => {
//     const dispatch = useDispatch();
//     const currentTheme = useSelector((state) => state.theme.theme); // Hämta aktuellt tema från Redux
//     const [theme, setThemeState] = useState(currentTheme); // Förvalt tema

//     const handleDeleteInactive = () => {
//         if (window.confirm("Vill du radera alla inaktiva kort?")) {
//             dispatch(deleteInactiveCards());
//         }
//     };

//     const handleThemeChange = (e) => {
//         const selectedTheme = e.target.value;
//         setThemeState(selectedTheme); // Uppdaterar endast lokala state
//     };

//     const handleSaveChanges = () => {
//         // Sparar temat till Redux och uppdaterar hela applikationens tema
//         dispatch(setTheme(theme)); 
//         alert("Theme saved!"); // Bekräftelse till användaren att ändringar sparats
//     };

//     // Effekt för att uppdatera DOM:s data-theme attribut för att spegla det valda temat
//     useEffect(() => {
//         document.documentElement.setAttribute("data-theme", theme);
//     }, [theme]);

//     return (
//         <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md mt-10 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
//             <h2 className="text-xl font-bold mb-6 text-center text-black">Settings</h2>

//             <label className="block text-lg font-semibold mb-4 text-black">
//                 Theme
//                 <select
//                     value={theme}
//                     onChange={handleThemeChange}
//                     className="block w-full p-2 mt-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded "
//                 >
//                     <option value="light">Light</option>
//                     <option value="dark">Dark</option>
//                     <option value="red">Red</option>
//                     <option value="green">Green</option> {/* Exempel på ytterligare tema */}
//                 </select>
//             </label>

//             {/* Save Changes-knapp */}
//             <button
//                 onClick={handleSaveChanges} // Sparar ändringar när knappen klickas
//                 className="block w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//                 Save Changes
//             </button>

//             {/* Radera inaktiva kort-knapp */}
//             <button
//                 onClick={handleDeleteInactive}
//                 className="block w-full p-2 mt-6 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//                 Delete all inactive cards
//             </button>
//         </div>
//     );
// };

import { useDispatch, useSelector } from "react-redux"; // Importerar hooks från Redux för att skicka actions och hämta state
import { deleteInactiveCards } from "../features/cards/cardsSlice"; // Importerar en action för att radera inaktiva kort
import { setTheme } from "../features/mode/themeSlice"; // Importerar action för att ändra tema i Redux
import { useState, useEffect } from "react"; // Importerar React hooks för att hantera lokalt state och side-effects

export const Settings = () => {
    const dispatch = useDispatch(); // Hook för att skicka actions till Redux
    const currentTheme = useSelector((state) => state.theme.theme); // Hämta aktuellt tema från Redux state

    const [theme, setThemeState] = useState(currentTheme || "light"); // Lokalt state för att hantera valt tema, default är "light"

    // Effekt som körs när `currentTheme` ändras i Redux. Uppdaterar lokala state.
    useEffect(() => {
        if (currentTheme) {
            setThemeState(currentTheme); // Om Redux-temat ändras, uppdatera lokalt state
        }
    }, [currentTheme]); // Denna effekt triggas när currentTheme ändras

    // Funktion för att radera alla inaktiva kort
    const handleDeleteInactive = () => {
        if (window.confirm("Vill du radera alla inaktiva kort?")) {
            dispatch(deleteInactiveCards()); // Skicka en action för att radera inaktiva kort från Redux
        }
    };

    // Funktion för att hantera ändringar i tema dropdown-menyn
    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value; // Hämta valt tema från select-elementet
        setThemeState(selectedTheme); // Uppdaterar det lokala temat i komponenten
    };

    // Funktion för att spara det valda temat till Redux
    const handleSaveChanges = () => {
        dispatch(setTheme(theme)); // Skicka valt tema till Redux
        alert("Theme saved!"); // Visar ett bekräftelsemeddelande
    };

    // Effekt för att uppdatera DOM när temat ändras. Den sätter `data-theme` på `<html>`-elementet.
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme); // Uppdatera DOM med det nya temat
    }, [theme]); // Denna effekt triggas varje gång temat ändras

    return (
        <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md mt-10 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <h2 className="text-xl font-bold mb-6 text-center text-black">Settings</h2>

            {/* Dropdown för att välja tema */}
            <label className="block text-lg font-semibold mb-4 text-black">
                Theme
                <select
                    value={theme} // Värdet i dropdown kommer från det lokala state: `theme`
                    onChange={handleThemeChange} // Uppdaterar temat när användaren väljer ett nytt alternativ
                    className="block w-full p-2 mt-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded"
                >
                    {/* Alternativ för olika teman */}
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                </select>
            </label>

            {/* Knapp för att spara ändringar */}
            <button
                onClick={handleSaveChanges} // Sparar det valda temat när knappen klickas
                className="block w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Save Changes
            </button>

            {/* Knapp för att radera alla inaktiva kort */}
            <button
                onClick={handleDeleteInactive} // Raderar inaktiva kort när knappen klickas
                className="block w-full p-2 mt-6 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Delete all inactive cards
            </button>
        </div>
    );
};
