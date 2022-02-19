import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import Constants from 'expo-constants';

const CancelButton = (props) => {
    return(
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    )
  }
  

export default CancelButton

const styles = StyleSheet.create({

    cancelButton:{
        position: "absolute",
        left: "5%",
        top: Constants.statusBarHeight,
        height: "8%",
        justifyContent: "center",
        alignItems: "center"
    },
    cancelButtonText:{
        color: "#FFFFFF",
        fontSize: 18,
    },


})