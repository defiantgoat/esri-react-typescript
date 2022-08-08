import React from "react";
import { createRoot } from 'react-dom/client';
import AppContainer from "./components/AppContainer";
import "modern-normalize";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppContainer />);
