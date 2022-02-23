import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const Tweet = (props) => {
    const [isImageReady, setIsImageReady] = useState(false);
    const [image, setImage] = useState("");
    const [isUserDataReady, setUserDataReady] = useState(false);
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const tweetAdded = useSelector(state => state.tweetAdded);

    //tweet age
    const d = new Date();
    let time = d.getTime();
    let tweetAge = time - props.time_ms;
    tweetAge = Math.floor(tweetAge/1000);
    if(tweetAge <= 59) tweetAge += " s";
    if(tweetAge > 59){
        tweetAge = Math.floor(tweetAge/60);
        if(tweetAge <= 59) tweetAge += " m";
    }
    if(tweetAge > 59){
        tweetAge = Math.floor(tweetAge/60);
        if(tweetAge <= 23) tweetAge += " h";
    }
    if(tweetAge > 23){
        tweetAge = Math.floor(tweetAge/24);
        tweetAge += " d";
    }

    const getUserData = async() => {
        const querySnapshot = await getDocs(collection(db, "userinfo"));
        querySnapshot.forEach((doc) => {
            if(doc.data().userID === props.userID){
                setUsername(doc.data().username);
                console.log(username);
                setFullname(doc.data().fullName);
                console.log(fullname);
            }
        });
    }

    const getProfilePicture = async() =>{
        const storage = getStorage();
        const sampleProfilePhoto = "https://firebasestorage.googleapis.com/v0/b/twitterclone-cbd8e.appspot.com/o/default_profile_400x400.png?alt=media&token=036b7057-da16-4269-a2d9-a4e767b31772";
        const profilePhotoUrl = await getDownloadURL(ref(storage, props.userID+'/profilePicture/profilePhoto.jpg'));
        if(profilePhotoUrl.length > 0){
            setIsImageReady(true);
            setImage(profilePhotoUrl);
        }
    }

    useEffect(() => {
        getProfilePicture();
    },[isImageReady, tweetAdded])

    useEffect(() => {
        getUserData();
    },[isUserDataReady, tweetAdded])
    
    const searchString = "https://firebasestorage.googleapis.com/v0/b/twitterclone-cbd8e.appspot.com/o/" + props.userID + "%2FprofilePicture%2FprofilePhoto.jpg";
    return (
        <View style={styles.tweetContainer}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.contentContainer}>
                <View style={styles.authorInfo}>
                    <Text style={[styles.itemText, {fontWeight: "bold"}]}>{fullname}</Text>
                    <Text style={styles.username}>@{username}</Text>
                    <Text style={styles.itemText}>{tweetAge}</Text>
                </View>
                <Text style={styles.itemText}>{props.text}</Text>
                <View style={styles.interactionsContainer}>
                    <View style={styles.interactionView}>
                    <Ionicons name={"chatbubble-outline"} size={16} color={"#FFFFFF"} />
                    <Text style={styles.interactionText}>{Math.floor(Math.random() * 1000 + 100)}</Text>
                    </View>
                    <View style={styles.interactionView}>
                    <Ionicons name={"repeat"} size={16} color={"#FFFFFF"} />
                    <Text style={styles.interactionText}>{Math.floor(Math.random() * 1000 + 100)}</Text>
                    </View>
                    <View style={styles.interactionView}>
                    <Ionicons name={"heart-outline"} size={16} color={"#FFFFFF"} />
                    <Text style={styles.interactionText}>{Math.floor(Math.random() * 1000 + 100)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Tweet

const styles = StyleSheet.create({
    tweetContainer:{
        borderColor: "gray",
        borderBottomWidth: 0.3,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        width: "100%",
        paddingLeft: 60,
    },
    itemText:{
        color: "#FFFFFF",
        marginVertical: 3,
    },
    image:{
        width: 40,
        height: 40,
        position: "absolute",
        left: 10,
        top: 10,
        borderRadius: 20,
    },
    contentContainer:{

    },
    interactionsContainer:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        marginTop: 10,
    },
    interactionView:{
        flexDirection: "row"
    },
    interactionText:{
        color: "#FFFFFF",
        marginLeft: 5,
        marginRight: 15,
    },
    authorInfo:{
        flexDirection: "row",
        alignItems: "center",
    },
    username:{
        color: "gray",
        marginHorizontal: 10,
    }
})