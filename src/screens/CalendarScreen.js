import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { KeyboardAvoidingView } from "react-native";

const CalendarScreen = () => {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

  const addLog = () => {
    let tempDate = new Date(date);
    tempDate = new Date(
      tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset())
    );
    console.log(tempDate);

    setReason(text);

    if (!reason || !date) {
      return null;
    }

    addDoc(collection(db, "fightLog"), {
      user_id: auth.currentUser.uid,
      reason: text,
      date: tempDate,
    })
      .then(() => {
        setText(undefined);
        alert("Record Successfully Logged!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setDate(moment().format("YYYY-MM-DD"));
  }, []);

  return (
    <SafeAreaView style={calScreen.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={calScreen.title}>Calendar</Text>
        <Calendar
          style={{
            borderRadius: 5,
            padding: 10,
            borderTopColor: "gray",
            borderBottomColor: "gray",
            borderWidth: 1,
          }}
          theme={{
            calendarBackground: "white",
            dayTextColor: "gray",
          }}
          onDayPress={(day) => {
            setDate(moment(day.dateString).format("YYYY-MM-DD"));
            console.log(date);
          }}
          markedDates={{
            [date]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
        <View style={calScreen.infoBox}>
          <Text
            style={{
              fontFamily: "Roboto-Bold",
              position: "relative",
              color: "white",
            }}
          >
            Reason:
          </Text>
          <TextInput
            style={{ height: 40, color: "white", fontFamily: "Roboto-Regular" }}
            placeholder="Type your problem here!"
            placeholderTextColor="#b7b8b6"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
          <Pressable style={{ padding: 2 }}>
            <Text
              onPress={() => addLog()}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                color: "white",
                fontFamily: "Roboto-Bold",
              }}
            >
              Submit
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const calScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 15,
    padding: 20,
  },
  infoBox: {
    padding: 25,
    backgroundColor: "#ab69e0",
    borderRadius: 10,
    margin: 20,
  },
  calendar: {},
});

export default CalendarScreen;
