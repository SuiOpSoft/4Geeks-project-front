import React from 'react'
import {Navbar} from '../LandingPage/landing-components/Navbar'
import {Header} from './landing-components/Header'
import {Services} from '../LandingPage/landing-components/Services'
import {Features} from '../LandingPage/landing-components/Features'
import {Team} from '../LandingPage/landing-components/Team'
import {WorkProcess} from '../LandingPage/landing-components/WorkProcess'
import {Testimonials} from '../LandingPage/landing-components/Testimonials'
import {GetStarted} from '../LandingPage/landing-components/GetStarted'
import {Contact} from '../LandingPage/landing-components/Contact'
import {ContactSocial} from '../LandingPage/landing-components/ContactSocial'
import {Footer} from '../LandingPage/landing-components/Footer'
import { Redirect } from 'react-router-dom'
import UseUser from "../../hooks/UseUser"



export const LandingPage = () => {
    const {isLogged} = UseUser()

    return(
        <div>
            {isLogged && <Redirect to='/home/homeuser' />}
            <Navbar />
            <Header />
            <Services />
            <Features />
            <Team/>
            <WorkProcess/>
            <Testimonials/>
            <GetStarted/>         
            <Contact/>
            <ContactSocial/>
            <Footer/>
        </div>
    )
}