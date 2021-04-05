import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom"
import UseUser from "../../hooks/UseUser"
import UseCompany from "../../hooks/UseCompany"
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabView,TabPanel } from 'primereact/tabview';


export const SignIn = () => {

	const [email, setEmail] = useState('')
	const [passwordUser, setPasswordUser] = useState('')
	const [companyUser, setCompanyUser] = useState('')
	const [passwordCompany, setPasswordCompany] = useState('')
	const { isLoginLoading, hasLoginError, login, isLogged } = UseUser()
	const { isLoginLoadingCompany, hasLoginErrorCompany, loginCompany, isLoggedCompany } = UseCompany()
	const history = useHistory()

	useEffect(() => {
		if (isLogged) history.push('/home/homeuser')
		if(isLoggedCompany) history.push('/home/homeuser')
	},[isLogged, isLoggedCompany])

	const handleSubmitUser = (e) => {
		e.preventDefault()
		login({ email, passwordUser })
		window.sessionStorage.setItem('email', email)	
	}

	const handleSubmitCompany = (e) => {
		e.preventDefault()
		loginCompany({ companyUser, passwordCompany })
		window.sessionStorage.setItem('companyUser', companyUser)	
	}

	return (		
		<div>
			<div className="account-home-btn d-none d-sm-block">
				<Link className="text-white" to="/" >
				<i className="fas fa-home"></i>
				</Link>
			</div>
			<section className="bg-account-pages vh-100">
			{!isLoggedCompany && !isLogged &&
				<div className="display-table">
					<div className="display-table-cell">
						<div className="container">
							<div className="justify-content-center row">
								<div className="col-lg-5">
									<TabView >
									<TabPanel id="tab-user" header="User">
										<div className="account-card card">
											<div className="card-body">
												<div className="text-center mt-3">
													<h3 className="font-weight-bold">
														<span className="account-pages-logo">SuiOpSoft</span>
													</h3>
													<p className="text-muted">Sign in to continue to SuiOpSoft.</p>
												</div>
												<div className="p-3">
													<form onSubmit={handleSubmitUser}  className="av-invalid">
														<div className="form-group">
															<label  className="">Email</label>
														<div className="form-group">
															<input name="Email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Enter email"  type="email" className="form-control is-untouched is-pristine av-invalid"  />
																</div>
															</div>
														<div className="form-group mb-5">
															<label  className="">Password</label>
															<div className="form-group">
																<input name="password" value={passwordUser} onChange={e=>setPasswordUser(e.target.value)} required placeholder="Enter password"  type="password" className="form-control is-untouched is-pristine av-invalid form-control"  />
															</div>
														</div>
														{hasLoginError && <div style={{color:"red", width:"100%" ,textAlign:"center", marginBottom:"0.7rem"}}><em>Credentials are invalid</em></div>}
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
									</TabPanel>
									<TabPanel header="Company">
										<div className="account-card card">
											<div className="card-body">
												<div className="text-center mt-3">
													<h3 className="font-weight-bold">
														<a href="/" className="text-dark account-pages-logo">SuiOpSoft</a>
													</h3>
													<p className="text-muted">Sign in to continue to SuiOpSoft.</p>
												</div>
											<div className="p-3">
												<form onSubmit={handleSubmitCompany}  className="av-invalid">
													<div className="form-group">
														<label  className="">Company User</label>
													<div className="form-group">
														<input name="Company User" value={companyUser} onChange={e=>setCompanyUser(e.target.value)} required placeholder="Enter company user"  type="text" className="form-control is-untouched is-pristine av-invalid"  />
															</div>
														</div>
													<div className="form-group mb-5">
														<label  className="">Password</label>
														<div className="form-group">
															<input name="password" value={passwordCompany} onChange={e=>setPasswordCompany(e.target.value)} required placeholder="Enter password"  type="password" className="form-control is-untouched is-pristine av-invalid form-control"  />
														</div>
													</div>
													{hasLoginErrorCompany && <div style={{color:"red", width:"100%" ,textAlign:"center", marginBottom:"0.7rem"}}><em>Credentials are invalid</em></div>}
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
								</TabPanel>
								</TabView>
							</div>
						</div>
					</div>
				</div>
			</div>
			}
			{isLoginLoading || isLoginLoadingCompany && <div className="progressSpinner"><ProgressSpinner /></div>}
		</section>		
	</div>	
	);
};