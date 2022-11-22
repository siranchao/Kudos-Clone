import * as React from "react"
import Card from "../components/Card"
import Layout from "../components/layout"
import Seo from "../components/seo"

import data from "../data.json"
import {getKudos} from "../controller/kudoData"
import * as styles from "../styles/home.module.css"
import ScrollButton from "../components/scrollButton"


const HomePage = () => {
    const [kudos,setKudos]=React.useState([])

    React.useEffect(()=>{  
        fetch("http://localhost:8000/api/kudos")
        .then(result => result.json())
        .then((json) => {setKudos(json)});

    },[])
   
    return (
    <Layout>
        <div style={{
            margin: `0 auto`,
            maxWidth: `var(--size-content)`,
            padding: `var(--size-gutter)`,
        }}>
            <h1>Kudos Home Page</h1>
            <p>Welcome to Kudos Page</p>
            <div className={styles.kudosGrid}>
                {kudos.map(ele => {            
                    return <Card key={ele._id} kudos={ele} />
                })}
            </div>
       <ScrollButton/>
        </div>
    </Layout>
    )
}

export const Head = () => <Seo title="Kudos Page" />

export default HomePage
