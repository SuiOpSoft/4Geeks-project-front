import React from "react";

export const Contact = () =>{
    return(
		<section className="section" id="contact">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">GET IN TOUCH</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
									In order to take advantage of all the benefits which are presented, please feel free to fill the form.
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-4">
								<div className="mt-4 pt-4">
									<p className="mt-4">
										<span className="h5">Office Address 1:</span>
										<br />
										<span className="text-muted d-block mt-2">
											Elche, Alicante 03202
										</span>
									</p>
									<p className="mt-4">
										<span className="h5">Office Address 2:</span>
										<br />
										<span className="text-muted d-block mt-2">
											Málaga, Andalucía 29008
										</span>
									</p>
									<p className="mt-4">
										<span className="h5">Working Hours:</span>
										<br /> <span className="text-muted d-block mt-2">9:00AM To 6:00PM</span>
									</p>
								</div>
							</div>
							<div className="col-lg-8">
								<div className="custom-form mt-4 pt-4">
									<div id="message" />
									<form
										noValidate=""
										action="#"
										name="contact-form"
										id="contact-form"
										method="get"
										className="av-invalid">
										<div className="row">
											<div className="col-lg-6">
												<div className="mt-2 form-group">
													<div className="form-group">
														<input
															required=""
															name="name"
															placeholder="Your name*"
															id="name"
															type="text"
															className="form-control is-untouched is-pristine av-invalid form-control"
															
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-6">
												<div className="mt-2 form-group">
													<div className="form-group">
														<input
															required=""
															name="email"
															placeholder="Your email*"
															id="email"
															type="email"
															className="form-control is-untouched is-pristine av-invalid form-control"
															
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-12">
												<div className="mt-2 form-group">
													<div className="form-group">
														<input
															required=""
															name="subject"
															placeholder="Your Subject.."
															id="subject"
															type="text"
															className="form-control is-untouched is-pristine av-invalid form-control"
															
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-12">
												<div className="mt-2 form-group">
													<textarea
														name="comments"
														id="comments"
														rows="4"
														className="form-control"
														placeholder="Your message..."
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="text-end col-lg-12">
												<input
													type="submit"
													id="submit"
													name="send"
													className="submitBnt btn btn-primary"
													value="Send Message"
												/>
												<div id="simple-msg" />
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
    )
}