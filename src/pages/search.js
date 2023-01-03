import React, { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

import { callMsGraph, searchMsGraphUsers } from "../utils/MsGraphApiCall";

const SearchComponent = () => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [graphData, setGraphData] = useState(null);
    const [searchTerms, setSearchTerms] = useState('');

    // user has to be logged in to be able to search graph
    useEffect(() => {
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

    return (
        <div>
            {/* { graphData ? <ProfileData graphData={graphData} /> : null } */}
            Search Users<br /><br />
            <input type="text" onChange={(e) => setSearchTerms(e.target.value)} />
            {
                graphData?.map((item, i) => {
                    return (
                        <div key={item.id}>{item.displayName} - ({item.mail})</div>
                    );
                })
            }
        </div>
    );
};

const Search = () => {

    return (
        <div>
            <SearchComponent />
        </div>
    )
};

export default Search;