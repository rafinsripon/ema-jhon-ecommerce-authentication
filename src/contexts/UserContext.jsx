import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //Signup 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //log in / sign in 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    //Sign out / log out
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    //Currently user StateChanged
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
        
    },[])

    const authInfo = {user, createUser, signIn, logOut, loading};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;