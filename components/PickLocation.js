import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';
import axios from 'axios'


const MapHeader = ({toggleMap, populateLocationField}) => {
    return(
    <View style={styles.header}>
        <TouchableOpacity onPress={toggleMap}><Text style={styles.text}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity onPress={populateLocationField}><Text style={styles.text}>Save</Text></TouchableOpacity>
    </View>
    )
}

const Footer = ({markerLabel}) => {
    return(
        <View style={styles.footer}>
            <Text style={styles.text}>Location: {markerLabel.substring(0, 25)} ...</Text>
        </View>
    )
}

const PickLocation = ({toggleMap, populateLocationField}) => {

    const initialMarker = {};
    const [marker, setMarker] = useState(initialMarker);
    const [markerLabel, setMarkerLabel] = useState("");

    const handleTouch = (e) => {
        const myApiKey = "h_A8WPJtlUKyomGoVLRs5UV_8PYbD2pabNEvTotYpjs";
        const markerPosition = e.nativeEvent.coordinate;
        const lat = e.nativeEvent.coordinate.latitude;
        const lng = e.nativeEvent.coordinate.longitude;
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${myApiKey}&mode=retrieveAddresses&prox=${lat},${lng}`;
        fetch(url)
        .then((response) => response.json())
        .then((response) => {
            const address = response.Response.View[0].Result[0].Location.Address.Label;
            setMarkerLabel(address)
        })
        .catch((error) => {
            console.error(error);
        });
        setMarker(markerPosition);
    }

    return (
        <View style={styles.mapContainer}>
            <MapHeader toggleMap={toggleMap} populateLocationField={() => populateLocationField(markerLabel)}/>
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
                    isPreselected={true}
                    pinColor={"#1DA1F2"}
                />
            </MapView>
            <Footer markerLabel={markerLabel}/>
        </View>
    )
}

export default PickLocation

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "80%",
    },
    mapContainer: {
        marginTop: "0%",
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
    },
    footer:{
        height: "10%",
        backgroundColor: "#1DA1F2",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
})