// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "3a8c4d10-8100-4181-9287-1fc148a75284",
        authority: "https://login.microsoftonline.com/cddc1229-ac2a-4b97-b78a-0e5cacb5865c",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};