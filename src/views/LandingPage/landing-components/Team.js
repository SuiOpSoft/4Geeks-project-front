import React from "react";

export const Team = () =>{
    return(
        <section className="section mt-3" id="team">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 offset-lg-2">
								<h1 className="section-title text-center">BEHIND THE PEOPLE</h1>
								<div className="section-title-border mt-3" />
								<p className="section-subtitle text-muted text-center pt-4 font-secondary">
									...
								</p>
							</div>
						</div>
						<div className="mt-5 row">
							<div className="col-sm-6 col-lg-4">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">Fran Gutiérrez</h4>
									<p className="text-uppercase team-designation">CEO</p>
								</div>
							</div>
							<div className="col-sm-6 col-lg-4">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">Tomás González</h4>
									<p className="text-uppercase team-designation">CEO</p>
								</div>
							</div>
							<div className="col-sm-6 col-lg-4">
								<div className="team-box text-center hover-effect">
									<div className="team-wrapper">
										<div className="team-member">
											<img
												alt="team"
												src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
												className="img-fluid rounded"
											/>
										</div>
									</div>
									<h4 className="team-name">José González</h4>
									<p className="text-uppercase team-designation">PROCESS ENGINEER</p>
								</div>
							</div>	
						</div>
					</div>
				</section>
    )
}