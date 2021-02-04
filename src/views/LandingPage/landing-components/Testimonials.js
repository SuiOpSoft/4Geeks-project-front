import React from "react";

export const Testimonials = () =>{
    return(
        <section className="section" id="testi">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">"WHAT THEYVE SAID"</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
									Our customers have allready had an opinion about us. To know about what they think <br/>is to acknowledge our work.
								</p>
							</div>
						</div>
						<div className="mt-5 row">
							<div className="col-lg-4">
								<div className="testimonial-box hover-effect mt-5">
									<img
										src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
										alt="client"
										className="img-fluid d-block img-thumbnail rounded-circle"
									/>
									<div className="testimonial-decs">
										<p className="text-muted text-center mb-0">
											"I feel confident imposing change on myself. Its a lot more fun progressing than looking back. Thats why I need to throw curve balls."
										</p>
									</div>
									<h5 className="text-center text-uppercase pt-3">
										RUBEN REED - <span className="text-muted text-capitalize">Charleston</span>
									</h5>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="testimonial-box hover-effect mt-5">
									<img
										src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
										alt="client"
										className="img-fluid d-block img-thumbnail rounded-circle"
									/>
									<div className="testimonial-decs">
										<p className="text-muted text-center mb-0">
											“Our task must be to free ourselves by widening our circle of compassion to
											embrace all living creatures and the whole of nature and its beauty.”
										</p>
									</div>
									<h5 className="text-center text-uppercase pt-3">
										MICHAEL P. HOWLETT <span className="text-muted text-capitalize">Worcester</span>
									</h5>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="testimonial-box hover-effect mt-5">
									<img
										src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
										alt="client"
										className="img-fluid d-block img-thumbnail rounded-circle"
									/>
									<div className="testimonial-decs">
										<p className="text-muted text-center mb-0">
												"I feel confident imposing change on myself. Its a lot more fun progressing than looking back. Thats why I need to throw curve balls."
										</p>
									</div>
									<h5 className="text-center text-uppercase pt-3">
										RUBEN REED - <span className="text-muted text-capitalize">Charleston</span>
									</h5>
								</div>
							</div>
						</div>
					</div>
				</section>         
    )
}