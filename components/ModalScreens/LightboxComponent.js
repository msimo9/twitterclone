import { StyleSheet, Text, View, Modal, Dimensions, Image, ImageBackground} from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageColors from 'react-native-image-colors'
import { BlurView, VibrancyView } from "@react-native-community/blur";


const getPrimaryColor = async(source) => {
  console.log(source);

  const result = await ImageColors.getColors(src, {
    fallback: '#228B22',
    cache: true,
    key: 'unique_key',
  })

  switch (result.platform) {
    case 'android':
      // android result properties
      const vibrantColor = result.vibrant
      break
    case 'web':
      // web result properties
      const lightVibrantColor = result.lightVibrant
      break
    case 'ios':
      // iOS result properties
      const primaryColor = result.primary
      break
    default:
      throw new Error('Unexpected platform key')
  }
}

const LightboxComponent = (props) => {

  useEffect(() => {
    getPrimaryColor(props.image);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      presentationStyle={"overFullScreen"}
    >
      <ImageBackground
      blurRadius={100}
      source={{uri: props.image}}
      style={styles.wrapperView}
      >
      <View style={styles.container}>
        <Ionicons onPress={props.toggleModal} name={"close"} size={24} color={"#FFFFFF"} style={styles.closeButton} />
        <Image
          source={{uri: props.image}}
          style={styles.picture}
        />
      </View>
      </ImageBackground>
    </Modal>
  )
}

export default LightboxComponent

const styles = StyleSheet.create({
  wrapperView:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
},
  container:{
    width: Dimensions.get('window').height / 2,
    height: Dimensions.get('window').height / 2,
    backgroundColor: "#000000",
  },
  closeButton:{
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 2,
  },
  picture:{
    width: "100%",
    height: "100%"
  }
})