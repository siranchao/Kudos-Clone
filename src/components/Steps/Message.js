import * as React from 'react';
import TextField from '@mui/material/TextField';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';

export default function Message({ addMessage }) {
    const [message, setMessage] = React.useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        addMessage(message)
        window.scrollTo({
            top: 500,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div style={{
            textAlign: `center`,
            margin: `2rem auto`,
            maxWidth: 600,
            minWidth: 300
        }}>

            <h6>Leave Your Message Here: </h6>
            <TextField
                id="input-message"
                label="Message"
                multiline
                rows={4}
                fullWidth
                onChange={handleChange}
            />

            <div style={{ cursor: `pointer`, display: `block`, margin: `1rem auto` }} onClick={sendMessage}>
                <PostAddRoundedIcon
                    color="primary"
                    fontSize="large"
                />
                <strong style={{ padding: `0 .5rem`, color: `#0066CC` }}>Add Message</strong>
            </div>
        </div>
    );
}
