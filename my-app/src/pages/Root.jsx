// import { Outlet } from "react-router-dom";
// import { Header } from "../components/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { setUser } from "../features/cards/cardsSlice"; // Importera setUser för att uppdatera användardata

// export const Root = () => {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.cards); // Hämta användardata från Redux

//     const [firstName, setFirstName] = useState(user.first || ""); // Local state för förnamn
//     const [lastName, setLastName] = useState(user.last || ""); // Local state för efternamn

//     // Uppdatera Redux när användaren ändrar sitt namn
//     useEffect(() => {
//         if (firstName && lastName) {
//             dispatch(setUser({ first: firstName, last: lastName }));
//         }
//     }, [firstName, lastName, dispatch]);

//     return (
//         <>
//             <Header user={user} />

//             <main className="px-4 pt-10 text-text-default h-full">
//                 <div className="mb-6">
//                     <h2>Enter your user information:</h2>
//                     <form className="flex gap-4">
//                         <input
//                             type="text"
//                             placeholder="First Name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             className="border p-2 rounded"
//                             style={{ color: 'black' }}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             className="border p-2 rounded"
//                             style={{ color: 'black' }}
//                         />
//                     </form>
//                 </div>

//                 <Outlet />
//             </main>
//         </>
//     );
// };

// koden uppe funkar, måste kolla om jag ska ha kort info eller inte.

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useSelector } from "react-redux"; // Behöver inte useDispatch längre

export const Root = () => {
    const { user } = useSelector((state) => state.cards); // Hämta användardata från Redux

    return (
        <>
            <Header user={user} />

            <main className="px-4 pt-10 text-text-default h-full">
                {/* Huvudinnehåll */}
                <Outlet />
            </main>
        </>
    );
};
