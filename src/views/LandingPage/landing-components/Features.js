import React, { Fragment } from "react";

export const Features = () =>{
    return(
		<Fragment>
        <section className="section bg-light" id="features">
					<div className="container">
						<div className="vertical-content row">
							<div className="col-lg-5">
								<div className="features-box">
									<h3>
										A digital web design studio creating modern &amp; engaging online experiences
									</h3>
									<p className="text-muted web-desc">
										Separated they live in Bookmarksgrove right at the coast of the Semantics, a
										large language ocean. A small river named Duden flows by their place and
										supplies it with the necessary regelialia.
									</p>
									<ul className="text-muted list-unstyled mt-4 features-item-list">
										<li className="">We put a lot of effort in design.</li>
										<li className="">The most important ingredient of successful website.</li>
										<li className="">Sed ut perspiciatis unde omnis iste natus error sit.</li>
										<li className="">Submit Your Orgnization.</li>
									</ul>
									<a className="btn btn-primary mt-4 waves-effect waves-light" href="/home-two">
										Learn More <i className="mdi mdi-arrow-right" />
									</a>
								</div>
							</div>
							<div className="col-lg-7">
								<div className="features-img features-right text-right">
									<img src="" alt="macbook" className="img-fluid" />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="section section-lg bg-web-desc">
				<div className="bg-overlay" />
				<div className="container">
					<div className="row">
						<div className="text-center col-lg-12">
							<h2 className="text-white">Build your dream website today</h2>
							<p className="pt-3 home-desc">
								But nothing the copy said could convince her and so it didn’t take long until a few
								insidious Copy Writers ambushed her.
							</p>
							<a className="btn btn-white mt-4 waves-effect waves-light mb-5" href="/home-two">
								View Plan &amp; Pricing
							</a>
						</div>
					</div>
				</div>
				<div className="bg-pattern-effect">
					<img src="assets/images/bg-pattern.png" alt="dorsin" />
				</div>
			</section>
		</Fragment>
    )
}