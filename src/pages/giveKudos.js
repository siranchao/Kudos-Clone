import * as React from "react"

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stepper from "../components/Stepper"
//import Card from "../components/Card"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/giveKudos.module.css"


const GiveKudosPage = () => {
    const [clicked, setClick] = React.useState(false);

    const createKudos=()=>{
        setClick(true);
    }

    return(
    <Layout>
        <div style={{
            margin: `0 auto`,
            maxWidth: `var(--size-content)`,
            padding: `var(--size-gutter)`,
        }}>
            <div>
                <h1 className={styles.title}>Give a Kudo</h1>
                <Stepper clicked={clicked} setClick={setClick} />
            </div>

            <hr />

            <div>
                <h1 className={styles.title}>Preview</h1>
            </div>

            <div className={styles.sendBtn}>
                <Button variant="contained" endIcon={<SendIcon />} onClick={createKudos}>
                    Create Kudo!
                </Button>
            </div>
        </div>

    </Layout>
)}

export const Head = () => <Seo title="Give Kudos" />

export default GiveKudosPage
