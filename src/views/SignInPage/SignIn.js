import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom"
import UseUser from "../../hooks/UseUser"
import { ProgressSpinner } from 'primereact/progressspinner';

export const SignIn = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {isLoginLoading, hasLoginError, login, isLogged} = UseUser()
	const history = useHistory()

	useEffect(() => {
		if(isLogged) history.push('/home/homeuser')
	},[isLogged])

	const handleSubmit = (e) => {
		e.preventDefault()
		login({email, password})
	}
	 

	return (		
		<div>
			<div className="account-home-btn d-none d-sm-block">
				<Link className="text-white" to="/" >
				<i className="fas fa-home"></i>
				</Link>
			</div>
			<section className="bg-account-pages vh-100">
			{!isLoginLoading && 
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
											<form onSubmit={handleSubmit}  className="av-invalid">
												<div className="form-group">
													<label  className="">Email</label>
												<div className="form-group">
													<input name="Email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Enter email"  type="text" className="form-control is-untouched is-pristine av-invalid form-control"  />
														</div>
													</div>
												<div className="form-group">
													<label  className="">Password</label>
													<div className="form-group">
														<input name="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Enter password"  type="password" className="form-control is-untouched is-pristine av-invalid form-control"  />
													</div>
												</div>
												{hasLoginError && <div style={{color:"red", width:"100%" ,textAlign:"center", marginBottom:"0.7rem"}}><em>Credentials are invalid</em></div>}
												<div className="custom-control custom-checkbox">
													<input id="customControlInline" type="checkbox" className="custom-control-input form-check-input" />
													<label htmlFor="customControlInline" className="custom-control-label"> Remember me</label>
												</div>
												<div className="d-flex justify-content-center mt-2">
													<button className="btn btn-primary btn btn-none">Log In</button>											
												</div>
												<div className="mt-4 mb-0 text-center">
													<Link className="text-dark" to="/password_forget">
													<i className="fas fa-lock"></i> Forgot your password?
													</Link>
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
			}
			{isLoginLoading && <div className="progressSpinner"><ProgressSpinner /></div>}
		</section>
	</div>
		
	);
};