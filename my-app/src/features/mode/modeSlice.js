// // Importerar createSlice från Redux Toolkit för att skapa en slice av Redux-state
// import { createSlice } from "@reduxjs/toolkit";
// // Importerar en hjälpfunktion för att kolla användarens mörka läge-inställning
// import { userPrefersDarkMode } from "../../utils/helpers";

// // Funktion som laddar mörkt läge från localStorage, om det finns
// const loadDarkModeFromLocalStorage = () => {
//   // Hämtar sparat läge från localStorage
//   const savedMode = localStorage.getItem("DARK_MODE");
//   // Om det finns ett sparat läge, returnera det som ett boolean; annars kolla användarens preferens
//   return savedMode ? JSON.parse(savedMode) : userPrefersDarkMode();
// };

// // Skapar en slice för mörkt läge med en reducer
// const modeSlice = createSlice({
//   name: "mode", // Namnet på slice
//   initialState: {
//     // Initialt tillstånd, laddar mörkt läge från localStorage eller användarens preferens
//     darkMode: loadDarkModeFromLocalStorage(),
//   },
//   reducers: {
//     // Reducer för att ändra mörkt läge
//     setMode: (state, action) => {
//       state.darkMode = action.payload; // Uppdaterar darkMode i state med payload
//       // Sparar det nya läget till localStorage
//       localStorage.setItem("DARK_MODE", JSON.stringify(action.payload));
//     },
//   },
// });

// // Exporterar setMode-åtgärden för att kunna användas i andra delar av applikationen
// export const { setMode } = modeSlice.actions;

// // Exporterar reducer för att kunna användas i store
// export default modeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Funktion som laddar temat från localStorage
const loadThemeFromLocalStorage = () => {
  const savedTheme = localStorage.getItem("THEME");
  return savedTheme ? savedTheme : "light"; // Default-tema är "light"
};

// Skapar en slice för tema
const modeSlice = createSlice({
  name: "mode",
  initialState: {
    theme: loadThemeFromLocalStorage(), // Ladda tema från localStorage
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload; // Uppdatera temat i state
      localStorage.setItem("THEME", action.payload); // Spara temat i localStorage
    },
  },
});

// Exportera åtgärden för att byta tema
export const { setTheme } = modeSlice.actions;

export default modeSlice.reducer;
