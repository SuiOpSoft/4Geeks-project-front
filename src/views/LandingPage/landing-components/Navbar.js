import React from "react";

export const Navbar = () =>{
    return(
        <header className="ReactStickyHeader_root">
					<div className="ReactStickyHeader_fixed">
						<nav className="navbar-custom sticky sticky-dark  navbar navbar-expand-lg fixed-top">
							<div className="container">
								<a href="/" className="logo navbar-brand">
									SuiOpSoft
								</a>
								<button aria-label="Toggle navigation" type="button" className="navbar-toggler">
									<i className="mdi mdi-menu" />
								</button>
								<div id="navbarCollapse" className="collapse navbar-collapse">
									<div data-nav="list" className="navbar-collapse">
										<ul id="mySidenav" className="navbar-center navbar-nav">
											<li className="nav-item active">
												<a href="#home" className="nav-link active">
													{" "}
													Home
												</a>
											</li>
											<li className="nav-item">
												<a href="#services" className="nav-link">
													{" "}
													Services
												</a>
											</li>
											<li className="nav-item">
												<a href="#features" className="nav-link">
													{" "}
													Features
												</a>
											</li>
											<li className="nav-item">
												<a href="#pricing" className="nav-link">
													{" "}
													Pricing
												</a>
											</li>
											<li className="nav-item">
												<a href="#team" className="nav-link">
													{" "}
													Team
												</a>
											</li>
											<li className="nav-item">
												<a href="#blog" className="nav-link">
													{" "}
													Blog
												</a>
											</li>
											<li className="nav-item">
												<a href="#contact" className="nav-link">
													{" "}
													Contact
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</nav>
					</div>
					<div className="ReactStickyHeader_midground" style={{ height: " 0px; top: 0px;" }} />
					<div className="ReactStickyHeader_background-bg" />
					<div className="ReactStickyHeader_foreground" style={{ opacity: "1;" }} />
				</header>
    )
}