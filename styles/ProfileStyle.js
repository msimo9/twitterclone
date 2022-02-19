import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        width: "100%",
        height: "100%",
    },
    text:{
        color: "#FFFFFF"
    },
    header:{
        width: "100%",
        height: 150,
        backgroundColor: "#1DA1F2",
        alignItems: "center",
    },
    profilePicture:{
        borderRadius: 40,
        borderColor: "#000000",
        borderWidth: 5,
        marginTop: -40,
        marginLeft: 20,
    },
    headerButtons:{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "90%",
        marginTop: 20,
    },
    headerButton:{
        backgroundColor: "#083957",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    }

});

export default styles;