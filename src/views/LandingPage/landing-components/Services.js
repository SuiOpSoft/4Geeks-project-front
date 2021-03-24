import React from "react";

export const Services = () =>{
    return(
        <section className="section" id="services">
					<div className="container mt-5">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">Our Services</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
								Calculate the capacity of the oil-gas separators will now take less time.
								</p>
							</div>
						</div>
						<div className="mt-4 row">
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-server text-primary" />
									<h4 className="pt-3">Data collection</h4>
									<p className="pt-3 text-muted">
									You will have the facility to collect the input fluids' data and accessories of each equipment that you can modify whenever you want.
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-science text-primary" />
									<h4 className="pt-3">Operational calculations</h4>
									<p className="pt-3 text-muted">
									You can calculate up to 6 evaluation criteria with built-in mathematical algorithms suitable for each value.
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-news-paper text-primary" />
									<h4 className="pt-3">Results</h4>
									<p className="pt-3 text-muted">
									You will get the tables of results where you can see the performance of each separator team.
									</p>
								</div>
							</div>
						</div>
						<div className="mt-4 row">
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-graph3 text-primary" />
									<h4 className="pt-3">Graphics</h4>
									<p className="pt-3 text-muted">
									You will have the possibility to display the view's results graphically and quickly if any equipment does not meet the demanded requirements.
									</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-display2 text-primary" />
									<h4 className="pt-3">Simple interface</h4>
									<p className="pt-3 text-muted">
									A simple settings where nothing distracts you and you can focus only on what you need.
							</p>
								</div>
							</div>
							<div className="mt-3 col-lg-4">
								<div className="services-box text-center hover-effect">
									<i className="pe-7s-note2 text-primary" />
									<h4 className="pt-3">Feedback</h4>
									<p className="pt-3 text-muted">
									We do not want you to settle, you could send us suggestions to improve and achieve goals that make your work even easier.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
    )
}