import * as React from "react"
import { useMsal } from "@azure/msal-react";

export const SigninButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect().catch(e => {
            console.log(e);
        });

    }

    return (
        <button className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline"
            onClick={handleLogin}>
            Login
        </button>
    )
};