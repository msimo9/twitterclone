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
        width: "100%",
        paddingHorizontal: "5%",
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
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
    },
    pf_name:{
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: 2.5,
        fontSize: 16,
    },
    pf_username:{
        color: "gray",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 10,
    },
    pf_bio:{
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 10,
    },
    pf_rest:{
        color: "gray",
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 10,
        marginRight: 20,
    },
    pf_numbers:{
        color: "#FFFFFF",
        marginRight: 3.5,
        fontWeight: "bold",
    }


});

export default styles;