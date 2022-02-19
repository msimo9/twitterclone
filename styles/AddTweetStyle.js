import { Dimensions, StyleSheet} from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        alignItems: "center"
    },
    mainContent:{
        width: "100%",
        height: "50%",
        marginTop: Constants.statusBarHeight*4,
        flexDirection: "row",
        padding: "2%"
    },
    profilePicture:{
        width: Dimensions.get('window').width*0.1,
        height: Dimensions.get('window').width*0.1,
        borderRadius: 20,
    },
    input:{
        width: "82%",
        height: "20%",
        color: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})

export default styles;