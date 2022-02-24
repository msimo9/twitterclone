import { StyleSheet, Text, View, Modal, Image } from 'react-native'
import React, {useState} from 'react'
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux'
import ProfileData from './ProfileData';
import LogOutButton from './LogOutButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DrawerElement from './DrawerElement';
import sideMenuData from '../data/sideMenuData';

const CustomDrawer = (props) => {
    const profilePicture = useSelector(state => state.profilePicture);
    const uid = useSelector(state => state.uid);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            presentationStyle={"overFullScreen"}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            onRequestClose={props.toggle}
            visible={props.visible}
        >
            <View style={styles.container}
                onPressOut={props.toggle}
            >
                <View style={styles.header}>
                    <Image style={styles.headerPicture} source={{uri: profilePicture}} />
                    <Ionicons style={styles.closeButton} onPress={props.toggle} name={"close"} size={24} color={"#FFFFFF"} />
                </View>
                
                <ProfileData />

                
                {
                    sideMenuData.map((item) => {
                        return(
                            <DrawerElement
                                navigation={props.navigation}
                                screen={item.screen}
                                iconName={item.iconName}
                                text={item.text}
                                toggle={props.toggle}
                            />
                        )
                    })
                }

                <LogOutButton navigation={props.navigation}/>
            </View>
        </Modal>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container:{
        width: "60%",
        height: "100%",
        backgroundColor: "#000000",
        marginTop: Constants.statusBarHeight,
        borderRightColor: "white",
        borderRightWidth: 0.5,
    },
    header:{
        flexDirection:"row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerPicture:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    closeButton:{
        opacity: 0.6,
    },
})