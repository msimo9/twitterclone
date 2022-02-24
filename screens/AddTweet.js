import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/AddTweetStyle'
import CancelButton from '../components/CancelButton';
import ConfirmTweet from '../components/ConfirmTweet';
import { useSelector } from 'react-redux';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

const addTweetToFirestore = async(text, uid, navigation, callback) => {
    const d = new Date();
    const month = parseInt(d.getMonth())+1;
    const date = d.getDate() +". "+month +". "+ d.getFullYear();
    const time = d.getTime();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const timeFormat = hours+":"+minutes;
    const docRef = await addDoc(collection(db, "tweets"), {
        id: Math.random(),
        userID: uid,
        text: text,
        date: date,
        time: timeFormat,
        time_ms: time,
        comments: 0,
        likes: 0,
        retweets: 0,
    });
    console.log("Document written with ID: ", docRef.id);
    navigation.navigate("Home");
}

const AddTweet = ({navigation}) => {
    const [tweetText, setTweetText] = useState('');
    const uid = useSelector(state => state.uid);
    const profilePicture = useSelector(state=>state.profilePicture)
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <CancelButton navigation={navigation} />
            <ConfirmTweet callback={()=>addTweetToFirestore(tweetText, uid, navigation)} active={tweetText.length > 0 ? true : false} />
            <View style={styles.mainContent}>
                <Image source={{uri: profilePicture}} style={styles.profilePicture} />
                <TextInput
                    style={styles.input}
                    placeholder={"What's happening?"}
                    multiline={true}
                    placeholderTextColor={"gray"}
                    autoFocus={true}
                    defaultValue={tweetText}
                    autoCapitalize="none"
                    onChangeText={value => setTweetText(value)}
                />
            </View>
            

    </KeyboardAvoidingView>
  )
}

export default AddTweet
