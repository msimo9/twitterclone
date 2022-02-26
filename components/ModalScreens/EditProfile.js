import { StyleSheet, Text, View, Modal, ScrollView, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, put } from "firebase/storage";
import PickLocation from '../PickLocation';

export const editProfileData = [
    {name: "Name", placeholder: "Add your name"},
    {name: "Bio", placeholder: "Add a bio to your profile"},
    {name: "Location", placeholder: "Add your location"},
    {name: "Website", placeholder: "Add your website"},
    {name: "Birth date", placeholder: "Add your date of birth"},
];
const EditProfile = (props) => {
    const uid = useSelector(state => state.uid);
    const [mapVisibility, setMapVisibility] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const [userData, setUserData] = useState(editProfileData);

    const toggleMapVisibility = () => {
        setMapVisibility(!mapVisibility);
    }

    const pickImage = async(uid) => {
        // No permissions request is necessary for launching the image library
        let file = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          //console.log(file.uri);
      
          if (!file.cancelled) {
    
            //making a blob response out of picked image
            const response = await fetch(file.uri);
            const blob2 = await response.blob();
    
            //add to firebase code
            const imagePath = file.uri;
            const storage = getStorage();
            const imageFormat = imagePath.substring(imagePath.length-3);
            var storageRef = ref(storage, uid + '/profilePicture/profilePhoto.'+imageFormat);
    
            uploadBytes(storageRef, blob2).then((snapshot) => {
                console.log('Profile photo successfuly uploaded :)');
            });
          }
    }

    const handleTextChange = (field, value) => {
        console.log(field, " ", value);
        setChangesMade(true);
        let tempObj = userData;
        switch(field){
            case "Name":
                tempObj[0]["value"] = value;
                break;
            case "Bio":
                tempObj[1]["value"] = value;
                break;
            case "Location":
                tempObj[2]["value"] = value;
                setMapVisibility(true);
                break;
            case "Website":
                tempObj[3]["value"] = value;
                break;
            case "Birth date":
                tempObj[4]["value"] = value;
                break;
        }
        setUserData(tempObj);
    }

    const profilePicture = useSelector(state=>state.profilePicture);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            presentationStyle={"overFullScreen"}
        >
            <ScrollView
                style={styles.container}
                stickyHeaderIndices={[0]}
                justifyContent={{flex: 1}}
            >
                <View>
                <View style={styles.header}>
                    <View style={{width: 100/3+"%", justifyContent: "center", paddingLeft: "5%"}}><Text onPress={props.toggleModal} style={styles.cancelButton}>Cancel</Text></View>
                    <View style={{width: 100/3+"%", alignItems: "center", justifyContent: "center"}}><Text style={styles.title}>Edit profile</Text></View>
                    <View style={{width: 100/3+"%", justifyContent: "center", alignItems: "flex-end", paddingRight: "5%"}}>
                        {changesMade ?
                        <Text onPress={props.toggleModal} style={styles.cancelButton}>Save</Text>
                        : null
                        }
                    </View>
                </View>
                </View>

                <View style={styles.coverPhoto}>
                    <Ionicons name={"camera-outline"} size={28} color={"#FFFFFF"} />
                </View>

                <TouchableOpacity onPress={() => pickImage(uid)}>
                <View style={styles.profilePhotoContainer} >
                    <View
                        style={styles.profilePhoto}
                    >  
                    
                    <Image style={{width: "100%", height: "100%", borderRadius: 30,}} source={{uri: profilePicture}}/>
                    
                        
                        <Ionicons
                            name={"camera-outline"}
                            size={28}
                            color={"#FFFFFF"}
                            style={{position: "absolute", opacity: 1}}
                        />
                    </View>
                </View>
                </TouchableOpacity>
                
                
                <View style={styles.inputs}>
                
                    {!mapVisibility && editProfileData.map((item, index) => {
                        return(
                        <View style={[styles.inputField, item.name==="Bio" ? {height: 75} : {alignItems:"center"}]} key={index}>
                            <Text style={styles.inputTitle} >{item.name}</Text>
                            <TextInput
                                placeholder={item.placeholder}
                                style={styles.textInput}
                                placeholderTextColor={"#D3D3D3"}
                                multiline={item.name === "Bio" ? true : false}
                                onChangeText={value => handleTextChange(item.name, value)}
                            />
                            {item.name === "Location" ?
                                <TouchableOpacity onPress={() => toggleMapVisibility()}>
                                    <Ionicons name={"location-outline"} size={16} color={"#ffffff"} />
                                </TouchableOpacity>
                            :null}
                        </View>
                        )
                    })}
                    
                    

                    {
                        mapVisibility ?
                            <PickLocation toggleMap={toggleMapVisibility}/>
                        : null
                    }
                    
                </View>
            </ScrollView>
        </Modal>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "90%",
        position: "absolute",
        top: "10%",
        backgroundColor: "#000000",
        borderRadius: 15,
    },
    header:{
        justifyContent: "space-between",
        backgroundColor: "#000000",
        flexDirection: "row",
        width: "100%",
        height: 50,
    },
    title:{
        fontWeight:"bold",
        color: "#FFFFFF",
    },
    cancelButton:{
        color: "#FFFFFF"
    },
    coverPhoto:{
        backgroundColor: "#1e2022",
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    profilePhotoContainer:{
        width: "100%",
        height: 70,
    },
    profilePhoto:{
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 20,
        marginTop: -30,
        borderWidth: 3,
        borderColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    inputs:{
        width: "100%",
        height: "100%",
    },
    inputField:{
        flexDirection: "row",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        marginVertical: 10,
    },
    inputTitle:{
        color: "#FFFFFF",
        fontWeight: "bold",
        width: "25%",
    },
    textInput:{
        width: "60%",
        color: "#1DA1F2",
    },
    
})