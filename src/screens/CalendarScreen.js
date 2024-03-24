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
  ScrollView,
} from "react-native";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { KeyboardAvoidingView } from "react-native";

const CalendarScreen = () => {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

  const addLog = () => {
    let tempDate = new Date(date);
    tempDate = new Date(
      tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset())
    );

    if (!text || !date) {
      return alert("You have not entered a valid reason/date");
    }

    addDoc(collection(db, "fightLog"), {
      user_id: auth.currentUser.uid,
      reason: text,
      date: tempDate,
    })
      .then(() => {
        setText("");
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>Calendar</Text>
        <Calendar
          style={{
            borderRadius: 5,
            padding: 10,
            borderTopColor: "gray",
            borderBottomColor: "gray",
            borderWidth: 1,
            height: 375,
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
        <View style={styles.textBox}>
          <Text
            style={{
              fontFamily: "Proxima-Nova",
              fontWeight: "bold",
              fontSize: 20,
              padding: 5,
              marginBottom: 5,
            }}
          >
            Reason:
          </Text>
          <TextInput
            style={styles.textInputBox}
            placeholder="Type your problem here!"
            placeholderTextColor="#b7b8b6"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />
          <Pressable style={styles.submitButton}>
            <Text
              style={{
                fontFamily: "Proxima-Nova",
                textAlign: "center",
                fontSize: 16,
              }}
              onPress={() => addLog()}
            >
              Submit
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Nexa-Bold",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 15,
    padding: 20,
  },
  textBox: {
    backgroundColor: "#ab69e0",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  textInputBox: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#FFFCF1",
    borderWidth: 1,
    width: 340,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  submitButton: {
    width: 70,
    marginTop: 10,
    marginLeft: 3,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default CalendarScreen;
