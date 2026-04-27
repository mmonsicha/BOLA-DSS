import "@uxuissk/design-system/styles.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "@uxuissk/design-system";
import { App } from "@/app/App";
import { AppStateProvider } from "@/state/AppStateContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStateProvider>
      <App />
      <ToastContainer />
    </AppStateProvider>
  </StrictMode>,
);
