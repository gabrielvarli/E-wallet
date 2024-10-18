// import { configureStore } from "@reduxjs/toolkit";
// import cardsReducer from "../features/cards/cardsSlice"; // Importera från din nya cardsSlice-fil
// import modeReducer from "../features/mode/modeSlice";

// // Skapa store med konfiguration för reducerare
// const store = configureStore({
//   reducer: {
//     cards: cardsReducer,
//     darkMode: modeReducer,
//   },
// });

// // Prenumerera på ändringar i store för att lagra data i localStorage
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("CARD_INFO", JSON.stringify(state.cards));
// });

// // Exportera store för användning i applikationen
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../features/cards/cardsSlice";
import modeReducer from "../features/mode/modeSlice";
import themeReducer from "../features/mode/themeSlice"; // Importera din themeReducer

// Skapa store med konfiguration för reducerare
const store = configureStore({
  reducer: {
    cards: cardsReducer,
    darkMode: modeReducer,
    theme: themeReducer, // Lägg till themeReducer här
  },
});

// Prenumerera på ändringar i store för att lagra data i localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("CARD_INFO", JSON.stringify(state.cards));
  localStorage.setItem("THEME_INFO", state.theme.theme); // Spara valt tema i localStorage
});

// Exportera store för användning i applikationen
export default store;
