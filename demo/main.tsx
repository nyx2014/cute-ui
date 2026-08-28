import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Showcase } from "./Showcase";
import "./showcase.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element.");
}

createRoot(root).render(
  <StrictMode>
    <Showcase />
  </StrictMode>,
);
