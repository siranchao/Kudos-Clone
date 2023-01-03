import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

// Msal imports
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../../authConfig";

import { callMsGraph, searchMsGraphUsers } from "../../utils/MsGraphApiCall";


export default function SearchName({ addReceiver }) {
    const [user, setUser] = React.useState([]);
    const [name, setName] = React.useState('');


    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [graphData, setGraphData] = React.useState([]);
    const [searchTerms, setSearchTerms] = React.useState('');

    //MangoDB users
    const fetchData = () => {
        return fetch("http://localhost:8000/api/users")
            .then(result => result.json())
            .then((json) => setUser(json.slice(0, 15).map(data => data.name)));

    }

    React.useEffect(() => {
        fetchData();
        //Fetch user data from Azure
        if (account && inProgress === InteractionStatus.None && searchTerms.length >= 5) {
            const request = {
                ...loginRequest,
                account: account
            };
            instance.acquireTokenSilent(request).then((response) => {
                searchMsGraphUsers(response.accessToken, searchTerms)
                    .then(response => {
                        setGraphData(response.value);
                    });
            }).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect(request);
                }
            });
        }
    }, [searchTerms]);


    const handleChange = (event, value) => {
        setName(value.displayName);
    };

    const sendName = () => {
        addReceiver(name);
    }

    return (
        < div
            style={{ margin: '2rem 0 0 1rem', textAlign: 'center' }}
        >
            <h6>You can search and add multiple receivers</h6>

            {/* <Autocomplete
                disablePortal
                onChange={handleChange} 
                id="combo-box-demo"
                options={user}
                sx={{ maxWidth: 400, minWidth: 300, m: `.75rem auto` }}
                renderInput={(params) => <TextField {...params} label="Name" />}
            /> */}
            <Autocomplete
                filterOptions={(x) => x}
                onChange={handleChange}
                id="search-name"
                getOptionLabel={(option) => option.displayName}
                options={graphData}
                renderOption={(props, option) =>
                    <li  {...props}>{option.displayName} - ({option.mail})</li>}
                sx={{ maxWidth: 400, minWidth: 300, m: `.75rem auto` }}
                onInputChange={(event, newInputValue) => {
                    setSearchTerms(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Name" />}
            />

            {/* <h6>Or</h6>
            <div style={{ maxWidth: 400, minWidth: 300, margin: `0 auto` }}>
                <TextField
                    id="input-name"
                    label="Enter Name"
                    fullWidth

                    onChange={handleChange}
                />
            </div> */}

            <div style={{ cursor: `pointer`, display: `block`, margin: `1rem auto` }} onClick={sendName}>
                <PersonAddAlt1RoundedIcon
                    color="primary"
                    fontSize="large"
                />
                <strong style={{ padding: `0 .5rem`, color: `#0066CC` }} >Add User</strong>
            </div>

        </div>

    );
}
