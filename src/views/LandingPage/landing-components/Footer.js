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
											<a href="/home-two">Home</a>
										</li>
										<li>
											<a href="/home-two">About us</a>
										</li>
										<li>
											<a href="/home-two">Careers</a>
										</li>
										<li>
											<a href="/home-two">Contact us</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-4 col-lg-3">
								<h4>Information</h4>
								<div className="text-muted mt-4">
									<ul className="list-unstyled footer-list">
										<li>
											<a href="/home-two">Terms &amp; Condition</a>
										</li>
										<li>
											<a href="/home-two">About us</a>
										</li>
										<li>
											<a href="/home-two">Jobs</a>
										</li>
										<li>
											<a href="/home-two">Bookmarks</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-4 col-lg-3">
								<h4>Support</h4>
								<div className="text-muted mt-4">
									<ul className="list-unstyled footer-list">
										<li>
											<a href="/home-two">FAQ</a>
										</li>
										<li>
											<a href="/home-two">Contact</a>
										</li>
										<li>
											<a href="/home-two">Disscusion</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-4 col-lg-3">
								<h4>Subscribe</h4>
								<div className="text-muted mt-4">
									<p>
										In an ideal world this text wouldn’t exist, a client would acknowledge the
										importance of having web copy before the design starts.
									</p>
								</div>
								<form className="subscribe">
									<input placeholder="Email" className="form-control" required="" />
									<a className="submit" href="/home-two">
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
								<div className="float-end pull-none">
									<img src="assets/images/payment.png" alt="payment" height="36" />
								</div>
								<div className="clearfix" />
							</div>
						</div>
					</div>
				</div>
				</Fragment>
    )
}