import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tweet = (props) => {
  return (
    <View style={styles.tweetContainer}>
        <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/twitterclone-cbd8e.appspot.com/o/default_profile_400x400.png?alt=media&token=036b7057-da16-4269-a2d9-a4e767b31772"}} style={styles.image} />
        <View style={styles.contentContainer}>
            <Text style={styles.itemText}>{props.date}</Text>
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
    }
})