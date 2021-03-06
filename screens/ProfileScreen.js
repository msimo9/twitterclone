import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Linking} from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from '../styles/ProfileStyle';
import { useSelector } from 'react-redux';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfile from '../components/ModalScreens/EditProfile';
import LightboxComponent from '../components/ModalScreens/LightboxComponent';
import TweetsFeed from '../components/TweetsFeed';

const getProfileData = async(uid, callback, callback2) => {
  console.log("getting profile data")
  const docRef = doc(db, "userinfo", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    callback(docSnap.data());
    callback2();
  } else {
    console.log("No such document!");
  }
}

const Header = (props) => {
  return(
    <View
      style={[styles.header, props.offset<50 ? {marginTop: -props.offset} : {marginTop: -50}]}
    >
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={[styles.headerButton, props.modalVisibility ? {display: "none"} : null ]}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name={"arrow-back"} size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton, props.modalVisibility ? {display: "none"} : null ]}
        >
          <Ionicons name={"search"} size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ProfileScreen = ({navigation}) => {
  const uid = useSelector(state => state.uid);
  const initialImageSize = 80;
  const [imageSize, setImageSize] = useState(initialImageSize);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [lightboxVisibility, setLightboxVisibility] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [profileData, setProfileData] = useState({});

  const toggleIsReady = () => {
    setIsDataReady(true);
  }

  const setData = (data) => {
    setProfileData(data);
    console.log("----", profileData);
  }

  useEffect(()=>{
    getProfileData(uid, setData, toggleIsReady);
  }, []);

  useEffect(() => {

  }, [isDataReady]);

  const handleScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y
    setScrollOffset(offsetY);
    if(offsetY < 40 && offsetY >= 0){
      setImageSize(initialImageSize - offsetY)
    }else if(offsetY === 0){
      setImageSize(initialImageSize);
    }
  }

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  }

  const toggleLightbox= () => {
    console.log("do tukaj deluje")
    setLightboxVisibility(!lightboxVisibility);
  }
  const userID = useSelector(state => state.uid);
  const profilePicture = useSelector(state => state.profilePicture);
  const website = 'http://' + profileData.additionalUserInfo.website;
  console.log(profileData);
  return (
    <View
      style={[styles.container, lightboxVisibility ? {} : null]}
      contentContainerStyle={{flex: 1}}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <Header
        navigation={navigation}
        offset={scrollOffset}
        modalVisibility={modalVisibility}
      />
      <View
        style={[
          styles.subHeader,
          scrollOffset > 0 || scrollOffset < 0 ? {zIndex: 0} : {zIndex: 99} 
        ]}>
      <TouchableWithoutFeedback
        onPress={() => toggleLightbox()}
      >
        <Image
          resizeMode="contain"
          style={[styles.profilePicture,{height: imageSize, width: imageSize,   marginTop: -(imageSize/2)}]}
          source={{uri: profilePicture}}
        />
      </TouchableWithoutFeedback>
      {lightboxVisibility ? <LightboxComponent image={profilePicture} toggleModal={toggleLightbox} /> : null}

      <TouchableOpacity
        style={styles.editProfile}
        onPress={() => toggleModal()}
      >
        <Text style={[styles.text]}>Edit profile</Text>
      </TouchableOpacity>
        {modalVisibility ? <EditProfile toggleModal={toggleModal} /> : null}
      </View>

      {profileData.additionalUserInfo &&
        <View style={styles.profileData}>
          <Text style={styles.pf_name}>{profileData.additionalUserInfo.name}</Text>
          <Text style={styles.pf_username}>@{profileData.username}</Text>
          <Text style={styles.pf_bio}>{profileData.additionalUserInfo.bio}</Text>
          <View style={{flexDirection: "row", alignItems: "baseline"}}>
            <Ionicons style={{marginRight: 2.5}} name={"location-outline"} size={12} color={"gray"} />
            <Text style={styles.pf_rest}>{profileData.additionalUserInfo.location.substring(0, 25)}...</Text>

            <Ionicons style={{marginRight: 2.5}} name={"link-outline"} size={12} color={"gray"} />
            <Text
              style={[styles.pf_rest, {color: "#1DA1F2"}]}
              onPress={() => Linking.openURL(null)}
            >{profileData.additionalUserInfo.website}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "baseline"}}>
            <Ionicons style={{marginRight: 2.5}} name={"calendar-outline"} size={12} color={"gray"} />
            <Text style={styles.pf_rest}>Born {profileData.additionalUserInfo.birthDate}</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "baseline"}}>
            <Text style={styles.pf_numbers}>{profileData.following}</Text>
            <Text style={styles.pf_rest}>Following</Text>
            
            <Text style={styles.pf_numbers}>{profileData.followers}</Text>
            <Text style={styles.pf_rest}>Followers</Text>
          </View>
        </View>
      }

      <View>
      <TweetsFeed userID={userID} />
      </View>
    </View>
  )
}

export default ProfileScreen