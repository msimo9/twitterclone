import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState} from 'react'
import styles from '../styles/ProfileStyle';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfile from '../components/ModalScreens/EditProfile';

const Header = (props) => {
  return(
    <View
      style={[styles.header, props.offset<50 ? {marginTop: -props.offset} : {marginTop: -50}]}
    >
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.headerButton}
        >
          <Ionicons name={"arrow-back"} size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
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

  const profilePicture = useSelector(state => state.profilePicture);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flex: 1}}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <Header
        navigation={navigation}
        offset={scrollOffset}
      />
      <View
        style={[
          styles.subHeader,
          scrollOffset > 0 || scrollOffset < 0 ? {zIndex: 0} : {zIndex: 99} 
        ]}>
      <Image
        resizeMode="contain"
        style={[styles.profilePicture,{height: imageSize, width: imageSize,   marginTop: -(imageSize/2)}]}
        source={{uri: profilePicture}}
      />

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