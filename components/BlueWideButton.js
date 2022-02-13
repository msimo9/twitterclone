import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const BlueWideButton = (props) => {
  return (
    <TouchableOpacity
        style={styles.button}
        onPress={props.action}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default BlueWideButton

const styles = StyleSheet.create({
    button:{
        marginVertical: 10,
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1DA1F2",
        borderRadius: 15,
    },
    text:{
        color: "#FFFFFF",
        fontWeight: "bold",
    }
})