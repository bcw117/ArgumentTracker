import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator} from 'react-native';

import AppStack from './AppStack'
import AuthStack from './AuthStack';

import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

// Create a root navigation that handles what stacks to render

const RootNavigation = () => {
    // Get state variables to check if user is signed in or not
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true)

    // Check to see if user has signed in or not
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user)
            {
                setUser(user)
            }
            else
            {
                setUser(null)
            }
            // isLoading is set to false once page has figured out if user is signed in or not
            setIsLoading(false)
        })
    }, [isLoading, user]) // If isLoading or user is updated, run useEffect again

    // Show a loading screen while page checks if user is signed in
    if (isLoading)
    {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }
    
    // Render page based on if user is signed in or not
    return (
        user ? <AppStack/> : <AuthStack/>
    )

}

export default RootNavigation