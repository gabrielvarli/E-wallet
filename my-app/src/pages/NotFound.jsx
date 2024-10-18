// Importerar Link-komponenten från "react-router-dom" för att skapa länkar mellan sidor
import { Link } from "react-router-dom";

// Definierar en funktionell React-komponent som visas när en sida inte hittas
export const NotFound = () => {
    return (
        <div className="flex justify-center mt-28">
            <div className="w-fit">
                {/* Rubrik för sidan "404 Not Found", innehåller en uppdelning i två rader */}
                <h2 className="font-bold mb-8 flex flex-col gap-4">
                    <span className="text-2xl">Oops!</span>
                    <span>Looks like we can´t find what you´re looking for...</span>
                </h2>

                {/* En länk som navigerar användaren tillbaka till hemsidan */}
                <Link
                    className="self-start w-fit flex gap-2 justify-center p-4 rounded-md font-bold text-white bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-600 hover:to-primary-900 active:from-primary-600 active:to-primary-800 focus:from-primary-600 focus:to-primary-800 focus:outline-none focus:ring focus:ring-primary-200"
                    to="/" // Navigerar användaren tillbaka till hemsidan när de klickar
                >
                    {/* SVG-ikon för att visa en husikon bredvid länken */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {/* Ritar ikonen, här används en stig för att skapa konturerna av ett hus */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                    {/* Texten bredvid ikonen som beskriver vad länken gör */}
                    <p>Back to home page</p>
                </Link>
            </div>
        </div>
    );
};
