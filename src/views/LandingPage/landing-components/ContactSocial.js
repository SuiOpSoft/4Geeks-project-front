import React from "react";

export const ContactSocial = () =>{
    return(
		<section className="contact-social bg-light">
					<div className="container">
						<div className="align-items-center row">
							<div className="col-lg-6">
								<ul className="list-inline social mt-4">
									<li className="list-inline-item">
										<a className="social-icon" href="/home-two">
											<i className="fab fa-facebook-f" />
										</a>
									</li>
									<li className="list-inline-item">
										<a className="social-icon" href="/home-two">
											<i className="fab fa-twitter" />
										</a>
									</li>
									<li className="list-inline-item">
										<a className="social-icon" href="/home-two">
											<i className="fab fa-linkedin-in" />
										</a>
									</li>
									<li className="list-inline-item">
										<a className="social-icon" href="/home-two">
											<i className="fab fa-google-plus-g" />
										</a>
									</li>
								</ul>
							</div>
							<div className="mt-4 col-lg-3">
								<p className="contact-title">
									<i className="pe-7s-call" /> &nbsp;+91 123 4556 789
								</p>
							</div>
							<div className="mt-4 text-right col-lg-3">
								<p className="contact-title">
									<i className="pe-7s-mail-open" />
									&nbsp; suiopsoft@gmail.com
								</p>
							</div>
						</div>
					</div>
				</section>
    )
}