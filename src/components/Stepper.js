import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Gif } from "@giphy/react-components";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
//import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

// import CardMedia from '@mui/material/CardMedia';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import MoreVertIcon from '@mui/icons-material/MoreVert';

import SearchName from "./Steps/SearchName";
import GifGrid from './Steps/GifGrid';
import Message from './Steps/Message';
import { newKudo } from '../controller/kudoData'
//import * as styles from "../styles/giveKudos.module.css"

import { useState, useEffect } from "react"
import { useMsal } from "@azure/msal-react";

//import { Redirect } from 'react-router-dom';




const steps = ['Select Receiver', 'Choose a Gif', 'Send Your Message'];


export default function HorizontalLinearStepper({ clicked, setClick }) {
    const { accounts } = useMsal();
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    const colorList = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]
    const randomColor = () => {
        return colorList[Math.floor(Math.random() * colorList.length)]
    }

    const sender = accounts[0] && accounts[0].name.split("(")[0];

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


    //Kudo State for Context
    const [newMessage, setNewMessage] = React.useState('')
    const [receiver, setReceiver] = React.useState([])
    const [gif, setGif] = useState("")

    const addMessage = (message) => {
        setNewMessage(message)
    }

    const onGifClick = (gif, event) => {
        event.preventDefault();
        setGif(gif);
    }

    const addReceiver = (name) => {
        setReceiver([...receiver, name]);
    }


    //switch from different components
    const SwitchStages = ({ activeStep, addMessage, addReceiver, onGifClick }) => {
        switch (activeStep) {
            case 0:
                return <SearchName addReceiver={addReceiver} />
            case 1:
                return <GifGrid onGifClick={onGifClick} />
            case 2:
                return <Message addMessage={addMessage} />
            case 3:
                return <Message />
            default:
                return <p>Error</p>
        }
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        console.log(activeStep)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        window.scrollTo({
            top: 200,
            left: 0,
            behavior: 'smooth'
        });

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setReceiver([]);
        setGif("");
        setNewMessage('');

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleCreate = () => {
        newKudo(receiver, gif, newMessage, sender);
    }

    useEffect(() => {
        if (clicked) {
            //do something below
            handleCreate();

            setClick(false);
        }
    }, [clicked])

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <SwitchStages activeStep={activeStep} addMessage={addMessage} addReceiver={addReceiver} onGifClick={onGifClick} />

            {activeStep === steps.length - 1 ?
                (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, fontWeight: 'bold' }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button sx={{ fontWeight: 'bold' }} onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) :
                (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, fontWeight: 'bold' }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button sx={{ fontWeight: 'bold' }} onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    </React.Fragment>
                )
            }

            <div >
                <hr />
                <h3>Preview</h3>
                <div>

                    <Card sx={{ maxWidth: 345, boxShadow: 10, m: '0 auto', mb: 4 }} className="d-flex flex-column">
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                                    {sender ? sender[0] : ""}
                                </Avatar>
                            }
                            // action={
                            //     <IconButton aria-label="settings">
                            //         <MoreVertIcon />
                            //     </IconButton>
                            // }
                            title={sender}
                            subheader={String(date)}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Send Kudos to {receiver.map(ele =>
                                    <strong>@{ele}  </strong>
                                )}
                            </Typography>

                        </CardContent>
                        {gif && (
                            <Gif style={{ display: "block", margin: "0 auto" }} gif={gif} width={250} />
                        )
                        }
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                <strong>"{newMessage}"</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </Box >
    );
}