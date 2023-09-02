import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {

    const [fullname, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Create a new user using inputs from user and store in database
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            setDoc(doc(db, 'users', cred.user.uid), {
                id: cred.user.uid,
                name: fullname,
                email: email
            })
            .catch(error => {
                alert(error)
            })
        })
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: username
            })
        })
        .catch((error) => {
            alert(error)
        })
    }
    
    return(
        <SafeAreaView style={register.container}>
            <Text style={{fontSize: 25, marginBottom: 25}}>
                Register
            </Text>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={register.inner}>
                <View>
                    <TextInput style={register.input} placeholder='Full Name' 
                    onChangeText={text => setFullName(text)}
                    />
                    <TextInput style={register.input}
                    placeholder='Username'
                    onChangeText={text => setUsername(text)}
                    />
                    <TextInput style={register.input}
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                    />
                    <TextInput style={register.input}
                    placeholder='Password' 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    />

                    <Pressable style={register.button} onPress={signUp}>
                        <Text style={register.text}>
                            Register
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const register = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f9fbfc',
        height: '100%',
        width: '100%'
    },
    inner: {
        alignContent: 'center',
        width: '90%'
    },
    input: {
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    },
    button: {
        backgroundColor: '#3B71F3',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    }
  });

export default RegisterScreen