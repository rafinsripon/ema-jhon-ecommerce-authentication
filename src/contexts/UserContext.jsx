import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //Sign with google
    const googleProvider = new GoogleAuthProvider();
    
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
    //Sign With Google Function
    const signWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    //Currently user StateChanged
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
        
    },[])
    
    //verify Email Address
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }
    
    const authInfo = {user, createUser, signIn, logOut, loading, signWithGoogle, verifyEmail};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;