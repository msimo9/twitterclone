import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        width: "100%",
        height: "100%",
    },
    text:{
        color: "#FFFFFF",
        fontWeight: "600"
    },
    header:{
        width: "100%",
        height: 150,
        backgroundColor: "#1DA1F2",
        alignItems: "center",
    },
    subHeader:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingBottom: 10,
        borderColor: "white",
        borderWidth: 0.5,
    },
    profilePicture:{
        borderRadius: 40,
        borderColor: "#000000",
        borderWidth: 5,
        marginTop: -40,
        marginLeft: 20,
    },
    editProfile:{
        borderColor: "#FFFFFF",
        borderWidth: 0.5,
        height: 30,
        borderRadius: 15,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
    },
    profileData:{
        borderColor: "white",
        borderWidth: 0.5,
        width: "100%",
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