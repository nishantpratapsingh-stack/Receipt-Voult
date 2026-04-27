import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyThemeToDocument, resolveStoredTheme } from "./lib/theme";

applyThemeToDocument(resolveStoredTheme());

createRoot(document.getElementById("root")!).render(<App />);
