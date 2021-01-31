import React from "react";

export const Blog = () =>{
    return(
		<section className="section bg-light pt-5" id="blog">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2">
					<h1 className="section-title text-center">BLOG</h1>
					<div className="section-title-border mt-3" />
					<p className="section-subtitle text-muted text-center pt-4 font-secondary">
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large
						language ocean className at a euismod mus luctus quam.
					</p>
				</div>
			</div>
			<div className="mt-4 row">
				<div className="col-lg-4">
					<div className="blog-box mt-4 hover-effect">
						<img src="assets/images/blog/img-1.jpg" className="img-fluid" alt="blog" />
						<div>
							<h5 className="mt-4 text-muted">UI &amp; UX Design</h5>
							<h4 className="mt-3">
								<a className="blog-title" href="/home-two">
									Doing a cross country road trip{" "}
								</a>
							</h4>
							<p className="text-muted">
								She packed her seven versalia, put her initial into the belt and made
								herself on the way..
							</p>
							<div className="mt-3">
								<a className="read-btn" href="/home-two">
									Read More <i className="mdi mdi-arrow-right" />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="blog-box mt-4 hover-effect">
						<img src="assets/images/blog/img-2.jpg" className="img-fluid" alt="blog" />
						<div>
							<h5 className="mt-4 text-muted">Digital Marketing</h5>
							<h4 className="mt-3">
								<a className="blog-title" href="/home-two">
									{" "}
									New exhibition at our Museum{" "}
								</a>
							</h4>
							<p className="text-muted">
								Pityful a rethoric question ran over her cheek, then she continued her way.
							</p>
							<div className="mt-3">
								<a className="read-btn" href="/home-two">
									Read More
									<i className="mdi mdi-arrow-right" />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="blog-box mt-4 hover-effect">
						<img src="assets/images/blog/img-3.jpg" className="img-fluid" alt="blog" />
						<div>
							<h5 className="mt-4 text-muted">Travelling</h5>
							<h4 className="mt-3">
								<a className="blog-title" href="/home-two">
									{" "}
									Why are so many people..{" "}
								</a>
							</h4>
							<p className="text-muted">
								Far far away, behind the word mountains, far from the countries Vokalia and
								Consonantia.
							</p>
							<div className="mt-3">
								<a className="read-btn" href="/home-two">
									Read More
									<i className="mdi mdi-arrow-right" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section> 
    )
}