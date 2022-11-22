import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/about.css"
import { StaticImage } from "gatsby-plugin-image"
//import FeedBack from 'react-feedback-popup';
import "../images/RPDUlogo.jpg"


const AboutPage = () => (
	<Layout>
		<div className="about" >
			<div className="info">
				<h1> About Kudos App</h1>
				<p>This application is designed and developed by Rapid Prototype Design Unit (RPDU), Enterprise Technology Delivery, GovTechON using MERN stack</p>
				<p> Version: 1.0.0.0 </p>
				<p> Developers: </p>
				<ul>
					<li>Siran Cao - siran.cao@ontario.ca</li>
					<li>Abhi Joshi - abhi.joshi@ontario.ca</li>
					<li>Xin Lyu - xin.lyu@ontario.ca</li>
				</ul>
				<div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
				<h2>Feedback</h2>
				<p>Join our community on yammer to learn more about low-code and Power-Apps</p>
				<p>or</p>
				<p>Click the feedback button to share your thoughts, your opinion is valuable to us!</p>
				{/* <FeedBack className="feedback"
					position="right"
					numberOfStars={5}
					headerText="feedback"
					bodyText="Give us feedback what you think about the app?"
					buttonText="FEEDBACK"
					handleClose={() => console.log("handleclose")}
					handleSubmit={(data) =>
						fetch('', {
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							},
							method: 'POST', // or 'PUT'
							body: JSON.stringify(data),
						}).then((response) => {
							if (!response.ok) {
								return Promise.reject('Our servers are having issues! We couldn\'t send your feedback!');
							}
							response.json()
						}).then(() => {
							alert('Success!');
						}).catch((error) => {
							alert('Our servers are having issues! We couldn\'t send your feedback!', error);
						})
					}
					handleButtonClick={() => console.log("handleButtonClick")}
				/> */}
			</div>

			<div className="logo">
				<StaticImage src="../images/RPDUlogo.png" alt="logo" /> </div>

		</div>
	</Layout>
)

export const Head = () => <Seo title="Kudos Page" />

export default AboutPage
