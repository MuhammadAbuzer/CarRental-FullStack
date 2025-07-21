import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import ThemeProvider from "./context/ToggleThemeContext.jsx";
import TokenProvider from "./context/Token.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <Provider store={store}>
          <TokenProvider>
            <App />
          </TokenProvider>
        </Provider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);
