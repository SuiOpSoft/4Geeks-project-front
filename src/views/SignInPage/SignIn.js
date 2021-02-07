import React from "react";
import {Link} from "react-router-dom"

export const SignIn = () => {
	return (
		
		<div>
			<div className="account-home-btn d-none d-sm-block">
				<Link className="text-white" to="/" >
				<i className="fas fa-home"></i>
				</Link>
			</div>
			<section className="bg-account-pages vh-100">
				<div className="display-table">
					<div className="display-table-cell">
						<div className="container">
							<div className="justify-content-center row">
								<div className="col-lg-5">
									<div className="account-card card">
										<div className="card-body">
											<div className="text-center mt-3">
												<h3 className="font-weight-bold">
													<a href="/" className="text-dark account-pages-logo">SuiOpSoft</a>
												</h3>
												<p className="text-muted">Sign in to continue to SuiOpSoft.</p>
											</div>
										<div className="p-3">
											<form noValidate="" action="#" method="get" className="av-invalid">
												<div className="form-group">
													<label htmlFor="username" className="">Username</label>
												<div className="form-group">
													<input name="username" required="" placeholder="Enter username" id="username" type="text" className="form-control is-untouched is-pristine av-invalid form-control"  />
														</div>
													</div>
												<div className="form-group">
													<label htmlFor="userpassword" className="">Password</label>
													<div className="form-group"><input name="password" required="" placeholder="Enter password" id="userpassword" type="password" className="form-control is-untouched is-pristine av-invalid form-control"  />
													</div>
												</div>
												<div className="custom-control custom-checkbox">
													<input id="customControlInline" type="checkbox" className="custom-control-input form-check-input" />
													<label htmlFor="customControlInline" className="custom-control-label"> Remember me</label>
												</div>
												<div className="d-flex justify-content-center mt-2">
													<Link to="/home">
													<button type="submit" className="btn btn-primary btn btn-none">Log In</button></Link>
												</div>
												<div className="mt-4 mb-0 text-center">
													<Link className="text-dark" to="/password_forget">
													<i className="fas fa-lock"></i> Forgot your password?</Link>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
		
	);
};