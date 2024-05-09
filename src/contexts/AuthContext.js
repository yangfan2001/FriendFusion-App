// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hub } from 'aws-amplify/utils'
import { getCurrentUser, fetchUserAttributes } from '@aws-amplify/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkCurrentUser();

        const hubListenerCancel  = Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
                case 'signedIn':
                    checkCurrentUser();
                    console.log('user have been signedIn successfully.');
                    break;
                case 'signedOut':
                    console.log('user have been signedOut successfully.');
                    setUser(null);
                    break;
                case 'tokenRefresh':
                    console.log('auth tokens have been refreshed.');
                    break;
                case 'tokenRefresh_failure':
                    console.log('failure while refreshing auth tokens.');
                    break;
                case 'signInWithRedirect':
                    console.log('signInWithRedirect API has successfully been resolved.');
                    break;
                case 'signInWithRedirect_failure':
                    console.log('failure while trying to resolve signInWithRedirect API.');
                    break;
            }
        });

        return () => {
            hubListenerCancel();
        }
    }, []);

    const checkCurrentUser = async () => {
        try {
            const attributes = await fetchUserAttributes();
            console.log('User attributes: ', attributes)
            setUser(attributes);
        } catch (error) {
            console.log('No current user');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
