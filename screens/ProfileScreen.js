import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState} from 'react'
import styles from '../styles/ProfileStyle';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = (props) => {
  return(
    <View
      style={[styles.header, props.height > 115 ? {height: props.height,} : {height: 115-(150-115)+props.offset, position: "absolute", top: 0, zIndex: 99}]}
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

  const initialHeaderSize = 150;
  const initialImageSize = 80;
  const initialOpacity = 1;
  const [imageSize, setImageSize] = useState(initialImageSize);
  const [imageOpacity, setImageOpacity] = useState(initialOpacity);
  const [headerSize, setHeaderSize] = useState(initialHeaderSize);
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y
    setScrollOffset(offsetY);
    console.log(offsetY);
    if(offsetY < 40 && offsetY >= 0){
      //console.log("-------");
      setImageSize(initialImageSize - offsetY)
      setHeaderSize(initialHeaderSize - offsetY);
      setImageOpacity(initialOpacity - (offsetY/100))
    }else if(offsetY === 0){
      setImageSize(initialImageSize);
      setHeaderSize(initialHeaderSize);
      setImageOpacity(initialOpacity)
    }
  }

  const profilePicture = useSelector(state => state.profilePicture);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flex: 1}}
      onScroll={handleScroll}
      scrollEventThrottle={10}
    >
      <Header
        height={headerSize}
        navigation={navigation}
        offset={scrollOffset}
      />
      <Image
        resizeMode="contain"
        style={[styles.profilePicture, {opacity:imageOpacity ,height: imageSize, width: imageSize, marginTop: -(imageSize/2),}]}
        source={{uri: profilePicture}}
      />
    </ScrollView>
  )
}

export default ProfileScreen