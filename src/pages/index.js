import * as React from "react"
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Banner from "../components/Banner"
import * as styles from "../styles/index.module.css"

const IndexPage = () => (
  <Layout>

    {/* <AuthenticatedTemplate>
        <h1>Authenticated</h1>
    </AuthenticatedTemplate>

    <UnauthenticatedTemplate>
        <h1>Unauthenticated</h1>
    </UnauthenticatedTemplate> */}

    <Seo title="Home" />
    <div>
      <Banner />
    </div>
    <div style={{
      margin: `0 auto`,
      maxWidth: `var(--size-content)`,
      padding: `var(--size-gutter)`,
    }}>
      <div className="ontario-callout">
        <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos</h2>
        <p className={styles.paragraph}><strong>5</strong> Kudos created in the past 7 days, <strong>102</strong> Kudos created in total, <strong>55</strong> people has joined Kudos App!</p>
        <p className={styles.paragraph}><Link to="/login">Sign up for email reminders</Link> and we’ll notify you 60 and 30 days before your licence expires.</p>
      </div>

      <div className={styles.entryBtnGroup}>
        <div className={styles.btnBox}>
          <Link to='/home' className="ontario-button ontario-button--primary">Gather & give Kudos</Link>
          <p className={styles.infoText}>Here you can customize and create your own kudos from variety of templates we provide and send to anyone you wish!</p>
        </div>

        <div className={styles.btnBox}>
          <Link to='/myKudos' className="ontario-button ontario-button--secondary">Check my Kudos</Link>
          <p className={styles.infoText}>Check any Kudos you received from other colleagues and you can collect any Kudos your like!</p>
        </div>

      </div>

    </div>

  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
