import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Gif} from "@giphy/react-components";

import SearchName from "./Steps/SearchName";
import GifGrid from './Steps/GifGrid';
import Message from './Steps/Message';
import { useState, useEffect } from "react"



const steps = ['Select Receiver', 'Choose a Gif', 'Send Your Message'];


export default function HorizontalLinearStepper({clicked,setClick}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    //Kudo State for Context
    const [newMessage, setNewMessage] = React.useState('')
    const [receiver, setReceiver] = React.useState([])

    const [sender, setSender] = useState("")
    const [gif, setGif] = useState("")

    const addMessage = (message) => {
        setNewMessage(message)
    }

    const onGifClick = (gif,event)=> {
        event.preventDefault();
        setGif(gif);
    }


    const addReceiver = (name) => {   
        setReceiver([...receiver, name]);
    }


    //switch from different components
    const SwitchStages = ({ activeStep, addMessage, addReceiver, onGifClick}) => {
        switch (activeStep) {
            case 0:
                return <SearchName addReceiver={addReceiver} />
            case 1:
                return <GifGrid onGifClick={onGifClick}/>
            case 2:
                return <Message addMessage={addMessage} />
            case 3:
                return <Message />
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
    };

    useEffect(() => {
        if(clicked){
            //do something below
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

            <div>
                <SwitchStages activeStep={activeStep} addMessage={addMessage} addReceiver={addReceiver} onGifClick={onGifClick} />
                <hr />
                <h4>{activeStep}</h4>
                <h4>{sender}</h4>              
                <h4>{receiver}</h4>
                {gif &&(
                    <Gif gif={gif} width={200} />
                )                    
                }
                <h4>{newMessage}</h4>
            </div>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ my: 4, mx: 'auto', textAlign: 'center', fontSize: 'h6.fontSize' }}>
                        All steps completed - Your Kudo is ready to send!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
