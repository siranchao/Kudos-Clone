import * as React from "react"

import { Gif, Grid } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
//import { useAsync } from "react-async-hook"
import ResizeObserver from "react-resize-observer";

////Giphy API key
const giphyFetch = new GiphyFetch("pPpjPbnxhrccqEzHjNvYuQ7tW1JcCbsE")

function GifGrid({ onGifClick }) {
    const fetchGifs = (offset) =>
        giphyFetch.trending({ offset, limit: 10 });
    const [width, setWidth] = React.useState(window.innerWidth);
    return (
        <div style={{overflow:"scroll",height:"600px"}}>
            <h6>Select Your Gif</h6>
            <Grid
                onGifClick={onGifClick}
                fetchGifs={fetchGifs}
                limit={30}
                width={width}
                columns={3}
                gutter={6}
            />
            <ResizeObserver
                onResize={({ width }) => {
                    setWidth(width);
                }}
            />
        </div>
    );
}

export default GifGrid