import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert, 
        TextInput, SafeAreaView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({navigation}) => {
    // Get email and password entered by user
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Check if user has signed in or not
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log(cred);
        })
        .catch((error) => {
            alert(error)
        })
    }
    
    return(
        <SafeAreaView style={login.container}>
            <Text style={{fontFamily: 'Nexa-Bold', fontSize: 25, marginBottom: 25}}>
                Why Are We Fighting?
            </Text>
            <Image
            style={{width: 150, height: 150, marginBottom: 10}}
            resize='contain'
            source={require('../../assets/logo.png')}>
            </Image>
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={login.inner}>
                
                <View style={login.input}>
                    <TextInput 
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                    />
                </View>
                
                <View style={login.input}>
                    <TextInput 
                    placeholder='Password' 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    />
                </View>
                <View>
                    <Pressable style={login.button} onPress={handleSignIn}>
                        <Text style={login.text}>
                            Sign In
                        </Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={login.button} onPress={() => navigation.navigate('Register')}>
                        <Text style={login.text}>
                            Don't have an account? Create one
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const login = StyleSheet.create({
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

export default LoginScreen