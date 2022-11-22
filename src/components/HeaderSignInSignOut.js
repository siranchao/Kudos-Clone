import React from 'react';
import { useIsAuthenticated } from "@azure/msal-react";

import { SignoutButton } from '../components/SignoutButton';
import { SigninButton } from '../components/SigninButton';

export const HeaderSignInSignOut = () => {
    const isAutheticated = useIsAuthenticated();

    return (
        <>
            {
                isAutheticated ? <SignoutButton /> : <SigninButton />
            }
        </>
    )
};
