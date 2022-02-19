import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lineView}></View>

      <View>
          <Text style={styles.text}>Or</Text>
      </View>

      <View style={styles.lineView}></View>
    </View>
  )
}

export default OrDivider

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    lineView:{
        flex: 1,
        height: 1,
        backgroundColor: "white",
    },
    text:{
        color: "white",
        marginHorizontal: 10,
        fontSize: 10,
    }
})