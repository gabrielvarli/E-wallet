import { useParams, useNavigate } from "react-router-dom"; // För att hämta kortets ID från URL och navigera
import { useSelector, useDispatch } from "react-redux"; // För att hämta och skicka åtgärder till Redux
import { useEffect, useState } from "react"; // Används för att hantera livscykel och lokalt state
import { updateCard, delCard, setActiveCard } from "./cardsSlice"; // Importerar åtgärder för att uppdatera, radera och aktivera kort
import { CreditCard } from "./CreditCard"; // Importerar CreditCard-komponenten för förhandsvisning
import { hasDatePassed, blockInvalidChar } from "../../utils/helpers"; // Importerar hjälpfunktioner för att validera datum och blockera ogiltiga tecken
import { FormInput } from "../../components/form/FormInput"; // Importerar komponent för formulärinmatning
import { GradientPicker } from "../../components/form/GradientPicker"; // Importerar komponent för att välja gradient
import { DropDown } from "../../components/form/DropDown"; // Importerar komponent för dropdown
import { Button } from "../../components/Button"; // Importerar komponent för knappar
import { inputs, cardVendors } from "../../config/config"; // Importerar konfiguration för inmatningsfält och kortleverantörer
import { setUser } from "./cardsSlice"; // Importerar action för att uppdatera användarens namn i Redux

// EditCard-komponenten
export const EditCard = () => {
    const { cardId } = useParams(); // Hämta kortets ID från URL:en
    const navigate = useNavigate(); // För att navigera till andra sidor
    const { cards, user } = useSelector((state) => state.cards); // Hämta kortlistan och användardata från Redux
    const { darkMode } = useSelector((state) => state.darkMode); // Hämta mörkt läge-värdet från Redux
    const dispatch = useDispatch(); // För att skicka åtgärder till Redux

    // Lokalt state för formulärdata
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        card_number: '',
        cvc: '',
        expireDate: '',
        vendor: '',
        gradient: ''
    });

    // Lokalt state för att spåra om datumet har passerat
    const [isDatePassed, setIsDatePassed] = useState(false);

    // Hämta kortet som ska redigeras från listan över kort
    const cardToEdit = cards.find((card) => card.id === cardId);

    // useEffect för att fylla i formulärdata när kortet laddas
    useEffect(() => {
        if (cardToEdit) {
            setFormData({
                firstName: cardToEdit.firstName,
                lastName: cardToEdit.lastName,
                card_number: cardToEdit.card_number,
                cvc: cardToEdit.cvc,
                expireDate: cardToEdit.expireDate,
                vendor: cardToEdit.vendor,
                gradient: cardToEdit.gradient
            });
        }
    }, [cardToEdit]);

    // Hantera förändringar i formulärfälten
    const onChange = (e) => {
        const { name, value, type } = e.target;

        // Hantering av datumfältet
        if (name === "expireDate" && type === "date") {
            const pickedDate = new Date(value);
            const currentDate = new Date();
            setIsDatePassed(hasDatePassed(pickedDate, currentDate)); // Kontrollera om datumet har passerat

            setFormData((prevData) => ({ ...prevData, [name]: value }));
            return;  
        }

        // Hantering av textfält och blockering av ogiltiga tecken för numeriska fält
        if (type === "text") {
            const inputConfig = inputs.find((input) => input.name === name);
            const newValue = inputConfig?.numericOnly ? blockInvalidChar(value) : value;

            // Blockera ogiltiga tecken för kortnummer och CVC
            if (name === "card_number" || name === "cvc") {
                const isNumeric = /^[0-9]*$/; 
                if (!isNumeric.test(newValue) && newValue !== "") {
                    return;
                }
            }

            // Uppdatera användarnamn i Redux om fältet är förnamn eller efternamn
            if (name === "firstName") {
                dispatch(setUser({ ...user, first: newValue }));
            }
            if (name === "lastName") {
                dispatch(setUser({ ...user, last: newValue }));
            }

            setFormData((prevData) => ({ ...prevData, [name]: newValue }));
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Hantera när användaren sparar ändringar i kortet
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCard({ id: cardId, ...formData })); // Skickar uppdaterade kortuppgifter till Redux
        navigate("/"); // Navigera tillbaka till startsidan efter att kortet uppdaterats
    };

    // Hantera radering av kortet
    const handleDelete = () => {
        dispatch(delCard(cardId)); // Skickar radering av kortet till Redux
        navigate("/"); // Navigera tillbaka till startsidan efter att kortet raderats
    };

    // Hantera aktivering av kortet
    const handleActivate = () => {
        dispatch(setActiveCard(cardId)); // Skickar aktivering av kortet till Redux
        navigate("/"); // Navigera tillbaka till startsidan efter att kortet aktiverats
    };

    return (
        <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-400 text-gray-900"} border border-gray-300`}>
            <div className="flex justify-between mb-6">
                <button 
                    onClick={handleActivate}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Activate card
                </button>
                <button 
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                    Delete card
                </button>
            </div>

            <h2 className="text-xl font-bold text-center mb-4">Edit Card</h2>

            {/* Förhandsvisning av CreditCard */}
            <div className="mb-6">
                <CreditCard
                    date={formData.expireDate}
                    card_number={formData.card_number}
                    vendor={formData.vendor}
                    user={{
                        first: formData.firstName,
                        last: formData.lastName
                    }}
                    cvc={formData.cvc}
                    gradient={formData.gradient}
                    useDisplayFormat={true} // Visa formaterat kortnummer och CVC
                />
            </div>

            {/* Formulär för att redigera kort */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName || ''} // Fyller i förnamnet från state
                    onChange={onChange}
                    required={true} // Anger att fältet är obligatoriskt
                />

                <FormInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName || ''} // Fyller i efternamnet från state
                    onChange={onChange}
                    required={true} // Anger att fältet är obligatoriskt
                />

                {/* Genererar de övriga fälten från config */}
                {inputs.map((input) => (
                    input.name === "gradient" ? (
                        <GradientPicker
                            key={input.name}
                            {...input}
                            formData={formData}
                            onChange={onChange}
                        />
                    ) : (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={formData[input.name] || ''}
                            onChange={onChange}
                            valid={input.name === "expireDate" ? !isDatePassed : undefined} // Validerar om datumet inte har passerat
                            required={input.required}
                        />
                    )
                ))}

                <DropDown
                    label="Card Vendor"
                    name="vendor"
                    value={formData.vendor || ''}
                    optionsObj={{ filter: "vendor", arr: cardVendors }} // Skickar leverantörslistan till dropdown-komponenten
                    isReq={true}
                    onChange={onChange}
                />

                {/* Save changes-knappen */}
                <div className="mt-4 self-center">
                    <Button type="submit" variant="primary">
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    );
};
