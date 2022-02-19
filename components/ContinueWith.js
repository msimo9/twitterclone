import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ContinueWithGoogle = (props) => {
  return (
    <TouchableOpacity
        style={styles.button}
        onPress={props.action}
    >
      <Image style={styles.image} source={props.image} />
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ContinueWithGoogle

const styles = StyleSheet.create({
    button:{
        marginVertical: 10,
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        flexDirection: "row"
    },
    text:{
        color: "#000000",
        fontWeight: "700",
        marginHorizontal: 10,
    },
    image:{
      width: 20,
      height: 20,
      marginHorizontal: 10,
    }
})