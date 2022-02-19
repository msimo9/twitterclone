import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux'
import CustomDrawer from './CustomDrawer';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
//import { DrawerActions } from 'react-navigation/native';
import { savePhoto } from '../redux/redux';

const HeaderProfilePicture = (props) => {
  const profilePicture = useSelector(state => state.profilePicture);
  const uid = useSelector(state => state.uid)
  const [modalVisibility, setModalVisibility] = useState(false);
  const [image, setImage] = useState(profilePicture)
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();


  const getProfilePicture = async() =>{
    const storage = getStorage();
    
    const sampleProfilePhoto = "https://firebasestorage.googleapis.com/v0/b/twitterclone-cbd8e.appspot.com/o/default_profile_400x400.png?alt=media&token=036b7057-da16-4269-a2d9-a4e767b31772";
    const profilePhotoUrl = await getDownloadURL(ref(storage, uid+'/profilePicture/profilePhoto.jpg'));
    if(profilePhotoUrl.length > 0){
      console.log("Profile photo url: ", profilePhotoUrl);
      console.log("Profile photo url length: ", profilePhotoUrl.length);
      setIsReady(true);
      setImage(profilePhotoUrl);
      dispatch(savePhoto(profilePhotoUrl));
    }
  }

  useEffect(() => {
    getProfilePicture();
  },[isReady])

  const closeModal = () => {
    setModalVisibility(false);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisibility(true)}
    >
      <Image
        style={styles.headerPicture}
        source={{uri: image}}
      />
      <CustomDrawer visible={modalVisibility} toggle={closeModal} navigation={props.navigation}/>
    </TouchableOpacity>
    
  )
}

export default HeaderProfilePicture

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: Constants.statusBarHeight,
        left: "5%",
        height: "8%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
    },
    headerPicture:{
        width: 30,
        height: 30,
        borderRadius: 15,
    },
})