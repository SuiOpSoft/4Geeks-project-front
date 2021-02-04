import React from 'react';
import { Home } from "./views/Home.js";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/layout.scss';
import './App.scss';
import { LandingPage } from "../src/views/LandingPage/LandingPage"
import "../src/views/LandingPage/landing-styles/landing-style.scss"
import "../src/views/LandingPage/landing-styles/pe-icon-7-stroke.scss"

function App() {
  return (
    <LandingPage />
  );
}

export default App;
