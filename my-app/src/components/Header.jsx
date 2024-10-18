// // Importerar ToggleDarkMode komponenten för att hantera mörkt läge
// import { ToggleDarkMode } from "../features/mode/ToggleDarkMode";
// // Importerar NiceLink komponenten för att skapa stiliga länkar
// import { NiceLink } from "./NiceLink";

// // Header komponent som tar emot en användarobjekt som props
// export const Header = ({ user: { first } }) => {
//     return (
//         // Header-elementet med padding och bakgrundsgradient
//         <header className="p-3 bg-gradient-to-b from-transparent-0 to-bkg text-text-default">
//             <div className="flex justify-between items-center md:items-end max-w-7xl m-auto">
//                 <div
//                     className={`${
//                         // Om "first" (förnamn) inte finns, sätt bredden till 70px
//                         !first ? "w-[70px]" : ""
//                     } flex items-center gap-2 text-md sm:text-lg font-bold tracking-tight`}
//                 >
//                     {/* Komponent för att växla mörkt läge */}
//                     <ToggleDarkMode></ToggleDarkMode>

//                     {first && ( // Om "first" finns (användaren är inloggad)
//                         <>
//                             {/* Ikon för användarens profil */}
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={2}
//                                 stroke="currentColor"
//                                 className="w-5 h-5 sm:w-6 sm:h-6"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
//                                 />
//                             </svg>
//                             {/* Visar användarens förnamn */}
//                             <p className="text-sm sm:text-lg">{first}</p>
//                         </>
//                     )}
//                 </div>
//                 {/* Länk till startsidan med stil från NiceLink */}
//                 <NiceLink route="/">E-wallet Card</NiceLink>
//                 {/* Länk till sidan för att lägga till kort */}
//                 <NiceLink route="/add" textSize="lg">
//                     Add card
//                 </NiceLink>
//             </div>
//         </header>
//     );
// };

// // Denna komponent skapar en responsiv header som visar en mörklägesväljare, användarens namn och länkar till olika delar av applikationen.
// // Om användaren inte är inloggad visas inte användarens namn.
// // Om användaren är inloggad visas en profilikon och användarens förnamn.





import { Link } from "react-router-dom";
import { ToggleDarkMode } from "../features/mode/ToggleDarkMode";
import { NiceLink } from "./NiceLink";

// Header-komponent som tar emot en användarobjekt som props
export const Header = ({ user: { first } }) => {
    return (
        // Header-elementet med padding och bakgrundsgradient
        <header className="p-3 bg-gradient-to-b from-transparent-0 to-bkg text-text-default">
            <div className="flex justify-between items-center md:items-end max-w-7xl m-auto">
                <div
                    className={`${
                        !first ? "w-[70px]" : ""
                    } flex items-center gap-2 text-md sm:text-lg font-bold tracking-tight`}
                >
                    <ToggleDarkMode />
                    {first && (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            <p className="text-sm sm:text-lg">{first}</p>
                        </>
                    )}
                </div>

                {/* Huvudlänkar */}
                <NiceLink route="/">E-wallet Card</NiceLink>

                {/* Länk till lägg till kort */}
                <NiceLink route="/add" textSize="lg">
                    Add card
                </NiceLink>

                {/* Länk till Settings */}
                <NiceLink route="/settings" textSize="lg">
                    Settings
                </NiceLink>
            </div>
        </header>
    );
};
