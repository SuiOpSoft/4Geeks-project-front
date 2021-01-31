import React from "react";

export const Team = () =>{
    return(
        <section className="section pt-4" id="team">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">BEHIND THE PEOPLE</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
									It is a long established fact that create category leading brand experiences a
									reader will be distracted by the readable content of a page when looking at its
									layout.
								</p>
							</div>
						</div>
						<div className="mt-5 row">
							<div className="col-sm-6 col-lg-3">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="assets/images/team/img-1.jpg"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">Frank Johnson</h4>
									<p className="text-uppercase team-designation">CEO</p>
								</div>
							</div>
							<div className="col-sm-6 col-lg-3">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="assets/images/team/img-2.jpg"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">Elaine Stclair</h4>
									<p className="text-uppercase team-designation">DESIGNER</p>
								</div>
							</div>
							<div className="col-sm-6 col-lg-3">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="assets/images/team/img-3.jpg"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">Wanda Arthur</h4>
									<p className="text-uppercase team-designation">DEVELOPER</p>
								</div>
							</div>
							<div className="col-sm-6 col-lg-3">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="assets/images/team/img-4.jpg"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">Joshua Stemple</h4>
									<p className="text-uppercase team-designation">MANAGER</p>
								</div>
							</div>
						</div>
					</div>
				</section>
    )
}