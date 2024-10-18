import { createSlice } from "@reduxjs/toolkit";

// Funktion för att hämta tillstånd från localStorage
const getStateFromLocalStorage = () => {
  const localStorageItem = localStorage.getItem("CARD_INFO");
  return localStorageItem ? JSON.parse(localStorageItem) : {};
};

// Funktion för att spara tillstånd i localStorage
const saveStateToLocalStorage = (state) => {
  localStorage.setItem("CARD_INFO", JSON.stringify(state));
};

// En initial kortinformation med dummy-data
const initialCard = {
  cvc: "098",
  date: "2023-11-13",
  card_number: "1234567891234567",
  vendor: "Visa",
  id: crypto.randomUUID(), // Genererar ett unikt id för kortet
};

// Initialt tillstånd för korthanteringen
const initialState = {
  user: getStateFromLocalStorage()?.user || { first: "", last: "" },
  cards: getStateFromLocalStorage()?.cards || [initialCard],
  activeCard: getStateFromLocalStorage()?.activeCard || initialCard.id,
};

// Skapar en slice med reducer och actions
const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // Uppdaterar användarinformation
    setUser: (state, action) => {
      state.user = action.payload;
      saveStateToLocalStorage(state); // Spara i localStorage efter uppdatering
    },

    // Sätter ett kort som aktivt
    setActiveCard: (state, action) => {
      state.activeCard = action.payload;
      saveStateToLocalStorage(state); // Spara i localStorage efter uppdatering
    },

    // Lägg till ett nytt kort
    addCard: (state, action) => {
      state.cards.push(action.payload);
      saveStateToLocalStorage(state); // Spara i localStorage efter uppdatering
    },

    // Tar bort ett kort
    delCard: (state, action) => {
      const cardId = action.payload;
      state.cards = state.cards.filter((card) => card.id !== cardId);
      saveStateToLocalStorage(state); // Spara i localStorage efter uppdatering
    },

    // Uppdaterar ett befintligt kort
    updateCard: (state, action) => {
      const { id, ...updatedData } = action.payload;
      console.log("Updating card with id:", id); // Logga id för att se att det är rätt kort
      const index = state.cards.findIndex((card) => card.id === id);
      if (index !== -1) {
        // Uppdatera kortet med den nya informationen
        state.cards[index] = { ...state.cards[index], ...updatedData };
        console.log("Card successfully updated:", state.cards[index]); // Logga efter uppdatering
        saveStateToLocalStorage(state); // Spara i localStorage
      }
    },

    // Radera alla inaktiva kort
    deleteInactiveCards: (state) => {
      state.cards = state.cards.filter((card) => card.id === state.activeCard); // Bevara bara det aktiva kortet
      saveStateToLocalStorage(state); // Spara i localStorage efter uppdatering
    },
  },
});

// Exportera alla actions och reducer
export const {
  setUser,
  setActiveCard,
  addCard,
  delCard,
  updateCard,
  deleteInactiveCards,
} = cardSlice.actions;
export default cardSlice.reducer;
