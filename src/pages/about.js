import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/about.module.css"
//import { StaticImage } from "gatsby-plugin-image"
//import FeedBack from 'react-feedback-popup';
import rpdu from "../images/RPDUlogo.jpg"


const AboutPage = () => {

	return (
		<Layout>
			<div style={{
				margin: `0 auto`,
				maxWidth: `var(--size-content)`,
				padding: `var(--size-gutter)`,
				minHeight: `70vh`
			}}>
				<div className={styles.about}>
					<div className={styles.logo}>
						{/* <StaticImage src="../images/RPDUlogo.png" alt="logo" /> */}
						<img className={styles.image} src={rpdu} alt="logo" />
					</div>

					<div className={styles.info}>
						<h3> About Kudos App</h3>
						<p>This application is designed and developed by Rapid Prototype Design Unit (RPDU), Enterprise Technology Delivery, GovTechON using MERN stack</p>
						<p> Version: 1.0.0.0 </p>
						<p> Developers: </p>
						<ul>
							<li>Siran Cao - siran.cao@ontario.ca</li>
							<li>Abhi Joshi - abhi.joshi@ontario.ca</li>
							<li>Xin Lyu - xin.lyu@ontario.ca</li>
						</ul>
						<hr />
						<h3>Feedback</h3>
						<p><a href="https://web.yammer.com/main/org/ontario.ca/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiI5MDY1ODczNDA4MCJ9/new" target="_blank" rel="noreferrer">Join our community</a> on yammer to learn more about low-code and Power-Apps</p>
						<br />
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
				</div>
			</div>
		</Layout>
	)

}


export const Head = () => <Seo title="Kudos Page" />

export default AboutPage
