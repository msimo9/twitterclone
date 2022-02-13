import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';


const ContinueButton = (props) => {
  return (
    <TouchableOpacity
        style={styles.button}
        onPress={props.action}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ContinueButton

const styles = StyleSheet.create({
    button:{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#1DA1F2",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: Constants.statusBarHeight,
        right: "5%"
    },
    buttonText:{
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold"
    }
})