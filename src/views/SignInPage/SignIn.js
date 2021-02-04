import React from "react";
import {Link} from "react-router-dom"

export const SignIn = () => {
	return (
		
		<div>
			<div class="account-home-btn d-none d-sm-block">
				<Link class="text-white" to="/" >
				<i class="fas fa-home"></i>
				</Link>
			</div>
			<section class="bg-account-pages vh-100">
				<div class="display-table">
					<div class="display-table-cell">
						<div class="container">
							<div class="justify-content-center row">
								<div class="col-lg-5">
									<div class="account-card card">
										<div class="card-body">
											<div class="text-center mt-3">
												<h3 class="font-weight-bold">
													<a href="/" class="text-dark account-pages-logo">SuiOpSoft</a>
												</h3>
												<p class="text-muted">Sign in to continue to SuiOpSoft.</p>
											</div>
										<div class="p-3">
											<form novalidate="" action="#" method="get" class="av-invalid">
												<div class="form-group">
													<label for="username" class="">Username</label>
												<div class="form-group">
													<input name="username" required="" placeholder="Enter username" id="username" type="text" class="form-control is-untouched is-pristine av-invalid form-control" value="" />
														</div>
													</div>
												<div class="form-group">
													<label for="userpassword" class="">Password</label>
													<div class="form-group"><input name="password" required="" placeholder="Enter password" id="userpassword" type="password" class="form-control is-untouched is-pristine av-invalid form-control" value="" />
													</div>
												</div>
												<div class="custom-control custom-checkbox">
													<input id="customControlInline" type="checkbox" class="custom-control-input form-check-input" />
													<label for="customControlInline" class="custom-control-label"> Remember me</label>
												</div>
												<div class="d-flex justify-content-center mt-2">
													<button type="submit" class="btn btn-primary btn btn-none">Log In</button>
												</div>
												<div class="mt-4 mb-0 text-center">
													<Link class="text-dark" to="/password_forget">
													<i class="fas fa-lock"></i> Forgot your password?</Link>
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