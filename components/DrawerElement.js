import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const DrawerElement = (props) => {

    const onPress = () => {
        props.toggle();
        props.navigation.navigate(props.screen);
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress()}
        >
            <Ionicons style={styles.icon} name={props.iconName} size={18} color={"#FFFFFF"} />
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default DrawerElement

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        height: 35,
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    icon:{
        marginRight: 15,
    },
    text:{
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 16,
    }
})