import React, { Fragment } from "react";
import "../views/LandingPage/landing-styles/landing-style.scss"
import "../views/LandingPage/landing-styles/pe-icon-7-stroke.scss"
import {SignIn} from '../views/SignInPage/SignIn'
import {LandingPage} from '../views/LandingPage/LandingPage'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ScrollToTop from '../views/LandingPage/landing-components/scrollToTop'

 
export const  Home = () => {

    return(
        
            <BrowserRouter>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<LandingPage />
						</Route>
						<Route exact path="/signin">
							<SignIn />
						</Route>
						<Route>
							<h1>Not found!</h1>
                            <Redirect to="/"/>
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
 
    );
}