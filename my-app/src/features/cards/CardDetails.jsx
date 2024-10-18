import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CardInfo from "./CardInfo";
import { updateCard, addCard } from "./cardsSlice"; // Uppdaterad import

const CardDetails = () => {
  const { id } = useParams(); // Hämta kort-ID från URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hämta kortet från Redux state
  const card = useSelector((state) => state.cards.cards.find((c) => c.id === id));

  // Lokalt state för att hantera inmatningsfält
  const [formData, setFormData] = useState({
    name: "",
    // card_number: "", 
    card_number: "", 
    expiryDate: "",
    cvc: "",
  });

  // Fyll i formuläret med kortdata när kortet laddas
  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name || "",
        card_number: card.card_number || "",
        expiryDate: card.date || "",
        cvc: card.cvc || "",
      });
    }
  }, [card]);

  // Hantera ändringar i formuläret
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Hantera formulärinlämning
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Om cardId finns, uppdatera kortet
      dispatch(updateCard({ id, ...formData }));
    } else {
      // Lägg till ett nytt kort
      dispatch(addCard({ ...formData, id: crypto.randomUUID() }));
    }

    navigate("/cards"); // Navigera tillbaka till kortlistan
  };

  // Om kortet inte hittas, visa ett meddelande
  if (!card) {
    return <div>Kortet hittades inte.</div>;
  }

  return (
    <div className="p-4">
      <CardInfo card={card} isActive={false} /> {/* Visa kortinformationen */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Card Number:
            <input
              type="text"
              name="card_number"
              value={formData.card_number}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            CVC:
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Update Card
        </button>
      </form>
    </div>
  );
};

export default CardDetails;
