import { useEffect, useState } from "react"; // Kombinerar importerna av useEffect och useState
import { ErrorMessage } from "./ErrorMessage"; // Importerar ErrorMessage-komponenten för att visa felmeddelanden
import { FormLabel } from "./FormLabel"; // Importerar FormLabel-komponenten för att skapa etiketter för inmatningsfält
import { getGradientClass } from "../../utils/helpers"; // Importerar en hjälpfunktion för att hämta gradientklasser

export const FormInput = (props) => {
    // Definierar komponenten FormInput och tar emot props som argument
    const [blur, setBlur] = useState(false); // Tillstånd för att spåra om inputfältet har blivit suddigt
    const [showError, setShowError] = useState(false); // Tillstånd för att spåra om ett felmeddelande ska visas

    // Destrukturerar props för att hämta specifika värden
    const {
        type,
        valid,
        label,
        errorMessage,
        onChange,
        numericOnly,
        ...inputProps // Sprider resten av props till inputfältet
    } = props;

    const handleBlur = () => {
        setBlur(true); // Sätter blur till true när inputfältet förlorar fokus
    };

    useEffect(() => {
        setShowError(false); // Återställ felmeddelandet varje gång blur eller valid ändras

        if (inputProps.pattern && inputProps.value) {
            // Kollar om det finns ett mönster (regex) definierat och ett värde
            const pattern = new RegExp(inputProps.pattern);
            if (blur && !pattern.test(inputProps.value)) {
                // Om inputfältet har blivit suddigt och värdet inte matchar mönstret
                setShowError(true); // Visa felmeddelande
            }
        }
        if (blur && valid === false) {
            // Om inputfältet har blivit suddigt och valid är false
            setShowError(true); // Visa felmeddelande
        }
    }, [blur, valid, inputProps.value, inputProps.pattern]); // Kör denna effekt när blur, valid, värdet av inputProps eller mönstret förändras

    const handleChange = (event) => {
        const { value } = event.target; // Hämta värdet från inputfältet

        if (numericOnly && isNaN(value) && value !== "") {
            // Om numericOnly är true och värdet inte är ett giltigt nummer
            event.preventDefault(); // Blockera ogiltiga inmatningar
            return; // Avbryt funktionen
        }

        onChange(event); // Anropa onChange prop för att uppdatera värdet i den överordnade komponenten
    };

    return (
        <div className="formInput"> {/* Wrapper-div för inputfältet */}
            <FormLabel htmlFor={inputProps.id} type={type}> {/* Skapar en etikett för inputfältet */}
                {label} {/* Innehållet i etiketten */}
            </FormLabel>
            <input
                className={`${
                    blur
                        ? "invalid:border-danger-600 invalid:text-danger-600 focus:invalid:border-danger-600 focus:invalid:ring-danger-600" // Om suddig, använd röd färg för fel
                        : ""
                } ${
                    type === "radio"
                        ? "text-primary-600 bg-gradient-25 sm:w-5 sm:h-5 checked:bg-primary-600 " +
                          getGradientClass(label) // Använd gradientklasser för radio-knappar
                        : "rounded-md w-full py-1 px-2 sm:py-2 sm:px-4" // Standardstil för andra typer
                } uppercase border-0 bg-elem_bg text-text-default text-sm shadow-md disabled:opacity-50 focus:outline-none focus:ring focus:ring-primary-600`} // Ytterligare stil för inputfältet
                {...inputProps} // Sprider resten av props till inputfältet
                type={type} // Typ av inputfältet (text, radio, etc.)
                maxLength={inputProps.maxLength} // Sätter max längd för inputfältet
                onBlur={handleBlur} // Hantera blur-händelsen
                onChange={handleChange} // Använd handleChange för att hantera input
            />
            {showError && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Visa felmeddelande om showError är true */}
        </div>
    );
};

// // FormInput-komponenten är en återanvändbar komponent som skapar ett inmatningsfält för formulär.
// // FormInput-komponenten tar emot props som type, valid, label, errorMessage, onChange och numericOnly.
// // Komponenten använder useState och useEffect för att hantera tillstånd och sidoeffekter.
// // FormInput-komponenten innehåller ett input-element med etikett och felhantering.
// // Om inputfältet har blivit suddigt och värdet inte matchar mönstret, visas ett felmeddelande.
// // Om numericOnly är true, tillåts endast numeriska inmatningar.
// // FormInput-komponenten är en flexibel och återanvändbar komponent för att skapa inmatningsfält i formulär.

