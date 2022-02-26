import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const MapViewModal = () => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        presentationStyle={"overFullScreen"}
    >
        <View style={styles.wrapperView}>
            <View style={styles.container}>
                <MapView style={styles.map} />
            </View>
        </View>
    </Modal>
  )
}

export default MapViewModal;

const styles = StyleSheet.create({

    container:{
        width: "100%",
        height: "80%",
        marginTop: "20%",
        flex: 1,
    },
    map:{

    }
})