import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const SignUpInput = (props) => {
  return (
    <TextInput 
        placeholder={props.placeholder}
        placeholderTextColor={"gray"}
        value={props.value}
        onChangeText={props.action}
        style={styles.textInput}
        autoCapitalize="none"
        secureTextEntry={props.password}
    />
  )
}

export default SignUpInput

const styles = StyleSheet.create({
    textInput:{
        marginVertical: 15,
        width: "100%",
        paddingBottom: 7,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        color: "#1DA1F2"
    }
})