import { StyleSheet, Text, View, FlatList, SafeAreaView, Card } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import AppLoading from 'expo-app-loading';
import Tweet from './Tweet';

const TweetsFeed = () => {
    
    const [isReady, setIsReady] = useState(false);
    const initialTweets = [];
    const [tweets, setTweets] = useState(initialTweets);


    const getDataFromFirestore = async() => {
        let tweets_temp = [];
    
        const querySnapshot = await getDocs(collection(db, "tweets"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            tweets_temp.push(doc.data());
            console.log(doc.data());
        });
        if(tweets_temp.length>=0){
            setTweets(tweets_temp.reverse());
            setIsReady(true);
        }else{
            setTweets([{text: "No tweets found"}])
        }
    }

    useEffect(() => {
        getDataFromFirestore();
    }, [isReady])

    
    if(isReady){
    return (
        <FlatList
        style={styles.container}
        contentContainerStyle={{paddingBottom: "20%"}}
        data={tweets}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Tweet
            date={item.date}
            text={item.text}
            time={item.time}
            userID={item.userID}
            time_ms={item.time_ms}
          />
        )}
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
        marginTop: "30%",
        borderColor: "#FFFFFF",
    },
})