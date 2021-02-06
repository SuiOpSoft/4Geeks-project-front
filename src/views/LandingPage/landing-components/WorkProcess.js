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
								Just a few steps away from improving your results.
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
									<h4 className="pt-3">Contact us</h4>
									<p className="text-muted">We want to meet you.</p>
								</div>
							</div>
							<div className="plan-line col-lg-4">
								<div className="text-center process-box">
									<i className="pe-7s-id text-primary" />
									<h4 className="pt-3">Get your password</h4>
									<p className="text-muted">You can now access to know the advantages.</p>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="text-center process-box">
									<i className="pe-7s-target text-primary" />
									<h4 className="pt-3">Deliver high quality product</h4>
									<p className="text-muted">Enjoy doing the job in less time.</p>
								</div>
							</div>
							<div className="text-center mx-auto">
								<a className="btn btn-primary mt-5" href="/#contact">
									Get Started
								</a>
							</div>
						</div>
					</div>
				</section>
    )
}