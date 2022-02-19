import { StyleSheet, Text, View, Linking} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const LinkWord = (props) => {
    return(
        <Text onPress={() => Linking.openURL(props.url)} style={styles.linkText}>{props.text}</Text>
    )
}

const TermsOfAgreement = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>By signing up, you agree to our </Text>

        <LinkWord text={"Terms"} url={'https://twitter.com/en/tos'}/>

      <Text style={styles.text}>, </Text>

        <LinkWord text={"Privacy Policy"} url={'https://twitter.com/en/privacy'} />

      <Text style={styles.text}>, and </Text>

        <LinkWord text={"Cookie Use"} url={'https://help.twitter.com/en/rules-and-policies/twitter-cookies'} />

      <Text style={styles.text}>.</Text>
    </View>
  )
}

export default TermsOfAgreement

const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    text:{
        fontSize: 12,
        color: "gray",
    },
    linkText:{
        fontSize: 12,
        color: "#1DA1F2",
    }
})