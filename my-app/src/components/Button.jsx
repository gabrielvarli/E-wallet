export const Button = ({ onClick, type, children, disabled, aria }) => {
    // Definierar en funktionell komponent som tar emot följande props:
    // - onClick: en funktion som anropas när knappen klickas på.
    // - type: typ av knappen (t.ex. primary, secondary, etc.) som bestämmer dess stil.
    // - children: innehållet inuti knappen (t.ex. text eller ikoner).
    // - disabled: en boolean som anger om knappen ska vara inaktiverad.
    // - aria: en sträng för att ge tillgänglighetsinformation (aria-label).

    // Grundläggande klasser för knappen som används i alla typer.
    let buttonClasses = "uppercase font-bold text-sm rounded w-max ";

    // Beroende på typ av knapp läggs olika klasser till för att styla knappen.
    switch (type) {
        case "primary":
            // Klasser för en primär knapp med gradientbakgrund.
            buttonClasses +=
                " py-2 px-4 text-white bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 active:from-primary-600 active:to-primary-800 focus:from-primary-600 focus:to-primary-800 focus:outline-none focus:ring focus:ring-primary-300";
            break;
        case "secondary":
            // Klasser för en sekundär knapp med en kantlinje.
            buttonClasses +=
                "py-2 px-4 border-2 border-primary-800 text-primary-800 hover:bg-primary-100 active:bg-primary-100 focus:bg-primary-10 focus:outline-none focus:ring focus:ring-primary-400";
            break;
        case "tertiary":
            // Klasser för en tertiär knapp med rundad form.
            buttonClasses += "rounded-full text-text-default hover:scale-125 ";
            break;
        case "danger-primary":
            // Klasser för en knapp med en "danger"-stil.
            buttonClasses +=
                " py-2 px-4 border-2 border-danger-500 text-danger-500 hover:bg-danger-100 active:bg-danger-100 focus:bg-danger-100 focus:outline-none focus:ring focus:ring-danger-300";
            break;
        default:
            // Inga specifika klasser läggs till om ingen matchande typ anges.
            break;
    }

    // Om knappen är inaktiverad, läggs klasser till för att styra stil och interaktion.
    if (disabled) {
        buttonClasses += " opacity-50 cursor-not-allowed "; // Sänker opaciteten och visar att knappen är inaktiv.
    }

    // Returnerar en <button>-komponent med de angivna egenskaperna.
    return (
        <button
            onClick={onClick} // Sätter onClick-händelsen till den angivna funktionen.
            className={buttonClasses} // Använder de sammansatta klasserna för styling.
            disabled={disabled} // Ställer in knappen som inaktiverad om disabled är true.
            aria-label={aria} // Ger tillgänglighetsinformation för skärmläsare.
        >
            {children} {/* Visar innehållet inuti knappen */}
        </button>
    );
};

// Button-komponenten är en återanvändbar komponent som skapar en knapp med olika stilar beroende på den angivna typen.
//Button-komponenten är en flexibel och återanvändbar komponent som låter utvecklaren enkelt skapa knappar med olika stilar och funktionalitet. 
//Genom att använda props kan knappen anpassas för olika användningsfall, vilket gör den mångsidig och lätt att underhålla.