import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    contentContainer:{
        flex: 1,
        width: "90%",
        height: "100%",
        marginTop: "30%",
        fontWeight: "700",
        alignItems: "center",
    },
    titleContainer:{
        marginBottom: 20,
    },
    mainContentTitle:{
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonContainerActive:{
        flex: 1,
        width: "100%",
        height: 30,
        position: "absolute",
        justifyContent: "center",
        bottom: 50,
    },
    buttonContainerInactive:{
        flex: 1,
        width: "100%",
        height: 30,
        position: "absolute",
        justifyContent: "center",
        bottom: 50,
        opacity: 0.6,
    },
    nextButton:{
        width: "100%",
        height: 30,
        borderRadius: 15,
        backgroundColor: "#1DA1F2",
        justifyContent: "center",
        alignItems: "center",
    },
    nextTitle:{
        fontWeight: "700",
        fontSize: 12,
        color: "#FFFFFF"
    },
    forgotPassword:{
        fontWeight: "700",
        fontSize: 12,
        color: "#FFFFFF",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    revealPassword:{
        color: "#1DA1F2",
        fontSize: 10,
        textAlign: "right",
        width: "100%"
    }
});

export default styles;