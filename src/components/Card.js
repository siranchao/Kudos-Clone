import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { Gif } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
import { useAsync } from "react-async-hook"

import * as styles from '../styles/home.module.css'


//Giphy API key
const gf = new GiphyFetch("pPpjPbnxhrccqEzHjNvYuQ7tW1JcCbsE")

const GifDisplay = ({ gifID }) => {
    const [gif, setGif] = React.useState(true)
    useAsync(async () => {
        if (gifID !== null) {
            const { data } = await gf.gif(gifID)
            setGif(data)
        }
    }, [])

    return gif === true ? null : <Gif style={{ display: "block", margin: "0 auto" }} gif={gif} width={200} />
}


export default function RecipeReviewCard({ id, kudos, kudoShare, user, type }) {
    const colorList = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]
    const randomColor = () => {
        return colorList[Math.floor(Math.random() * colorList.length)]
    }

    const [likedBtn, setLikedBtn] = React.useState(false);
    const [thumbUpBtn, setThumbUpBtn] = React.useState(false);
    const [thumbUpNum, setThumbUpNum] = React.useState(kudos.likes)

    const handleThumbUp = async () => {
        const num = thumbUpBtn ? thumbUpNum - 1 : thumbUpNum + 1
        try {
            await fetch(`https://rpdukudos-api.azurewebsites.net/api/kudos/thumbUp/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number: num
                    })
                })

        } catch (error) {
            console.error(error)
        }

        thumbUpBtn ? setThumbUpNum(thumbUpNum - 1) : setThumbUpNum(thumbUpNum + 1)
        setThumbUpBtn(!thumbUpBtn)
    }

    const handleLikedClick = async () => {
        const clickType = likedBtn ? 'dislike' : 'like'

        try {
            await fetch(`https://rpdukudos-api.azurewebsites.net/api/kudos/like/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: user,
                        type: clickType
                    })
                })

        } catch (error) {
            console.error(error)
        }
        setLikedBtn(!likedBtn)
    }

    const handleShareClicked = () => {
        kudoShare(id);
    }

    return (

        <Card sx={{ maxWidth: 345, boxShadow: 10 }} className="d-flex flex-column" >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                        {kudos.sender[0]}
                    </Avatar>
                }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={kudos.sender}
                subheader={kudos.createdAt.split('T')[0]}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Send Kudos to {kudos.receiver.map(ele => <strong>@{ele}  </strong>)}
                </Typography>
            </CardContent>
            <CardContent>
                <GifDisplay gifID={kudos.kudoGif} />
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <strong>"{kudos.message}"</strong>
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='mt-auto' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className={styles.rowSection}>

                    <div className={styles.leftSection}>
                        <IconButton aria-label="like"
                            color={likedBtn === true ? "primary" : "default"}
                            onClick={handleLikedClick}>
                            <FavoriteIcon />
                        </IconButton>


                        <IconButton aria-label="share"
                            onClick={handleShareClicked}>
                            <ShareIcon />
                        </IconButton>
                    </div>

                    <IconButton aria-label="thumbUp"
                        color={thumbUpBtn === true ? "primary" : "default"}
                        onClick={handleThumbUp}>
                        <ThumbUpIcon />
                        {thumbUpNum > 0 && <span style={{ fontSize: '1.2rem', paddingLeft: '.5rem' }}>{thumbUpNum}</span>}
                    </IconButton>

                </div>
            </CardActions>
        </Card>
    );
}
