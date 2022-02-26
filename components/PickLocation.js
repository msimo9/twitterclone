import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React, {useState} from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MapHeader = ({toggleMap}) => {
    return(
    <View style={styles.header}>
        <TouchableOpacity onPress={toggleMap}><Text style={styles.text}>Cancel</Text></TouchableOpacity>
        <Text style={styles.text}>Save</Text>
    </View>
    )
}

const PickLocation = ({toggleMap}) => {

    const initialMarker = {};
    const [marker, setMarker] = useState(initialMarker);

    const handleTouch = (e) => {
        setMarker(e.nativeEvent.coordinate);
    }

    return (
        <View style={styles.mapContainer}>
            <MapHeader toggleMap={toggleMap} />
            <MapView
                onPress={e => handleTouch(e)}
                style={styles.map}
                initialRegion={{
                    latitude: 45.88696781334461,
                    longitude: 13.907871079466174,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    key={Math.random()}
                    coordinate={marker}
                    title={"Your desired location"}
                    description={"marker.description"}
                />
            </MapView>
        </View>
    )
}

export default PickLocation

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "90%",
    },
    mapContainer: {
        marginTop: "10%",
        width: "100%",
        height: "100%",
    },
    header:{
        height: "10%",
        backgroundColor: "#1DA1F2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent:"space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    closeButton:{
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: "#1DA1F2",
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 99,
    },
    text:{
        color: "#ffffff",
        fontWeight: "500",
    }
})