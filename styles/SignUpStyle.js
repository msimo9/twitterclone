import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        flex: 1,
        alignItems: "center"
    },
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
    mainContentContainer:{
        width: "90%",
        height: "40%",
        marginTop: "30%",
        alignItems: "center",
    },
    mainContentTitle:{
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold"
    },
})

export default styles;