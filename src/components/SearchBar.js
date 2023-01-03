import * as React from 'react';
//import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as styles from "../styles/home.module.css"

export default function SearchBar({ option, handlekey, handleOption, sort, handleSort }) {

    const handleSlectChange = (event) => {
        handleOption(event.target.value);
    };

    const handleinputChange = (event) => {
        handlekey(event.target.value);
    }
    const handleSortChange = (event) => {
        handleSort(event.target.value)
    }

    return (
        <>
            <div style={{
                textAlign: `center`,
                margin: `2rem auto`,
                maxWidth: '100%',
                minWidth: '200px',
            }} className={styles.filter}>
                <div>
                    <Select
                        id="select-option"
                        labelId="select-option-lable"
                        value={option}
                        sx={{ m: 1, minWidth: 120 }}
                        onChange={handleSlectChange}
                    >
                        <MenuItem value="Sender">Sender</MenuItem>
                        <MenuItem value="Receiver">Receiver</MenuItem>
                        <MenuItem value="Message">Message</MenuItem>
                    </Select>

                    <TextField
                        id="input-search"
                        label="Search"
                        placeholder="Search"
                        sx={{ m: 1, width: 300, minWidth: 120 }}
                        onChange={handleinputChange}
                    />
                </div>

                <div>
                    <Select
                        id="select-option"
                        value={sort}
                        onChange={handleSortChange}
                        sx={{ m: 1, minWidth: 150 }}
                    >
                        <MenuItem value="Newest">Newest to Oldest</MenuItem>
                        <MenuItem value="Oldest">Oldest to Newest</MenuItem>
                        <MenuItem value="mostLiked">Most Liked</MenuItem>
                    </Select>
                </div>
            </div>
        </>
    );

}

// onChange={event => onChange(event.target.value)}