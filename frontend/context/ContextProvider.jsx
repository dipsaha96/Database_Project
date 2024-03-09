import React, { useEffect } from 'react';
import { createContext, useState } from "react";

export const StateContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        }
    }, []);
    

    const authInfo = {
        user,
        setUser,
    }

    return (
        <StateContext.Provider value={authInfo}>
            {children}
        </StateContext.Provider>
    );
};

export default ContextProvider;
