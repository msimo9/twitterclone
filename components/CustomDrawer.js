import { StyleSheet, Text, View, Modal, Image } from 'react-native'
import React, {useState} from 'react'
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux'
import ProfileData from './ProfileData';
import { savePhoto } from '../redux/redux';

import LogOutButton from './LogOutButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, put } from "firebase/storage";
import { auth } from 'firebase/auth';
import DrawerElement from './DrawerElement';
import sideMenuData from '../data/sideMenuData';



const pickImage = async(uid) => {
    // No permissions request is necessary for launching the image library
    let file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      //console.log(file.uri);
  
      if (!file.cancelled) {

        //making a blob response out of picked image
        const response = await fetch(file.uri);
        const blob2 = await response.blob();

        //add to firebase code
        const imagePath = file.uri;
        const storage = getStorage();
        const imageFormat = imagePath.substring(imagePath.length-3);
        var storageRef = ref(storage, uid + '/profilePicture/profilePhoto.'+imageFormat);

        uploadBytes(storageRef, blob2).then((snapshot) => {
            console.log('Profile photo successfuly uploaded :)');
        });
      }
}

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

                <TouchableOpacity onPress={() => pickImage(uid)}><Text style={{color: "white"}}>ADD</Text></TouchableOpacity>
                
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