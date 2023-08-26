import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import HistoryScreen from '../screens/HistoryScreen'
import CalendarScreen from '../screens/CalendarScreen'

// Create a stack for screens when user is logged in
const Stack = createNativeStackNavigator(); 

const AppStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                />
                <Stack.Screen
                    name="Calendar"
                    component={CalendarScreen}
                />
             </Stack.Navigator>
        </NavigationContainer>
        
    );
}

export default AppStack