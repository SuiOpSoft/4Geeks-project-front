import React from "react";

export const GetStarted = () =>{
    return(
		<section className="section section-lg bg-get-start">
		<div className="bg-overlay" />
		<div className="container">
			<div className="row">
				<div className="text-center col-lg-8 offset-lg-2">
					<h1 className="get-started-title text-white">{"Let's Get Started"}</h1>
					<div className="section-title-border mt-4 bg-white" />
					<p className="section-subtitle font-secondary text-white text-center pt-4">
						{
							"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
						}
					</p>
					<a className="btn btn-white waves-effect mt-3 mb-4" href="/home-two">
						Get Started
						<i className="mdi mdi-arrow-right" />{" "}
					</a>
				</div>
			</div>
		</div>
		<div className="bg-pattern-effect">
			<img src="assets/images/bg-pattern-light.png" alt="pattern" />
		</div>
	</section>  
    )
}