// Importerar axios för att kunna göra HTTP-förfrågningar
import axios from "axios";

// Skapar en instans av axios för att konfigurera anpassade HTTP-förfrågningar
export const api = axios.create();

// Funktion som gör ett GET-anrop till ett givet API-endpoint (route) med valfria parametrar
export const fetchData = async (route, params) => {
  try {
    // Gör ett GET-anrop med den angivna rutten och parametrarna
    const res = await api.get(route, { params });

    // Om statuskoden inte är 200 (vilket innebär att anropet lyckades), kastar ett fel
    if (res.status !== 200) throw new Error();

    // Returnerar ett objekt med "acknowledged: true" och den data som kom tillbaka från servern
    return {
      acknowledged: true,
      data: res.data,
    };
  } catch (error) {
    // Hantering av fel som inträffar under API-anropet
    // todo: Det finns en kommentar om att hanteringen av fel kan behöva förbättras (detta kan vara loggning eller felmeddelanden till användaren)
    console.log(error); // Skriver ut felet till konsolen för debugging

    // Returnerar ett objekt som indikerar att anropet misslyckades med "acknowledged: false" och skickar tillbaka felinformationen
    return {
      acknowledged: false,
      error,
    };
  }
};
