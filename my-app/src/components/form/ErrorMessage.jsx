// Definierar en funktionell komponent som heter ErrorMessage
export const ErrorMessage = ({ children }) => {
    return (
        // Returnerar ett <p> (paragraf) element för att visa felmeddelandet
        <p className="uppercase text-danger-600 text-xs font-bold mt-2 ">
            {/* Innehållet (children) som skickas till komponenten visas här */}
            {children}
        </p>
    );
};

// ErrorMessage-komponenten är en enkel och återanvändbar komponent som visar ett felmeddelande.
// Komponenten tar emot ett children-element som innehåller texten som ska visas som felmeddelande.
// Genom att använda denna komponent kan utvecklare enkelt visa felmeddelanden på sina formulär.
// Felmeddelandet visas i rött och med en mindre textstorlek för att tydligt markera att det är ett fel.
// Komponenten är utformad för att vara lätt att använda och anpassa för olika typer av felmeddelanden.
// Exporterar ErrorMessage som standard export