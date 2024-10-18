import { Form } from "../components/form/Form"; // Importerar Form-komponenten för att hantera inmatningsformuläret
import { CreditCard } from "../features/cards/CreditCard"; // Importerar CreditCard-komponenten för att förhandsvisa kortet
import { useState } from "react"; // React hook för att hantera lokalt state
import { useSelector, useDispatch } from "react-redux"; // Används för att hämta tillstånd från Redux och skicka åtgärder
import { useNavigate } from "react-router-dom"; // För att navigera användaren till andra sidor
import { addCard } from "../features/cards/cardsSlice"; // Importerar action för att lägga till ett nytt kort

export const AddCard = () => {
    const dispatch = useDispatch(); // Används för att skicka åtgärder till Redux
    const navigate = useNavigate(); // Används för att navigera tillbaka till startsidan

    // Hämta användarens förnamn och efternamn från Redux
    const { user: { first, last }, cards } = useSelector((state) => state.cards);

    // Lokalt state för att hantera formulärdata (kortnummer, CVC, utgångsdatum, leverantör och gradient)
    const [formData, setFormData] = useState({
        card_number: "",
        cvc: "",
        date: "",
        vendor: "",
        gradient: "gradient-default", // Standardgradient
    });

    // Lokalt state för att spåra om utgångsdatumet har passerat
    const [isDatePassed, setIsDatePassed] = useState(false);

    // Hantera förändringar i formulärfält
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Extrahera namn och värde från eventet
        setFormData((prevData) => ({
            ...prevData, // Kopiera tidigare formData
            [name]: value, // Uppdatera det ändrade fältets värde
        }));
    };

    // Hantering av formulärens inlämning
    const handleSubmit = (e) => {
        e.preventDefault(); // Förhindra standardinlämning av formuläret
        if (isDatePassed) { // Kontrollera om utgångsdatumet har passerat
            alert("The expiration date has passed."); // Visa ett varningsmeddelande
            return; // Stoppa vidare bearbetning
        }

        // Skapa ett nytt kortobjekt baserat på formulärets data
        const newCardObj = {
            ...formData, // Kopiera all formData
            id: crypto.randomUUID(), // Generera ett unikt ID för kortet
        };

        dispatch(addCard(newCardObj)); // Skicka kortet till Redux store via addCard-action
        navigate("/"); // Navigera tillbaka till startsidan efter att kortet lagts till
    };

    return (
        <div className="flex flex-col items-center lg:flex-row gap-10 md:justify-center">
            {/* Kontrollera om användaren redan har fyra kort */}
            {cards.length >= 4 ? (
                <>
                    <p>Du har nått din gräns för fyra kreditkort. Du måste ta bort ett kort innan du lägger till ett annat.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => navigate("/")} // Navigera tillbaka till startsidan
                    >
                        Back to Cards
                    </button>
                </>
            ) : (
                <>
                    <div className="w-full max-w-md">
                        {/* Förhandsvisning av kreditkortet */}
                        {/* FormData skickas till CreditCard-komponenten och uppdateras dynamiskt när användaren fyller i formuläret */}
                        <CreditCard {...formData} user={{ first, last }} useDisplayFormat={true} />
                    </div>
                    
                    {/* Form-komponenten hanterar användarens inmatningar */}
                    <Form
                        handleSubmit={handleSubmit} // Skickar formuläret när användaren trycker på submit
                        onChange={handleInputChange} // Uppdaterar formData när användaren skriver i fälten
                        formData={formData} // Skickar den nuvarande formData till Form-komponenten
                        setIsDatePassed={setIsDatePassed} // Uppdaterar om utgångsdatumet har passerat
                        isDatePassed={isDatePassed} // Skickar om utgångsdatumet har passerat
                        setFormData={setFormData} // Skickar funktionen för att uppdatera formData
                    />
                </>
            )}
        </div>
    );
};
