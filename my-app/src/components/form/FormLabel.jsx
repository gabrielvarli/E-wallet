export const FormLabel = ({ htmlFor, type, children }) => {
    return (
        <label
            htmlFor={htmlFor} // Anger vilket formulärfält etiketten är kopplad till
            className={` ${
                type === "radio" // Om typen är "radio" ska klassen "sr-only" användas
                    ? "sr-only " // Använder sr-only för att dölja etiketten visuell, men ändå göra den tillgänglig för skärmläsare
                    : "block uppercase text-xs font-bold mb-2" //  används vanliga klasser för att visa etiketten
            } `}
        >
            {children} 
        </label>
    );
};

// FormLabel-komponenten är en återanvändbar komponent som skapar etiketter för formulärfält.
// FormLabel-komponenten används för att skapa textetiketter som visas ovanför formulärfält.
// Genom att använda denna komponent kan utvecklare enkelt skapa etiketter för olika typer av formulärfält.
// FormLabel-komponenten tar emot props som htmlFor, type och children.
// Propsen används för att anpassa utseendet och beteendet hos etiketten.


