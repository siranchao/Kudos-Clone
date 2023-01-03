import * as React from "react"

import { Grid } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
//import { useAsync } from "react-async-hook"
import ResizeObserver from "react-resize-observer";
import TextField from '@mui/material/TextField';


////Giphy API key
const giphyFetch = new GiphyFetch("pPpjPbnxhrccqEzHjNvYuQ7tW1JcCbsE")


function GifGrid({ onGifClick }) {
    const [keyword, setKeyword] = React.useState("");
    const handleGiphySearch = event => {
        setKeyword(event.target.value)
    }

    const fetchGifs = (offset) => {
        if (keyword) {
            return giphyFetch.search(keyword, { offset, limit: 10 });
        } else {
            return giphyFetch.trending({ offset, limit: 10 });
        }

    }

    const [width, setWidth] = React.useState(window.innerWidth);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ display: 'inline-block' }}>Select Your Gif</h5>

                <div style={{
                    textAlign: `right`
                }}>
                    <TextField
                        id="giphy-search"
                        label="Search Gif"
                        placeholder="Search Gif"
                        sx={{ m: 1, width: 300, minWidth: 100 }}
                        onChange={handleGiphySearch}
                        style={{
                            textAlign: `center`,
                        }}
                    />

                </div>

            </div>


            <div style={{ overflow: "scroll", height: "600px" }}>

                <Grid
                    key={keyword}
                    onGifClick={onGifClick}
                    fetchGifs={fetchGifs}
                    limit={30}
                    width={width}
                    columns={4}
                    gutter={6}
                />
                <ResizeObserver
                    onResize={({ width }) => {
                        setWidth(width);
                    }}
                />
            </div>
        </div>
    );
}

export default GifGrid