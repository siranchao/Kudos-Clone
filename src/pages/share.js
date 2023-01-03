import * as React from "react"
import Card from "../components/Card"
import Layout from "../components/layout"
import Seo from "../components/seo"


const ShareKudos = ({ location }) => {

    const search = new URLSearchParams(location.search)
    const query = search.get("query")

    const [kudo, setKudo] = React.useState([])

    const kudoShare = id => {
        navigator.clipboard
            .writeText(`${location.origin}/share/?query=${id}`)
            .then(() => {
                alert("Kudo Link Copied!")
            })
            .catch(() => {
                alert("Something went wrong when copying URL!")
            })
    }

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://rpdukudos-api.azurewebsites.net/api/kudos');
            const rawData = await res.json();
            setKudo(rawData.data.filter(data => data._id === query))
        }
        fetchData();
    }, [])


    return (
        <div>
            <Layout>
                <div style={{
                    margin: `0 auto`,
                    maxWidth: `var(--size-content)`,
                    padding: `var(--size-gutter)`,
                    minHeight: `70vh`
                }}>
                    <h3>My Shared Kudos</h3>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {kudo.map(ele => {
                            return <Card key={ele._id} kudos={ele} kudoShare={kudoShare} user={null} type={'full'} />
                        })}
                    </div>
                </div>
            </Layout>
        </div>

    )
}

export const Head = () => <Seo title="Kudos Page" />

export default ShareKudos
