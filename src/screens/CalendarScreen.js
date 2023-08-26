import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TextInput} from 'react-native';
import moment from "moment";
import {Calendar} from 'react-native-calendars';
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"; 
import { KeyboardAvoidingView } from 'react-native';



const CalendarScreen = () => {
  const [date, setDate] = useState('');
  const [text, setText] = useState('');

  const addLog = () => {
    let tempDate = new Date(date)
    tempDate = new Date(tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset()))
    console.log(tempDate)

    addDoc(collection(db, "fightLog"), 
    {
      user_id: auth.currentUser.uid,
      reason: text,
      date: tempDate
    })
    setText(undefined)
    alert("Record Successfully Logged!")
  }

  useEffect(() => {
    setDate(moment().format("YYYY-MM-DD"));
  }, []);

  return(
    <KeyboardAvoidingView 
    style={calScreen.container} 
    behavior='position' >
        <Calendar
        style={calScreen.calendar}
          onDayPress={day => {
            setDate(moment(day.dateString).format("YYYY-MM-DD"));
            console.log(date)
          }}
          markedDates={{
            [date]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
        />
        <View style={calScreen.infoBox}>
          <Text style={{position: 'relative', color: 'white'}}>
            Reason:
          </Text>
          <TextInput 
            style={{height: 40, color: 'white'}}
            placeholder="Type your problem here!"
            placeholderTextColor="#b7b8b6" 
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
          <Pressable>
              <Text onPress={() => addLog()} style={{position: 'absolute', bottom: 0, right: 0, color: 'white'}}>
                Submit
              </Text>
          </Pressable>
        </View>
    </KeyboardAvoidingView>
  );
}

const calScreen = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      width: '100%',
      height: '100%'
    },
    infoBox: {
      padding: 25,
      backgroundColor: '#5090d4',
      borderRadius: 10,
      margin: 20
    },
    calendar: {
    }
});

export default CalendarScreen