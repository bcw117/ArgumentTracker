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
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../../firebaseConfig";
import { sendEmailVerification, reload } from "firebase/auth";

const EmailVerification = ({ navigation }) => {
  const resendEmail = () => {
    sendEmailVerification().then(() => {
      alert("Email sent");
    });
  };

  const checkVerified = () => {
    reload(auth.currentUser);
  };

  return (
    <SafeAreaView>
      <Text>Please verify your email before accessing the app</Text>
      <Pressable onPress={() => resendEmail()}>
        <Text>Resend</Text>
      </Pressable>
      <Pressable style={emailVerify.button} onPress={() => checkVerified()}>
        <Text>Proceed</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const emailVerify = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    padding: 20,
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  input: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontFamily: "Roboto-Regular",
  },
});

export default EmailVerification;
