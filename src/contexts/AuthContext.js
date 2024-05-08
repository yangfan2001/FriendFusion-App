// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hub } from 'aws-amplify/utils'
import { getCurrentUser, fetchUserAttributes} from '@aws-amplify/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkCurrentUser();

        const listener = (data) => {
            if (data.payload.event === 'signIn') {
                console.log('User signed in');
                checkCurrentUser();
            } else if (data.payload.event === 'signOut') {
                console.log('User signed out');
                setUser(null);
            }
        };

        Hub.listen('auth', listener);

        
    }, []);

    const checkCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            console.log('User attributes: ', attributes)
            console.log('Current user: ', currentUser)
            setUser(currentUser);
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
