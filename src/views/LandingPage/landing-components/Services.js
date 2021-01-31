import React from "react";

export const Services = () =>{
    return(
        <section className="section pt-5" id="services">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">Our Services</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
									We craft digital, graphic and dimensional thinking, to create category leading brand
									experiences that have meaning and add a value for our clients.
								</p>
							</div>
						</div>
						<div className="mt-4 row">
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-diamond text-primary" />
									<h4 className="pt-3">Digital Design</h4>
									<p className="pt-3 text-muted">
										{
											"Some quick example text to build on the card title and make up the bulk of the cards content. Moltin gives you the platform."
										}
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-display2 text-primary" />
									<h4 className="pt-3">Unlimited Colors</h4>
									<p className="pt-3 text-muted">
										Credibly brand standards compliant users without extensible services. Anibh
										euismod tincidunt ut laoreet.
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-piggy text-primary" />
									<h4 className="pt-3">Strategy Solutions</h4>
									<p className="pt-3 text-muted">
										Separated they live in Bookmarksgrove right at the coast of the Semantics, a
										large language ocean necessary regelialia.
									</p>
								</div>
							</div>
						</div>
						<div className="mt-4 row">
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-science text-primary" />
									<h4 className="pt-3">Awesome Support</h4>
									<p className="pt-3 text-muted">
										It is a paradisematic country, in which roasted parts of sentences fly into your
										mouth leave for the far World.
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-news-paper text-primary" />
									<h4 className="pt-3">Truly Multipurpose</h4>
									<p className="pt-3 text-muted">
										Even the all-powerful Pointing has no control about the blind texts it is an
										almost unorthographic.
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-plane text-primary" />
									<h4 className="pt-3">Easy to customize</h4>
									<p className="pt-3 text-muted">
										Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.
										She packed her seven versalia.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
    )
}