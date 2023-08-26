import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TextInput, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Calendar} from 'react-native-calendars';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signOut } from "firebase/auth";


const HomeScreen = ({navigation}) => {
    // Assign state variables to screen
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);
    const [isRunning] = useState(true);

    // Check user sign-out
    const handleSignOut = () => {
      signOut(auth)
      .catch((error) => {
        alert(error)
      })
    }
    
    // Reset the timer
    const reset = () => {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setDays(0);
    }
    
    // For every second, update time metrics
    useEffect(() => {
      // Set interval for timer
      let interval;
      if (isRunning){
        interval = setInterval(() =>{
          setSeconds((seconds) => seconds + 1);
          if (seconds == 60)
          {
            setSeconds(0);
            setMinutes((minutes) => minutes + 1);
          }
          if (minutes == 60)
          {
            setMinutes(0);
            setHours((hours) => hours + 1);
          }
          if (hours == 24)
          {
            setHours(0);
            setDays((days) => days + 1);
          }
        }, 1000);
      }
      // Continue calling function till app is closed
      return () => clearInterval(interval)
    }, [seconds, minutes, hours, days])
    // Rerun function everytime state is changed
  
    return (
      <SafeAreaView style={home.container}>
        <View style={home.daysContainer}>
          <Text style={home.title}>
            Time Since Last Fight
          </Text>
          <Text style={home.timer}>
            {days} Days
          </Text>
          <Text style={home.timer}>
            {hours} Hours
          </Text>
          <Text style={home.timer}>
            {minutes} Minutes
          </Text>
          <Text style={home.timer}>
            {seconds} Seconds
          </Text>

          <Pressable style={home.button} onPress={reset}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Reset Timer
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={home.button} onPress={() => navigation.navigate('History')}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Historyyy
            </Text>
          </Pressable>

          <Pressable style={home.button} onPress={() => navigation.navigate('Calendar')}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Calendar
            </Text>
          </Pressable>
          
          <Pressable style={home.button} onPress={handleSignOut}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
}

const home = StyleSheet.create({
    daysContainer: {
      alignItems: 'center'
    },
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      height: '100%'
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      padding: 20,
    },
    button: {
      margin: 30,
      padding: 10 ,
      backgroundColor: '#7e58d6',
      borderRadius: 10
    },
    timer: {
      fontSize: 20,
      padding: 20
    },
  });

export default HomeScreen