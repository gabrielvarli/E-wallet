// import {
//   createBrowserRouter,
//   Route,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom";

// import { Root } from "./pages/Root";
// import { Home } from "./pages/Home";
// import { AddCard } from "./pages/AddCard";
// // import CardDetails from "./features/cards/CardDetails"; 
// import { NotFound } from "./pages/NotFound";
// import { EditCard }  from "./features/cards/EditCard";
// import { Settings } from "./pages/Settings"; // Import Settings-sidan


// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Root />}>
//         <Route index element={<Home />} />
//         <Route path="add" element={<AddCard />} />
//         {/* <Route path="card/:id" element={<CardDetails />} />  */}
//         <Route path="settings" element={<Settings />} /> {/* Lägg till Settings-sidan */}
//         <Route path="/*" element={<NotFound />} />
//         <Route path="/card/:cardId" element={<EditCard />} /> {/* Redigeringssida */}
//       </Route>
//     )
//   );

//   return <RouterProvider router={router}></RouterProvider>;
// }


// export default App;

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { AddCard } from "./pages/AddCard";
import { NotFound } from "./pages/NotFound";
import { EditCard } from "./features/cards/EditCard";
import { Settings } from "./pages/Settings"; 
import { useEffect } from "react";
import { useSelector } from "react-redux"; // Importera Redux hooks

function App() {
  const { theme } = useSelector((state) => state.darkMode); // Hämta det valda temat från Redux

  // Funktion som uppdaterar temat i DOM
  const updateTheme = (theme) => {
    const root = document.documentElement; // Hämtar <html> elementet
    root.setAttribute("data-theme", theme); // Sätter data-theme attributet
  };

  // useEffect för att uppdatera temat när det ändras
  useEffect(() => {
    updateTheme(theme); // Anropar updateTheme när temat ändras
  }, [theme]); // Temat beror på Redux state

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="add" element={<AddCard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/card/:cardId" element={<EditCard />} />
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
