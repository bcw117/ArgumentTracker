import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TextInput, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { auth } from '../../firebaseConfig';
import { signOut } from "firebase/auth";
import { getDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';



const AccountScreen = ({navigation}) => {

  const [userData, setUserData] = useState({})

    // Check user sign-out
  const handleSignOut = () => {
    signOut(auth)
    .catch((error) => {
      alert(error)
    })
  }
  
  const getUserData = () => {
    const docRef = doc(db, "users", auth.currentUser.uid)
    getDoc(docRef)
    .then((results) => {
      setUserData(results.data())
    })
    .catch((error) => {
      return alert(error)
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <SafeAreaView style={account.container}>
      <Text style={account.title}>
          Account
      </Text>
      <View style={{alignItems: 'center'}}>
        <Text style={account.fields}>
          Name:
        </Text>
        <Text>
          {userData.name}
        </Text>
        <Text style={account.fields}>
          Username:
        </Text>
        <Text>
          {auth.currentUser.displayName}
        </Text>
        <Text style={account.fields}>
          Email: 
        </Text>
        <Text style={{marginBottom: 15}}>
          {userData.email}
        </Text>
      </View>
      <Pressable style={account.button} onPress={() => navigation.navigate('ChangePassword')}>
        <Text>
          Change Password
        </Text>
      </Pressable>
      <Pressable style={account.button}>
        <Text>
          Change Email
        </Text>
      </Pressable>
      <Pressable style={[account.button, {position: 'absolute', bottom: 0, marginBottom: 20}]} onPress={() => handleSignOut()}>
        <Text>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const account = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  fields: {
    padding: 20,
    marginVertical: 5
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
});

export default AccountScreen