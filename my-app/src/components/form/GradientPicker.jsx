import { FormLabel } from "./FormLabel"; // Importerar FormLabel-komponenten för att visa etiketter på formulärfält.
import { FormInput } from "./FormInput"; // Importerar FormInput-komponenten för att skapa inmatningsfält.

export const GradientPicker = ({
    formData, // Objekt som håller den aktuella data från formuläret.
    onChange, // Funktion som anropas när värdet i ett inmatningsfält ändras.
    id, // Unikt identifierare för komponenten.
    label, // Textetikett som visas ovanför inmatningsfälten.
    type, // Typ av inmatningsfält (t.ex. radio).
    name, // Namnet på inmatningsfältet, används för att identifiera data i formData.
    required, // Boolean som anger om fältet är obligatoriskt.
    options = [], // Lista med alternativ som ska visas som inmatningsfält.
}) => {
    return (
        <div key={id}> {/* Wrapper för hela komponenten, med unikt nyckel-id */}
            <FormLabel>{label}</FormLabel> {/* Visar etiketten för fältet */}
            <div className="flex gap-10"> {/* Flexbox-layout för att arrangera inmatningsfälten horisontellt */}
                {options.map((option) => {
                    return (
                        <FormInput
                            key={option} // Unik nyckel för varje inmatningsfält baserat på alternativet
                            type={type} // Typ av inmatningsfält (t.ex. radio)
                            value={option} // Värdet för det aktuella alternativet
                            name={name} // Namnet på inmatningsfältet för att hålla data
                            label={option} // Textetikett för det aktuella alternativet
                            required={required} // Anger om fältet är obligatoriskt
                            checked={formData[name] === option} // Kontrollerar om detta alternativ är valt baserat på formData
                            onChange={onChange} // Funktion som anropas när användaren gör en ändring
                        />
                    );
                })}
            </div>
        </div>
    );
};

// Denna komponent renderar en grupp av inmatningsfält baserat på en lista med alternativ.
// Används för att låta användaren välja ett alternativ från en lista.
// Använder FormLabel och FormInput för att skapa etiketter och inmatningsfält.
// Tar emot props som formData, onChange, id, label, type, name, required och options.
// Använder en flexbox-layout för att arrangera inmatningsfälten horisontellt.
// Skapar ett inmatningsfält för varje alternativ i listan med options.
// Kontrollerar vilket alternativ som är valt baserat på formData och uppdaterar det vid ändring.
