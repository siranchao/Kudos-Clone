import * as React from "react"
import { useMsal } from "@azure/msal-react";

export const SignoutButton = () => {
    const { instance, accounts } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect();
    }

    const name = accounts[0] && accounts[0].name;

    return (
        <>
            <button className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline"
                onClick={handleLogout}>
                Logout : {name}
            </button>
        </>
        
    )
};