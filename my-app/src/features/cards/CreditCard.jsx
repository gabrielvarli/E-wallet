import chipSvg from "../../assets/icons/chip2.svg"; // Importerar ikonen för chippet
import signalSvg from "../../assets/icons/signal.svg"; // Importerar ikonen för signalen (kontaktlös betalning)
import {
    determineVendorSVG, // Funktion som returnerar rätt ikon för kortets leverantör (Visa, Mastercard, etc.)
    splitArrIntoChunks, // Funktion för att dela upp en array i mindre delar
    generateDisplayFormat, // Funktion som formaterar kortnummer eller CVC för visning
    formatDate, // Funktion för att formatera datum (giltighetsdatum)
    getGradientClass, // Funktion för att hämta rätt gradientklass för kortets utseende
} from "../../utils/helpers"; // Importerar hjälpfunktioner från utils/helpers

// Komponent som representerar ett kreditkort
export const CreditCard = ({
    date, // Datum för giltighetstid
    card_number, // Kortnummer
    vendor, // Kortleverantör (Visa, Mastercard, etc.)
    user: { first, last }, // Destrukturering av förnamn och efternamn från användaren
    useDisplayFormat = false, // Om vi ska visa kortnummer i displayformat (med mellanslag) eller ej
    gradient, // Gradientklass för kortets utseende
    cvc, // Kortets CVC-kod
}) => {
    // Formaterar kortnumret om `useDisplayFormat` är sant, annars delar det bara upp siffrorna i en array
    const formattedNumber = useDisplayFormat
        ? generateDisplayFormat(card_number, 16) // Formaterar som "XXXX XXXX XXXX XXXX"
        : card_number?.split(""); // Annars splittrar det kortnumret i en array av siffror

    // Formaterar CVC-koden på samma sätt som kortnumret
    const formattedCVC = useDisplayFormat
        ? generateDisplayFormat(cvc, 3) // Formaterar som "XXX"
        : cvc?.split("");

    // Formaterar datumet till ett visningsvänligt format, eller sätter det till "XX / XX" om inget datum finns
    const formattedDate = date ? formatDate(date) : "XX / XX";

    // Hämtar gradientklass från hjälpfunktionen beroende på vilket gradientval användaren har gjort
    const gradientClass = getGradientClass(gradient);

    return (
        <div className="group h-56 w-full  [perspective:1000px]"> {/* En wrapper med perspektiv för 3D-effekt */}
            <div className="relative  h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Detta är själva kortet, som har två sidor. Kortet snurrar 180 grader när man hovrar över det. */}
                <div
                    className={`absolute bg-gradient-25 ${gradientClass} text-[hsl(0,0%,95%)] w-full h-56 font-credit px-4 py-6 rounded-xl shadow-2xl max-w-md [backface-visibility:hidden]`}
                >
                    {/* Detta är framsidan av kortet */}
                    <div className="h-[65px]">
                        {/* Övre sektionen med signal- och leverantörsikoner */}
                        <div className="flex justify-between svg-icon">
                            <img src={signalSvg} alt="#" className="w-7 " /> {/* Ikon för kontaktlös betalning */}
                            {vendor && ( // Om det finns en leverantör, visa dess ikon
                                <img
                                    src={determineVendorSVG(vendor)} // Hämtar rätt ikon beroende på kortleverantör
                                    alt="#"
                                    className="h-7 "
                                />
                            )}
                        </div>
                        {/* Chip-ikon */}
                        <img src={chipSvg} alt="#" className="w-7 mb-3 mt-1" />
                    </div>
                    {/* Visar formaterat kortnummer i fyra grupper av fyra siffror */}
                    <p className="text-2xl flex gap-3">
                        {splitArrIntoChunks(formattedNumber, 4).map((chunk, i) => (
                            <span className="drop-shadow-credit" key={chunk + i}>
                                {chunk} {/* Visar varje siffergrupp */}
                            </span>
                        ))}
                    </p>
                    <div className="flex justify-between mt-6">
                        <div>
                            {/* Sektion för kortinnehavarens namn */}
                            <p className="uppercase text-xs font-bold drop-shadow-credit">Card holder name</p>
                            <p className="uppercase text-sm drop-shadow-credit">{first + " " + last}</p> {/* Visar för- och efternamn */}
                        </div>
                        <div>
                            {/* Sektion för giltighetstid */}
                            <p className="uppercase text-xs font-bold drop-shadow-credit">valid thru</p>
                            <p className="uppercase text-sm  text-end drop-shadow-credit">{formattedDate}</p> {/* Visar formaterat datum */}
                        </div>
                    </div>
                </div>

                {/* Baksidan av kortet (som visas när kortet roteras 180 grader vid hover) */}
                <div
                    className={`absolute bg-gradient-25 ${gradientClass} text-[hsl(0,0%,95%)] w-full h-56 font-credit px-4 py-6 rounded-xl shadow-2xl max-w-md [transform:rotateY(180deg)] [backface-visibility:hidden]`}
                >
                    {/* Sektion för att visa CVC-kod och kortinnehavarens namn på baksidan */}
                    <div className="bg-white text-text-low-contrast p-2 mt-4 flex justify-between items-end">
                        <p className="text-xl uppercase">{first + " " + last}</p> {/* Visar för- och efternamn */}
                        <p className="text-sm">{formattedCVC}</p> {/* Visar CVC-koden */}
                    </div>
                </div>
            </div>
        </div>
    );
};