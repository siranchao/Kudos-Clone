import * as React from "react"
import Card from "../components/Card"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../styles/home.module.css"
import ScrollButton from "../components/scrollButton"
import SearchBar from "../components/SearchBar"

import { useMsal } from "@azure/msal-react";
import { v4 as uuidv4 } from 'uuid';


const HomePage = ({ location }) => {
    const { accounts } = useMsal();
    const user = accounts[0] && accounts[0].localAccountId

    const [kudos, setKudos] = React.useState([])
    const [filteredKudos, setFilteredKudos] = React.useState(kudos)
    const [option, setOption] = React.useState("Sender")
    const [query, setQuery] = React.useState("")
    const [sort, setSort] = React.useState("Newest")

    const handleOption = option => {
        setOption(option)
    }
    const handlekey = input => {
        setQuery(input)
    }
    const handleSort = sort => {
        setSort(sort)
    }

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

    const filterKudos = option => {
        if (option === "Sender") {
            const searchSender = kudos.filter((item) => {
                return item.sender.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
            setFilteredKudos(searchSender)
        }
        if (option === "Receiver") {
            const searchReceiver = kudos.filter((item) => {
                return item.receiver.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
            setFilteredKudos(searchReceiver)
        }
        if (option === "Message") {
            const searchMessage = kudos.filter((item) => {
                return item.message.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
            setFilteredKudos(searchMessage)
        }
    }

    const sortKudos = sort => {
        if (sort === "Newest") {
            setKudos(kudos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        }
        if (sort === "Oldest") {
            setKudos(kudos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        }
        if (sort === "mostLiked") {
            setKudos(kudos.sort((a, b) => a.likes - b.likes))
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://rpdukudos-api.azurewebsites.net/api/kudos');
            const rawData = await res.json();
            const data = rawData.data

            if (sort === "Newest") {
                setKudos(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            }
            if (sort === "Oldest") {
                setKudos(data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
            }
            if (sort === "mostLiked") {
                setKudos(data.sort((a, b) => b.likes - a.likes))
            }
            if (query) {
                sortKudos(sort)
                filterKudos(option)
            }
        }

        fetchData()
    }, [query, option, sort])


    return (
        <Layout>
            <div style={{
                margin: `0 auto`,
                maxWidth: `var(--size-content)`,
                padding: `var(--size-gutter)`,
                minHeight: `70vh`,
            }}>
                <h3>Welcome to Kudos App</h3>
                <hr />
                <SearchBar option={option} handleOption={handleOption} handlekey={handlekey} sort={sort} handleSort={handleSort} />
                <div className={styles.kudosGrid}>
                    {query ?
                        filteredKudos.map(ele => {
                            return <Card key={uuidv4()} id={ele._id} kudos={ele} kudoShare={kudoShare} user={user} type={'full'} />
                        })
                        : kudos.map(ele => {
                            return <Card key={uuidv4()} id={ele._id} kudos={ele} kudoShare={kudoShare} user={user} type={'full'} />
                        })
                    }
                </div>
                <ScrollButton />
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Kudos Page" />

export default HomePage
