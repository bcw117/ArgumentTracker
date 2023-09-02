import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TextInput, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { auth } from '../../firebaseConfig';
import { updateEmail } from "firebase/auth";
import { db } from '../../firebaseConfig';
import { updateDoc, doc } from "firebase/firestore"; 



const ChangeEmailScreen = ({navigation}) => {

  const [newEmail, setEmail] = useState('')

  const changeEmail = () => {

    const docRef = doc(db, "users", auth.currentUser.uid)

    if (newEmail === auth.currentUser.email)
    {
        return alert("Same email as current account")
    }

    updateEmail(auth.currentUser, newEmail)
    .then(() => {
        updateDoc(docRef, {
            email: newEmail
        })
        .then(() => {
            return alert("Email has been successfully changed!")
        })
        .catch((error) => {
            console.log(error)
        })
    })
    .catch((error) => {
        console.log(error)
    })
  }


  return (
    <SafeAreaView>
        <TextInput
        style={styles.input}
        placeholder="Enter your new email"
        onChangeText={newText => setEmail(newText)}
        />
        <Pressable style={styles.button} onPress={() => changeEmail()}>
          <Text>
            Submit
          </Text>
        </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    padding: 20,
  },
  button: {
    backgroundColor: '#3B71F3',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5
  },
  input: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontFamily: 'Roboto-Regular',
  },
});

export default ChangeEmailScreen