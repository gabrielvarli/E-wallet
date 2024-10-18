// En array som innehåller namnen på månaderna i kortformat
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// En array som innehåller de godkända kortleverantörerna (vendors)
export const cardVendors = ["Amex", "Visa", "MasterCard"];

// En objekt som mappar gradientnamn till specifika Tailwind CSS-klasser
export const gradientMappings = {
  "gradient-default": "from-grey-300 to-grey-600", // Standardgradient
  "gradient-1": "from-danger-400 to-violet-500", // Gradient 1
  "gradient-2": "from-blue-500 to-green-300", // Gradient 2
  "gradient-3": "from-yellow-300 to-pink-500", // Gradient 3
  "gradient-4": "from-teal-300 to-emerald-500", // Gradient 4
};

// Hämtar en array av alla gradientnycklar från gradientMappings
const gradientOpt = Object.keys(gradientMappings);

// En array av inputobjekt som definierar olika formulärfält för kreditkortsdata
export const inputs = [
  {
    id: crypto.randomUUID(), // Genererar ett unikt ID för fältet
    name: "card_number", // Namn på fältet
    type: "text", // Typ av fält
    placeholder: "XXXX XXXX XXXX XXXX", // Platsinnehåll i fältet
    errorMessage: "Card number must be 16 digits.", // Felmeddelande om ogiltigt kortnummer
    label: "Card Number", // Etikett för fältet
    maxLength: 16, // Maximal längd för input
    pattern: "[0-9]{16}", // Regex-mönster för att validera kortnummer
    required: true, // Anger att fältet är obligatoriskt
    numericOnly: true, // Anger att endast numeriska tecken är tillåtna
  },
  {
    id: crypto.randomUUID(), // Genererar ett unikt ID för fältet
    name: "cvc", // Namn på fältet
    type: "text", // Typ av fält
    placeholder: "XXX", // Platsinnehåll i fältet
    errorMessage: "CVC must be 3 digits.", // Felmeddelande om ogiltig CVC
    pattern: "[0-9]{3}", // Regex-mönster för att validera CVC
    maxLength: 3, // Maximal längd för input
    label: "CVC", // Etikett för fältet
    required: true, // Anger att fältet är obligatoriskt
    numericOnly: true, // Anger att endast numeriska tecken är tillåtna
  },
  {
    id: crypto.randomUUID(), // Genererar ett unikt ID för fältet
    name: "date", // Namn på fältet
    type: "date", // Typ av fält (datum)
    errorMessage: "Date can't have passed.", // Felmeddelande om ogiltigt datum
    placeholder: "date", // Platsinnehåll i fältet
    required: true, // Anger att fältet är obligatoriskt
    label: "Date", // Etikett för fältet
  },
  {
    id: crypto.randomUUID(), // Genererar ett unikt ID för fältet
    name: "gradient", // Namn på fältet
    type: "radio", // Typ av fält (radioknappar)
    errorMessage: "Please select a gradient", // Felmeddelande om ingen gradient är vald
    label: "Select Gradient", // Etikett för fältet
    options: gradientOpt, // Alternativ för gradienter, hämtas från gradientMappings
    required: true, // Anger att fältet är obligatoriskt
  },
];

// En funktion som validerar kortnummer
// Tar ett kortnummer som argument och returnerar sant om det är giltigt, annars falskt

// Globally Unique Identifier (GUID): UUIDs är designade för att vara unika över tid och rum.
// Att använda crypto.randomUUID() garanterar att varje genererad ID är unik, vilket minimerar risken för kollisioner (två eller flera objekt som får samma ID).
