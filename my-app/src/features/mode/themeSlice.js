// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("THEME_INFO") || "light";

const initialState = {
  theme: initialTheme, // Ladda från localStorage eller standard "light"
};

// Skapa en slice för temat
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      console.log("Setting time", action.payload);
      state.theme = action.payload; // Uppdaterar temat
    },
  },
});

// Exportera actions och reducer
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
