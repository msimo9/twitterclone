import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddTweetButton = (props) => {
  return (
    <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate("Add")}
    >
      <Ionicons name={"add"} size={32} color={"#FFFFFF"} />
    </TouchableOpacity>
  )
}

export default AddTweetButton

const styles = StyleSheet.create({
    addButton:{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#1DA1F2",
        borderRadius: 25,
        paddingHorizontal: "22%"
    }
})