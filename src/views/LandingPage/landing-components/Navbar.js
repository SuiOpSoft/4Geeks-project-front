import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import UseUser from '../../../hooks/UseUser'


export const Navbar = () => {

    return(
			<nav className="navbar-custom    navbar navbar-expand-lg fixed-top">
				<div className="container">
					<div className="logo navbar-brand">									
							SuiOpSoft
					</div>
					<button aria-label="Toggle navigation" type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" >
					<span className="fas fa-bars"></span>
					</button>
					<div id="navbarCollapse" className="collapse navbar-collapse">
						<div data-nav="list" className="navbar-collapse">
							<ul id="mySidenav" className="navbar-center navbar-nav">
								<li className="nav-item">
									<a href="#header" className="nav-link active ">
										Home
									</a>
								</li>
								<li className="nav-item">
									<a href="#services" className="nav-link ">
										Services
									</a>
								</li>
								<li className="nav-item">
									<a href="#features" className="nav-link">
										Features
									</a>
								</li>
								<li className="nav-item">
									<a href="#team" className="nav-link">
										Team
									</a>
								</li>
								<li className="nav-item">
									<a href="#contact" className="nav-link">
										Contact
									</a>
								</li>
								<li className="nav-item">
									<Link to="signin" className="nav-link">
										Sign in
									</Link>							
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
    )
}