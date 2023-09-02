import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TextInput, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { auth } from '../../firebaseConfig';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";



const ChangePasswordScreen = ({navigation}) => {

  const [prevPass, setPrevPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const confirmNewPassword = () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      prevPass
    );
    reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
      console.log("Reauthenticated")
    })
    .catch((error) => {
      alert(error)
    })
    if (newPass === prevPass)
    {
      return (
        alert("Your new password cannot be the same as your old password")
      )
    }
    else if (newPass !== confirmPass)
    {
      return (
        alert("Your confirmation password does not match")
      )
    }
    updatePassword(auth.currentUser, newPass)
    .then(() => {
      alert("Your password has been updated")
      .then(() => {
        navigation.navigate('TabStack')
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <SafeAreaView>
        <TextInput
        style={password.input}
        placeholder="Previous Password"
        onChangeText={newText => setPrevPass(newText)}
        />
        <TextInput
        style={password.input}
        placeholder="New Password"
        onChangeText={newText => setNewPass(newText)}
        />
        <TextInput
        style={password.input}
        placeholder="Confirm Password"
        onChangeText={newText => setConfirmPass(newText)}
        />
        <Pressable style={password.button} onPress={() => confirmNewPassword()}>
          <Text>
            Submit
          </Text>
        </Pressable>
    </SafeAreaView>
  )
}

const password = StyleSheet.create({
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

export default ChangePasswordScreen