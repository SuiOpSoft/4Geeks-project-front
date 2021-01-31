import React from "react";

export const Home = () =>{
    return(
        <section className="section bg-home home-half" id="home" data-image-src="src/front/images/bg-home.jpg">
					<div className="bg-overlay" />
					<div className="display-table">
						<div className="display-table-cell">
							<div className="container">
								<div className="row">
									<div className="col-lg-8 offset-lg-2 text-white text-center col-lg-8 offset-lg-2">
										<h1 className="home-title">We help startups launch their products</h1>
										<p className="pt-3 home-desc">
											Etiam sed.Interdum consequat proin vestibulum className at.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="wave-effect wave-anim">
						<div className="waves-shape shape-one">
							<div className="wave wave-one" />
						</div>
						<div className="waves-shape shape-two">
							<div
								className="wave wave-two"
								style={{
									backgroundImage: "url(/workspace/Weather_App/src/front/images/wave/wave2.png);"
								}}
							/>
						</div>
						<div className="waves-shape shape-three">
							<div
								className="wave wave-three"
								style={{
									backgroundImage: "url(/workspace/Weather_App/src/front/images/wave/wave3.png);"
								}}
							/>
						</div>
					</div>
				</section>
    )
}