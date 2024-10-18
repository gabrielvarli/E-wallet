import { Link } from "react-router-dom"; // Importerar Link-komponenten från react-router-dom för att möjliggöra navigering mellan sidor.

export const NiceLink = ({ children, route, textSize }) => {
    // Definierar en funktionell komponent som tar emot tre props:
    // - children: innehållet som ska visas inom länken.
    // - route: måladressen som länken ska navigera till.
    // - textSize: en sträng som bestämmer storleken på texten.

    // Objekt som definierar olika textstorleksklasser baserat på det givna textSize-värdet.
    const textSizeClasses = {
        xs: "text-xs", // Extra small text
        sm: "",        // Small text (ingen specifik klass angiven)
        md: "text-md", // Medium text
        lg: "text-sm sm:text-lg", // Large text (small på mobila enheter, stor på större enheter)
        xl: "text-xl", // Extra large text
        xxl: "text-2xl sm:text-3xl", // Extra extra large text (2xl på mobila enheter, 3xl på större enheter)
    };

    // Hämtar den specifika textstorleksklassen baserat på props. Om ingen giltig textSize anges, används standardvärdet "xxl".
    const textSizeClass = textSizeClasses[textSize] || textSizeClasses["xxl"];

    // Komponentens renderingsdel
    return (
        <div className="relative"> {/* Wrapper för att möjliggöra positionering av eventuella element som kan behövas senare */}
            <Link
                to={route} // Navigerar till den angivna rutt
                className={`font-display max-w-sm font-bold leading-tight ${textSizeClass}`} // Använder Tailwind CSS-klasser för att styla länken
            >
                <span className="link link-underline link-underline-color uppercase">
                    {children} {/* Visar innehållet inuti länken */}
                </span>
            </Link>
        </div>
    );
};
// NiceLink-komponenten är en återanvändbar komponent som skapar en länk med en enhetlig stil för hela applikationen.
// NiceLink tillhandahåller en enhetlig stil för länkar i hela applikationen.
// NiceLink tar emot en route-prop som anger länkens mål och en textSize-prop som anger textstorleken.
