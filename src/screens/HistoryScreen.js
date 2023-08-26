import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable, ScrollView, TextInput} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { collection, deleteDoc, doc, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";

const HistoryScreen = () => {


    const [logs, setLogs] = useState([])
    const [updatedText, setUpdatedText] = useState('')

    useEffect(() => {
        const collectionRef = collection(db, 'fightLog')
        getDocs(collectionRef)
        .then((snapshot) => {
            let temp = []
            snapshot.docs.forEach((doc) => {
                temp.push({...doc.data(), id: doc.id})
            })
            setLogs(temp)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const deleteLog = (id) => {
        deleteDoc(doc(db, 'fightLog', id))
        .then(()=> {
            let existingLogs = [...logs].filter(log => log.id !== id)
            setLogs(existingLogs)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const updateLog = (id) => {
        console.log(updatedText)
        const documentRef = doc(db, "fightLog", id);
        if (updatedText)
        {
            updateDoc(documentRef, {
                reason: updatedText
            })
            .then(() => {
                let existingLogs = [...logs]
                const updateIndex = logs.findIndex(log => log.id = id)
                existingLogs[updateIndex].reason = updatedText
                setLogs(existingLogs)
                setUpdatedText(undefined)
            })
            .catch((error) => {
                alert(error)
            })
        }
    }

    
    return (
        <SafeAreaView>
            <ScrollView>
                {logs.map((item, key) => {
                    return(
                        <View key={key}>
                            <TextInput
                            defaultValue={item.reason}
                            onChangeText={(text) => setUpdatedText(text)}
                            />
                            <Text>
                                {item.date.toDate().toDateString()}
                            </Text>
                            <Text>
                                {item.id}
                            </Text>
                            <Pressable style={{padding: 20}} onPress={() => updateLog(item.id)}>
                                <Text>
                                    Update Log
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => deleteLog(item.id)}>
                                <Text>
                                    Delete Log
                                </Text>
                            </Pressable>
                        </View>
                    )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const history = StyleSheet.create({
    buttons: {
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#7f70db',
        borderRadius: 5
    }
});

export default HistoryScreen