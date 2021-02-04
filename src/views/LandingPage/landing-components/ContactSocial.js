import React from "react";

export const ContactSocial = () =>{
    return(
		<section className="contact-social bg-light">
					<div className="container">
						<div className="align-items-center row">
							<div className="col-lg-6">
								<ul className="list-inline social mt-4">
									<li className="list-inline-item">
										<a className="social-icon" href="https://twitter.com/">
											<i className="fab fa-twitter" />
										</a>
									</li>
									<li className="list-inline-item">
										<a className="social-icon" href="https://www.linkedin.com/">
											<i className="fab fa-linkedin-in" />
										</a>
									</li>
								</ul>
							</div>
							<div className="mt-4 col-lg-3">
								<p className="contact-title">
									<i className="pe-7s-call" /> &nbsp;+34 XXX XX XX XX
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