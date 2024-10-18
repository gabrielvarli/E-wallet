import React from "react"; // Importerar React-biblioteket, vilket är nödvändigt för att kunna använda JSX (React:s sätt att skriva HTML-liknande syntax i JavaScript).
import ReactDOM from "react-dom/client"; // Importerar funktioner från ReactDOM som gör det möjligt att rendera React-komponenter i webbläsarens DOM.
import App from "./App.jsx"; // Importerar huvudkomponenten "App" från filen "App.jsx". Detta är den komponent där resten av applikationen kommer att bo.
import "./index.css"; // Importerar en CSS-fil för att tillämpa stilar globalt i applikationen.

import { Provider } from "react-redux"; // Importerar "Provider" från "react-redux", vilket används för att integrera Redux med React.
import store from "./redux/configureStore"; // Importerar Redux-butiken (store) som hanterar applikationens globala tillstånd.

ReactDOM.createRoot(document.getElementById("root")).render(
    // Hittar HTML-elementet med id "root" i index.html och säger åt React att rendera hela applikationen där.
    
    <Provider store={store}> 
        {/*
         Wrappad runt hela applikationen (App) finns "Provider"-komponenten från Redux.
         Denna komponent ger alla barnkomponenter åtkomst till Redux-butiken.
         Detta gör att alla komponenter i applikationen kan komma åt och ändra det globala tillståndet genom Redux.
        */}
        <App />
        {/*
         App-komponenten renderas här. "App" är roten till din React-applikation och den innehåller
         all annan logik och UI-komponenter som används för att bygga upp gränssnittet.
        */}
    </Provider>
);
