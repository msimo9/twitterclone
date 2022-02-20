import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native'
import React, {useState} from 'react'
import styles from '../styles/ProfileStyle';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfile from '../components/ModalScreens/EditProfile';
import LightboxComponent from '../components/ModalScreens/LightboxComponent';

const Header = (props) => {
  return(
    <View
      style={[styles.header, props.offset<50 ? {marginTop: -props.offset} : {marginTop: -50}]}
    >
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={[styles.headerButton, props.modalVisibility ? {display: "none"} : null ]}
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

  const initialImageSize = 80;
  const [imageSize, setImageSize] = useState(initialImageSize);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [lightboxVisibility, setLightboxVisibility] = useState(false);

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

  const profilePicture = useSelector(state => state.profilePicture);
  return (
    <ScrollView
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
    </ScrollView>
  )
}

export default ProfileScreen