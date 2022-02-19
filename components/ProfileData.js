import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'

const ProfileData = () => {
    const profileType = useSelector(state => state.profileType);
    return (
            <View style={styles.profileData}>
                <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>matjaz</Text>
                    <Ionicons name={profileType === "public" ? "lock-open" : "lock-closed"} size={16} color={"#FFFFFF"} />
                </View>
                <Text style={styles.weakText}>@simonicmatjaz</Text>
                <View style={styles.followers}>
                    <Text style={styles.profileFollowing}>187</Text>
                    <Text style={styles.weakText}>Following</Text>
                    <Text style={styles.profileFollowing}>26</Text>
                    <Text style={styles.weakText}>Followers</Text>
                </View>
            </View>
        )
}

export default ProfileData

const styles = StyleSheet.create({
    profileData:{
        marginTop: 20,
    },
    profileNameContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
    },
    profileName:{
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    weakText:{
        color: "#D3D3D3",
        fontWeight: "300",
        fontSize: 12,
        marginRight: 5
    },
    followers:{
        flexDirection: "row",
        marginTop: 15,
        alignItems: "center",
    },
    profileFollowing:{
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 12,
        marginRight: 5
    }
})