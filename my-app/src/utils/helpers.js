// Importerar logofiler för olika kortleverantörer
import amex from "./../assets/logos/amex.svg";
import mastercard from "./../assets/logos/mastercard.png";
import visa from "./../assets/logos/visa.svg";

// Importerar månader och gradient-mappningar från en konfigurationsfil
import { months, gradientMappings } from "../config/config";

// Funktion för att hämta klassnamn för bakgrundsgradient beroende på valt alternativ
export const getGradientClass = (selectedGradient) => {
  // Om inget val är gjort, returnera standardgradienten
  if (!selectedGradient) return gradientMappings["gradient-default"];

  // Returnerar klassnamn för den valda gradienten
  return gradientMappings[selectedGradient];
};

// Funktion för att blockera ogiltiga tecken i en sträng, tillåter bara siffror
export const blockInvalidChar = (string) => {
  // Ersätter alla icke-siffror med en tom sträng (rensar strängen)
  const cleansedValue = string.replace(/\D/g, ""); // \D betyder "allt som inte är en siffra"
  return cleansedValue;
};

// Funktion för att dela upp en array i mindre chunkar (delar)
export const splitArrIntoChunks = (arr, chunkSize) => {
  if (!arr) return []; // Om arrayen är tom, returnera en tom array

  // Reducerar arrayen till en array av chunkar
  const resultArray = arr.reduce((acc, curr, i) => {
    const index = Math.floor(i / chunkSize); // Hitta rätt index för chunken
    if (!acc[index]) {
      acc[index] = []; // Skapa en ny chunk om den inte finns
    }
    acc[index].push(curr); // Lägg till nuvarande element i chunken
    return acc;
  }, []); // Börja med en tom array

  return resultArray; // Returnerar den uppdelade arrayen
};

// Funktion för att generera format för visning av data, fyller på med "X" om arrayen är för kort
export const generateDisplayFormat = (inputArray, maxLength, chunkNum) => {
  const arr = inputArray ? [...inputArray] : []; // Skapar en kopia av arrayen eller en tom array
  while (arr.length < maxLength) {
    arr.push("X"); // Fyller på med "X" tills arrayen når maximal längd
  }
  // Om chunkNum är satt, dela arrayen i delar om 4 element
  if (chunkNum) return splitArrIntoChunks(arr, 4);
  return arr; // Returnera arrayen utan chunkning om chunkNum inte är satt
};

// Funktion för att hämta rätt SVG för ett givet kortvarumärke
export const determineVendorSVG = (vendor) => {
  // Switch-sats för att returnera rätt logotyp baserat på kortleverantör
  switch (vendor) {
    case "Amex":
      return amex; // Returnerar Amex-logotyp
    case "Visa":
      return visa; // Returnerar Visa-logotyp
    case "MasterCard":
      return mastercard; // Returnerar MasterCard-logotyp
    default:
      return null; // Returnerar null om inget matchar
  }
};

// Funktion för att formatera ett datum till formatet "månad / år"
export const formatDate = (inputDate) => {
  const date = new Date(inputDate); // Skapar ett datumobjekt från inmatat datum
  const month = months[date.getMonth()]; // Hämtar månadens namn baserat på månadens index
  const year = date.getFullYear(); // Hämtar årtalet

  return `${month} / ${year}`; // Returnerar formaterat datum som "månad / år"
};

// Funktion för att kontrollera om ett datum (d1) har passerat i förhållande till ett annat datum (d2)
export const hasDatePassed = (d1, d2) => {
  // Skapar nya datum utan tidsinformation (endast datumdelen)
  return new Date(d1.toDateString()) < new Date(d2.toDateString()); // Returnerar true om d1 är tidigare än d2
};

// Funktion för att kolla om användaren föredrar mörkt läge (dark mode)
export const userPrefersDarkMode = () => {
  if (window.matchMedia) {
    // Kollar om webbläsaren stödjer matchMedia
    // Om användaren har satt sitt system till "dark mode"
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true; // Returnerar true om mörkt läge är aktiverat
    }
  }
  return false; // Returnerar false om mörkt läge inte är aktiverat
};
