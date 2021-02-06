import React, { Fragment } from "react";

export const Footer = () =>{
    return(
		<Fragment>
		<footer className="footer">
					<div className="container">
						<div className="row">
							<div className="mt-4 col-lg-3">
								<h4>SuiOpSoft</h4>
								<div className="text-muted mt-4">
									<ul className="list-unstyled footer-list">
										<li>
											<a href="/">Home</a>
										</li>
										<li>
											<a href="/">Contact us</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-4 col-lg-3">
								<h4>Information</h4>
								<div className="text-muted mt-4">
									<ul className="list-unstyled footer-list">
										<li>
											<a href="/">Terms &amp; Condition</a>
										</li>
										<li>
											<a href="/">About us</a>
										</li>
										<li>
											<a href="/">Bookmarks</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-4 col-lg-3">
								<h4>Support</h4>
								<div className="text-muted mt-4">
									<ul className="list-unstyled footer-list">
										<li>
											<a href="/">FAQ</a>
										</li>
										<li>
											<a href="/">Contact</a>
										</li>
										<li>
											<a href="/">Disscusion</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-4 col-lg-3">
								<h4>Feedback</h4>
								<div className="text-muted mt-4">
									<p>
										We would like to improve more and more so you are welcome to share your ideas to make it better.
									</p>
								</div>
								<form className="subscribe">
									<input placeholder="Email" className="form-control" required="" />
									<a className="submit" href="/">
										<i className="pe-7s-paper-plane" />
									</a>
								</form>
							</div>
						</div>
					</div>
				</footer>
				<div className="footer-alt">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="float-start pull-none">
									<p className="copy-rights text-muted">2021 © SuiOpSoft</p>
								</div>								
								<div className="clearfix" />
							</div>
						</div>
					</div>
				</div>
				</Fragment>
    )
}