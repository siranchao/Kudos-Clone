import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Banner from "../components/Banner"
import * as styles from "../styles/index.module.css"

//import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";

const IndexPage = () => {

  //User Auth
  const isAutheticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;

  //LOGIN LOGOUT
  const handleLogin = () => {
    instance.loginRedirect().catch(e => {
      console.log(e);
    });
  }
  const handleLogout = () => {
    instance.logoutRedirect();
  }

  const [kpi, setKpi] = React.useState({})

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://rpdukudos-api.azurewebsites.net/api/kudos/kpi');
      const data = await res.json();
      setKpi(data);
    }

    fetchData();
  }, [])

  return (
    <Layout>

      {/* <AuthenticatedTemplate
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
          {isAutheticated ?
            <div>
              <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos, {name}</h2>
              <p className={styles.paragraph}><strong>{kpi.recent}</strong> Kudos created in the past 30 days, <strong>{kpi.total}</strong> Kudos created in total. </p>
              <p className={styles.paragraph}>You can <a className={styles.link} onClick={handleLogout}>click here</a> to Logout the app.</p>
            </div>
            :
            <div>
              <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos!</h2>
              <p className={styles.paragraph}><strong>{kpi.recent}</strong> Kudos created in the past 30 days, <strong>{kpi.total}</strong> Kudos created in total. </p>
              <p className={styles.paragraph}>No need to sign up, just <a className={styles.link} onClick={handleLogin}>click Login</a> and you are ready to play!</p>
            </div>
          }

        </div>

        <div className={styles.entryBtnGroup}>
          <div className={styles.btnBox}>
            <Link to='/giveKudos' className="ontario-button ontario-button--primary">Create New Kudo</Link>
            <p className={styles.infoText}>Here you can customize and create your own special kudos from variety of templates </p>
          </div>

          <div className={styles.btnBox}>
            <Link to='/myKudos' className="ontario-button ontario-button--secondary">Check My Kudos</Link>
            <p className={styles.infoText}>Here you can check out those Kudos you just sent or received from other colleagues </p>
          </div>

        </div>

      </div>

    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
