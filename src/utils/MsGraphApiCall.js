import { graphConfig } from "../authConfig";

export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function searchMsGraphUsers(accessToken, searchTerms) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    // other ways to search and filter users:
    // https://stackoverflow.com/questions/53583153/microsoft-graph-ad-users-or-people-api-to-search-all-users
    const searchUri = `${graphConfig.graphUserSearchEndpoint}?$filter=startswith(displayName,'${searchTerms}')`;

    return fetch(searchUri, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}