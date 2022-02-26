import { StyleSheet, Text, View, FlatList, SafeAreaView, Card } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import AppLoading from 'expo-app-loading';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';

const TweetsFeed = (props) => {
    
    const [isReady, setIsReady] = useState(false);
    const initialTweets = [];
    const [tweets, setTweets] = useState(initialTweets);
    const tweetAdded = useSelector(state => state.tweetAdded);


    const getDataFromFirestore = async() => {
        let tweets_temp = [];
    
        const querySnapshot = await getDocs(collection(db, "tweets"));
        querySnapshot.forEach((doc) => {
            let obj = doc.data();
            obj["documentID"] = doc.id;
            tweets_temp.push(obj);
        });
        if(tweets_temp.length>=0){
            setTweets(tweets_temp.sort(function(a, b){return a.time_ms - b.time_ms}).reverse());
            setIsReady(true);
        }else{
            setTweets([{text: "No tweets found"}])
        }
    }

    useEffect(() => {
        getDataFromFirestore();
    }, [isReady, tweetAdded]);

    
    if(isReady){
    return (
        <FlatList
        style={styles.container}
        contentContainerStyle={{paddingBottom: "20%"}}
        data={tweets}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
        if(props.userID){
            if(props.userID === item.userID)
            return(
                <Tweet
                    id={item.documentID}
                    date={item.date}
                    text={item.text}
                    time={item.time}
                    userID={item.userID}
                    time_ms={item.time_ms}
                />
            )
        }else{
            return(
            <Tweet
                id={item.documentID}
                date={item.date}
                text={item.text}
                time={item.time}
                userID={item.userID}
                time_ms={item.time_ms}
                />
            )
        }
        }}
      />
    )
    }else{
        return(
        <View><Text>loading...</Text></View>
        )
    }
}

export default TweetsFeed;

const styles = StyleSheet.create({
    container:{
        width: "100%",
        borderColor: "#FFFFFF",
    },
})