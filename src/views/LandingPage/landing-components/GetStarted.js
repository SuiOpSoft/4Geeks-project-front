import React from "react";

export const GetStarted = () =>{
    return(
		<section className="section section-lg bg-get-start">
		<div className="bg-overlay3" />
		<div className="container">
			<div className="row">
				<div className="text-center col-lg-8 offset-lg-2">
					<h1 className="get-started-title text-white">{"Let's Get Started"}</h1>
					<div className="section-title-border mt-4 bg-white" />
					<p className="section-subtitle font-secondary text-white text-center pt-4">
					“Innovation distinguishes between a leader and a follower”.- <em>Steve Jobs</em>
					</p>
				</div>
			</div>
		</div>
		<div className="bg-pattern-effect">			
		</div>
	</section>  
    )
}