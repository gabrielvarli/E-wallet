"use client"; 

import { Tooltip } from "flowbite-react";
import { useState, useEffect } from "react"; 
import { CreditCard } from "./CreditCard";
import { setActiveCard, delCard } from "./cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import CardInfo from "./CardInfo"; 
import { useNavigate } from "react-router-dom"; // Importera useNavigate för navigering

export const CardWrapper = ({ cards }) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // För navigering till redigeringssidan

    // Hämtar kortdata och användardata från Redux-tillståndet
    const { activeCard, cards: cardsArr, user } = useSelector((state) => state.cards);
    const { darkMode } = useSelector((state) => state.darkMode);

    // Hittar aktivt kort
    const activeCardComponent = cards?.find((card) => card.id === activeCard);
    // Filtrerar bort aktiva kort för att visa inaktiva
    const inactiveCards = cardsArr?.filter((card) => card.id !== activeCard);

    // Logga cardsArr när det uppdateras
    useEffect(() => {
        console.log("Updated cards array:", cardsArr);
    }, [cardsArr]);

    // Hanterar hovring av kort
    const handleCardHover = (cardId) => {
        setHoveredCard(cardId);
    };

    // Renderar kortinformationen
    const handleShowCardInfo = (card) => {
        return <CardInfo card={card} isActive={card.id === activeCard} />;
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
                <h2 className="font-poppins font-bold text-md uppercase mb-4">Active Card</h2>

                {/* Renderar det aktiva kortet om det finns */}
                {activeCardComponent ? (
                    <div key={activeCardComponent.id} className="mb-5">
                        <CreditCard {...activeCardComponent} user={user} />
                        {handleShowCardInfo(activeCardComponent)}
                    </div>
                ) : (
                    <p>No active card selected.</p>
                )}

                {/* Renderar rubrik för inaktiva kort om det finns fler än ett kort */}
                {inactiveCards.length > 0 && (
                    <h2 className={`font-bold text-md uppercase ${hoveredCard ? "mb-10" : "mb-4"}`}>
                        Inactive Cards
                    </h2>
                )}

                <div className="relative min-w-full h-full">
                    <div className="relative w-full h-fit">
                        {inactiveCards.map((card, index) => {
                            const cardStyle = {
                                position: "absolute",
                                top: `${index * 250}px`, // Ger mer avstånd mellan korten
                                left: "0px",
                                zIndex: `${card.id === hoveredCard ? 100 : 100 - index}`,
                            };

                            return (
                                <div
                                    key={card.id}
                                    className={`card relative w-full flex items-center ${card.id === hoveredCard ? "hovered" : ""}`}
                                    style={cardStyle}
                                    onMouseEnter={() => handleCardHover(card.id)}
                                    onMouseLeave={() => handleCardHover(null)}
                                >
                                    <div className="w-full absolute top-0 left-0 duration-300">
                                        {/* Klick på kortet aktiverar det */}
                                        <div
                                            className="opacity-100 min-w-full"
                                            onClick={() => dispatch(setActiveCard(card.id))} // Aktiverar kortet
                                        >
                                            <CreditCard {...card} user={user} />
                                        </div>

                                        {/* Redigera och radera knappar placerade vertikalt med mer till höger och avstånd mellan */}
                                        <div className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
                                            {/* Redigera knappen med hover tooltip */}
                                            <Tooltip
                                                content="Edit"
                                                animation="duration-500"
                                                style={darkMode ? "light" : "dark"}
                                            >
                                                <Button
                                                    type="primary"
                                                    onClick={() => navigate(`/card/${card.id}`)} // Navigera till redigeringssidan
                                                >
                                                    Edit
                                                </Button>
                                            </Tooltip>

                                            {/* Radera knappen */}
                                            <Tooltip
                                                content="Delete"
                                                animation="duration-500"
                                                style={darkMode ? "light" : "dark"}
                                            >
                                                <Button
                                                    type="tertiary"
                                                    aria={`Delete credit card with cc number ${card.card_number}`}
                                                    onClick={() => dispatch(delCard(card.id))}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="var(--color-danger-50)"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
