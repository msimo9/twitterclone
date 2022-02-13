import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContent:{
        width: "80%",
        height: "35%",
        justifyContent: "center"
    },
    mainContentTitle:{
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },
    footer:{
        position: "absolute",
        bottom: Constants.statusBarHeight,
        width: "80%",
        flexDirection: "row",
    },
    footerNormalText:{
        fontSize: 12,
        color: "gray",
        marginRight: 5,
    },
    footerLinkText:{
        fontSize: 12,
        color: "#1DA1F2"
    },
});

export default styles;