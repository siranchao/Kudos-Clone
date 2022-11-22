import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import { Gif } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
import { useAsync } from "react-async-hook"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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

    return gif === true ? null : <Gif gif={gif} width={200} />
}


export default function RecipeReviewCard({ kudos }) {
    const colorList = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]

    const randomColor = () => {
        return colorList[Math.floor(Math.random() * colorList.length)]
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log(kudos.createdAt.split('T')[0])
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 10 }} className="d-flex flex-column">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                        {kudos.from[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={kudos.from}
                subheader={kudos.createdAt.split('T')[0]}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Send Kudos to <strong>@{kudos.to}</strong><strong>@Receiver2 </strong>
                </Typography>
            </CardContent>
            <CardContent>
                <GifDisplay gifID={kudos.kudoGif} />
                {/* <Gif gif={gifInfo} width={200} /> */}
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {kudos.kudosMessage}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='mt-auto' >
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
}
