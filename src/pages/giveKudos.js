import * as React from "react"

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Stepper from "../components/Stepper"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { navigate } from "gatsby"
//import * as styles from "../styles/giveKudos.module.css"


const GiveKudosPage = () => {
    const [clicked, setClick] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const handleClick = () => {
        setLoading(true)
    }

    const createKudos = () => {
        setClick(true);
        setTimeout(() => {
            setLoading(false)
            navigate('/home')
        }, "4000")
    }

    return (
        <Layout>
            <div style={{
                margin: `0 auto`,
                maxWidth: `var(--size-content)`,
                padding: `var(--size-gutter)`,
                minHeight: `70vh`
            }}>
                <div>
                    <h3>Create Your Own Kudo</h3>
                </div>
                <hr />
                <Stepper clicked={clicked} setClick={setClick} />

                <div style={{ padding: '4rem 0' }}>
                    <LoadingButton
                        sx={{ float: 'right' }}
                        variant="contained"
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        onClick={() => { handleClick(); createKudos(); }}
                        loading={loading}
                    >
                        {loading ? <span>Sending Your Kudo</span> : <span>Create Kudo!</span>}
                    </LoadingButton>
                </div>
            </div>

        </Layout>
    )
}

export const Head = () => <Seo title="Give Kudos" />

export default GiveKudosPage
