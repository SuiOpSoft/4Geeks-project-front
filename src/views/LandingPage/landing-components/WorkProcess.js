import React from "react";

export const WorkProcess = () =>{
    return(

                <section className="section bg-light">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">WORK PROCESS</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
									In an ideal world this website wouldn’t exist, a client would acknowledge the
									importance of having web copy before the design starts.
								</p>
							</div>
						</div>
						<div className="row">
							<div className="text-center process-left-icon-1 col-lg-6">
								<i className="pe-7s-angle-right" />
							</div>
							<div className="text-center process-left-icon-2 col-lg-6">
								<i className="pe-7s-angle-right" />
							</div>
						</div>
						<div className="mt-5 row">
							<div className="plan-line col-lg-4">
								<div className="text-center process-box">
									<i className="pe-7s-pen text-primary" />
									<h4 className="pt-3">Tell us what you need</h4>
									<p className="text-muted">The Big Oxmox advised her not to do so.</p>
								</div>
							</div>
							<div className="plan-line col-lg-4">
								<div className="text-center process-box">
									<i className="pe-7s-id text-primary" />
									<h4 className="pt-3">Get free quotes</h4>
									<p className="text-muted">Little Blind Text didn’t listen.</p>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="text-center process-box">
									<i className="pe-7s-target text-primary" />
									<h4 className="pt-3">Deliver high quality product</h4>
									<p className="text-muted">When she reached the first hills.</p>
								</div>
							</div>
							<div className="text-center mx-auto">
								<a className="btn btn-primary waves-light waves-effect mt-5" href="/home-two">
									Get Started <i className="fas fa-arrow-right" />
								</a>
							</div>
						</div>
					</div>
				</section>
    )
}