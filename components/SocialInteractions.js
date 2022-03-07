import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const commitToFirestore = async(id, operation, type, userID) => {
    const socialInteracionCount = doc(db, "tweets", id);
    const userData = doc(db, "userinfo", userID);
    const docSnap = await getDoc(userData);
    const userSocialInteractions = docSnap.data().socialInteractions;
    if(type === "Comment"){
        await updateDoc(socialInteracionCount, {
            comments: increment(operation === "inc" ? 1 : -1),
        });
        operation === "inc" ?
        userSocialInteractions.comments.push(id)
        :
        userSocialInteractions.comments.splice(userSocialInteractions.comments.indexOf(id), 1)
    }
    else if(type === "Retweet"){
        await updateDoc(socialInteracionCount, {
            retweets: operation === "inc" ? increment(1) : increment(-1),
        });
        operation === "inc" ?
        userSocialInteractions.retweets.push(id)
        :
        userSocialInteractions.retweets.splice(userSocialInteractions.retweets.indexOf(id), 1)
    }
    else{
        await updateDoc(socialInteracionCount, {
            likes: increment(operation === "inc" ? 1 : -1),
        });
        operation === "inc" ?
        userSocialInteractions.likes.push(id)
        :
        userSocialInteractions.likes.splice(userSocialInteractions.likes.indexOf(id), 1)
    }

    const updateUserData = doc(db, "userinfo", userID);
    await updateDoc(updateUserData, {
        socialInteractions: userSocialInteractions,
    });
}

const SocialInteractions = (props) => {

    const [commentColor, setCommentColor] = useState("#ffffff");
    const [retweetColor, setRetweetColor] = useState("#ffffff");
    const [likeColor, setLikeColor] = useState("#ffffff");

    const userID = useSelector(state => state.uid);

    const [commentCount, setCommentCount] = useState(0);
    const [retweetCount, setRetweetCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);

    const[isReady, setIsReady] = useState(false);

    const getInteractionData = async() => {
        const docRef = doc(db, "tweets", props.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setCommentCount(docSnap.data().comments);
            setRetweetCount(docSnap.data().retweets);
            setLikeCount(docSnap.data().likes);
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

        const userRef = doc(db, "userinfo", userID);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userSocialInteractions = userSnap.data().socialInteractions;

            if(userSocialInteractions.comments.indexOf(props.id) !== -1){
                setCommentColor("#008fec");
            }else setCommentColor("#ffffff");
            
            if(userSocialInteractions.retweets.indexOf(props.id)  !== -1){
                setRetweetColor("#11b271");
            }else setRetweetColor("#ffffff");
            
            if(userSocialInteractions.likes.indexOf(props.id)  !== -1){
                setLikeColor("#f81976");
            }else setLikeColor("#ffffff");

        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

        setIsReady(true);
    }

    useEffect(() => {
        getInteractionData();
    }, [isReady])

    const increaseCount = (type) => {
        if(type === "Comment"){
            setCommentCount(commentCount => commentCount+1);
        }else if(type === "Retweet"){
            setRetweetCount(retweetCount => retweetCount+1);
        }else{
            setLikeCount(likeCount => likeCount+1);
        }
        commitToFirestore(props.id, "inc", type, userID);
    }
    const decreaseCount = (type) => {
        if(type === "Comment"){
            setCommentCount(commentCount => commentCount-1);
        }else if(type === "Retweet"){
            setRetweetCount(retweetCount => retweetCount-1);
        }else{
            setLikeCount(likeCount => likeCount-1);
        }
        commitToFirestore(props.id, "dec",type, userID);
    }

    const toggleInteraction = (type) => {
        if(type === "Comment"){
            if(commentColor === "#ffffff"){
                setCommentColor("#008fec");
                increaseCount(type);
            } else{
                setCommentColor("#ffffff");
                decreaseCount(type);
            }
        }else if(type === "Retweet"){
            if(retweetColor === "#ffffff"){
                setRetweetColor("#11b271");
                increaseCount(type);
            }
            else{
                setRetweetColor("#ffffff");
                decreaseCount(type);
            }
        }else{
            if(likeColor === "#ffffff"){
                setLikeColor("#f81976");
                increaseCount(type);
            }
            else{
                setLikeColor("#ffffff");
                decreaseCount(type);
            }
        }
    }

    return (
        <View style={styles.interactionsContainer}>

            <TouchableOpacity onPress={() => toggleInteraction("Comment")}>
                <View style={styles.interactionView} >
                    <Ionicons name={commentColor !== "#ffffff" ? "chatbubble" :"chatbubble-outline"} size={16} color={commentColor} />
                    <Text style={[styles.interactionText, {color: commentColor}]}>{commentCount}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleInteraction("Retweet")}>
                <View style={styles.interactionView}>
                    <Ionicons name={"repeat"} size={16} color={retweetColor} />
                    <Text style={[styles.interactionText, {color: retweetColor}]}>{retweetCount}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleInteraction("Like")}>
                <View style={styles.interactionView}>
                    <Ionicons name={likeColor !== "#ffffff" ? "heart" :"heart-outline"} size={16} color={likeColor} />
                    <Text style={[styles.interactionText, {color: likeColor}]}>{likeCount}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SocialInteractions

const styles = StyleSheet.create({
    interactionsContainer:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        marginTop: 10,
    },
    interactionView:{
        flexDirection: "row"
    },
    interactionText:{
        marginLeft: 5,
        marginRight: 15,
    },
})