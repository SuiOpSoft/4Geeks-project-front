import React from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./layout/layout.scss";
import "./App.scss";
import { LandingPage } from "../src/views/LandingPage/LandingPage";
import "../src/views/LandingPage/landing-styles/landing-style.scss";
import "../src/views/LandingPage/landing-styles/pe-icon-7-stroke.scss";
import { SignIn } from "../src/views/SignInPage/SignIn";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "../src/components/shared/ScrollTotop";
import { Home } from "../src/views/Home";
import injectContext from "../src/store/context";



function App() {
  return (
    <BrowserRouter >
      <ScrollToTop>
        <Switch>
          <Route  exact path="/" component = {LandingPage} />
          <Route  path="/signin" component = {SignIn} />	  
          <Route path="/home"  component = {Home} />
          <Route>
            <h1>Not found!</h1>
          </Route>
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default injectContext(App);
