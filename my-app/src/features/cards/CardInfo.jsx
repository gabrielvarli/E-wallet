import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveCard, delCard } from "./cardsSlice"; // Importerar åtgärder för att aktivera och ta bort kort

// `CardInfo` är en funktionell komponent som visar och hanterar kortinformation
const CardInfo = ({ card, isActive }) => {
    const dispatch = useDispatch(); // Använder useDispatch för att skicka actions till Redux

    // Lokalt state för redigeringsläge och redigerad kortinformation
    const [editMode, setEditMode] = useState(false); // Håller reda på om användaren är i redigeringsläge
    const [editedCard, setEditedCard] = useState({ ...card }); // Kopierar kortets information till lokalt state

    // useEffect som körs när kortet ändras, för att uppdatera det lokala state
    useEffect(() => {
        setEditedCard({ ...card });
    }, [card]);

    // Hanterar inmatningsändringar när användaren redigerar kortet
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destrukturerar namnet och värdet från inmatningsfältet
        setEditedCard((prev) => ({
            ...prev, // Kopierar tidigare state
            [name]: value, // Uppdaterar det aktuella fältet
        }));
    };

    // Anropas för att aktivera kortet
    const handleActivateCard = () => {
        dispatch(setActiveCard(card.id)); // Skickar en action till Redux för att aktivera kortet
    };

    // Anropas för att ta bort kortet
    const handleDeleteCard = () => {
        if (window.confirm("Är du säker på att du vill radera detta kort?")) {
            dispatch(delCard(card.id)); // Skickar en action till Redux för att ta bort kortet
        }
    };

    // Om det inte finns någon kortinformation, visa ett meddelande
    if (!card) return <div>Ingen kortinformation tillgänglig.</div>;

    // Destrukturerar användarens förnamn och efternamn från kortets användarinformation
    const { user = {} } = editedCard; // Om `user` inte finns, sätt det till ett tomt objekt
    const { first = "Förnamn", last = "Efternamn" } = user; // Förinställ förnamn och efternamn om de inte finns

    return (
        <div className="p-4 border rounded shadow"> {/* Skapar en behållare med padding, border och skugga */}
            <h2 className="text-xl font-bold mb-4">Kortinformation</h2> {/* Titel för kortinformationen */}

            {isActive ? ( // Kollar om kortet är aktivt
                <div>
                    <p><strong>Kortnamn:</strong> {card.vendor || "Ingen leverantör"}</p> {/* Kortets leverantör */}
                    <p><strong>Kortnummer:</strong> {card.card_number || "XXXX XXXX XXXX XXXX"}</p> {/* Maskerat kortnummer */}
                    <p><strong>Utgångsdatum:</strong> {card.date || "XX/XX"}</p> {/* Utgångsdatum */}
                    <p><strong>CVC:</strong> {card.cvc || "XXX"}</p> {/* CVC-kod */}
                    <p><strong>Kortinnehavare:</strong> {`${first} ${last}`}</p> {/* Visar kortinnehavarens namn */}
                    <p>Detta kort är aktivt och kan inte redigeras eller raderas.</p> {/* Meddelande om att aktivt kort inte kan redigeras */}
                </div>
            ) : (
                <div>
                    {editMode ? ( // Kollar om användaren är i redigeringsläge
                        <div>
                            {/* Fält för att redigera kortnamn */}
                            <label>
                                Kortnamn:
                                <input
                                    type="text"
                                    name="vendor"
                                    value={editedCard.vendor}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                            </label>
                            {/* Fält för att redigera kortnummer */}
                            <label>
                                Kortnummer:
                                <input
                                    type="text"
                                    name="card_number"
                                    value={editedCard.card_number}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                            </label>
                            {/* Fält för att redigera utgångsdatum */}
                            <label>
                                Utgångsdatum:
                                <input
                                    type="text"
                                    name="date"
                                    value={editedCard.date}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                            </label>
                            {/* Fält för att redigera CVC */}
                            <label>
                                CVC:
                                <input
                                    type="text"
                                    name="cvc"
                                    value={editedCard.cvc}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                            </label>
                            {/* Fält för att redigera förnamn */}
                            <label>
                                Förnamn:
                                <input
                                    type="text"
                                    name="first"
                                    value={first}
                                    onChange={(e) =>
                                        setEditedCard((prev) => ({
                                            ...prev,
                                            user: { ...prev.user, first: e.target.value },
                                        }))
                                    }
                                    className="border p-2 rounded"
                                />
                            </label>
                            {/* Fält för att redigera efternamn */}
                            <label>
                                Efternamn:
                                <input
                                    type="text"
                                    name="last"
                                    value={last}
                                    onChange={(e) =>
                                        setEditedCard((prev) => ({
                                            ...prev,
                                            user: { ...prev.user, last: e.target.value },
                                        }))
                                    }
                                    className="border p-2 rounded"
                                />
                            </label>
                            {/* Knapp för att spara ändringar */}
                            <button
                                onClick={() => {
                                    dispatch(setActiveCard({ ...editedCard })); // Skickar uppdaterad kortinformation till Redux
                                    setEditMode(false); // Avslutar redigeringsläget
                                }}
                                className="mt-2 p-2 bg-blue-500 text-white rounded"
                            >
                                Spara ändringar
                            </button>
                        </div>
                    ) : (
                        <div>
                            {/* Visar kortinformation om det inte är i redigeringsläge */}
                            <p><strong>Kortnamn:</strong> {card.vendor || "Ingen leverantör"}</p>
                            <p><strong>Kortnummer:</strong> {card.card_number || "XXXX XXXX XXXX XXXX"}</p>
                            <p><strong>Utgångsdatum:</strong> {card.date || "XX/XX"}</p>
                            <p><strong>CVC:</strong> {card.cvc || "XXX"}</p>
                            <p><strong>Kortinnehavare:</strong> {`${first} ${last}`}</p>
                            {/* Knapp för att gå till redigeringsläge */}
                            <button
                                onClick={() => setEditMode(true)}
                                className="mt-2 p-2 bg-yellow-500 text-white rounded"
                            >
                                Redigera kort
                            </button>
                        </div>
                    )}

                    {/* Knapp för att aktivera kortet */}
                    <button
                        onClick={handleActivateCard}
                        className="mt-2 p-2 bg-green-500 text-white rounded"
                    >
                        Aktivera kort
                    </button>

                    {/* Knapp för att radera kortet */}
                    <button
                        onClick={handleDeleteCard}
                        className="mt-2 p-2 bg-red-500 text-white rounded"
                    >
                        Radera kort
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardInfo;
