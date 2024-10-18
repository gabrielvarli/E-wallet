import { useSelector } from "react-redux";
import { CardWrapper } from "../features/cards/CardWrapper";

export const Home = () => {
    // Hämta kort från Redux-butiken
    const cards = useSelector((state) => state.cards.cards);

    return (
        <div>
            <CardWrapper cards={cards} /> {/* Skicka kortlistan till CardWrapper */}
        </div>
    );
};
