// Importerar FormLabel-komponenten för att använda som etikett för dropdown-menyn
import { FormLabel } from "./FormLabel";

// Definierar en funktionell komponent som heter DropDown
export const DropDown = ({ optionsObj, isReq, onChange }) => {
    // Destrukturerar optionsObj för att hämta filter och arr
    const { filter, arr } = optionsObj;

    return (
        <div>
            {/* Använder FormLabel för att visa en etikett för dropdown-menyn */}
            <FormLabel htmlFor={`filterBy${filter}`}>
                Choose {filter}:
            </FormLabel>

            <select
                // Namnet på dropdown-menyn sätts till filter
                name={filter}
                id={`filterBy${filter}`} // Skapar ett unikt id för dropdown
                className="border-0 rounded-md bg-elem_bg py-1 px-2 sm:py-2 sm:px-4 w-full text-text-default text-sm shadow-md focus:outline-none focus:ring focus:ring-primary-600"
                // Anropar onChange-funktionen när användaren väljer ett alternativ
                onChange={onChange}
                required={isReq} // Sätter required-attributet baserat på isReq
            >
                {/* Standardval för dropdown */}
                <option key={"all"} value="">
                    All
                </option>
                {/* Loopar genom arr och skapar ett option-element för varje alternativ */}
                {arr.map((opt, index) => {
                    return <option key={opt + index}>{opt}</option>;
                })}
            </select>
        </div>
    );
};

// DropDown-komponenten är en enkel och återanvändbar komponent som används för att skapa en dropdown-meny med alternativ som definieras av en array. 
//Den använder FormLabel för att ge en tydlig etikett, och den stödjer både validering (kräver att ett val görs) och anpassade eventhanterare. 
//Komponentens struktur och stil gör den lätt att integrera i olika formulär.