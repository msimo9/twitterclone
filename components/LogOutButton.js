import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";


const LogOutButton = (props) => {

    const userLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            props.navigation.navigate("Initial");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => userLogOut()}
        >
            <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
    )
}

export default LogOutButton

const styles = StyleSheet.create({
    container:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 50,
    },
    logOutText:{
        color: "red",
        fontWeight: "bold",
        fontSize: 12,
    }
})