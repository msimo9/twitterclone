import {Text, View, ScrollView, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/MessageStyle'
import RelativeProfilePicture from '../components/RelativeProfilePicture'
import HeaderTitle from '../components/HeaderTitle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler'
import NewMessage from '../components/NewMessage'
import NewMessageModal from '../components/ModalScreens/NewMessageModal'
import {query, collection, getDocs, doc, getDoc} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from '../firebase/firebase' 
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const MessagesHeader = ({onFieldFocus, onLoseFocus, searchVisible, placeholder}) => {
  return(
    <View style={styles.scrollViewHeader}>
        <View style={styles.headerTopRow}>
          <RelativeProfilePicture />
          <HeaderTitle title={"Messages"} />
          <Ionicons name={"settings-outline"} size={16} color={"#FFFFFF"} />
        </View>

        <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder={placeholder}
          placeholderTextColor={"gray"}
          onFocus={() => onFieldFocus()}
          onBlur={() => onLoseFocus()}
          autoFocus={false}
        />
        {searchVisible && <Ionicons name={"search-outline"} size={14} color={"gray"} style={styles.searchIcon}/>}
        </View>
    </View>
  )
}

const RenderLastMessage = ({item}) => {
  const [imageReady, setImageReady] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/twitterclone-cbd8e.appspot.com/o/default_profile_400x400.png?alt=media&token=036b7057-da16-4269-a2d9-a4e767b31772")

  const getProfileData = async() =>{
    const docRef = doc(db, "userinfo", item[0]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      setFullName(docSnap.data().fullName);
      setUserName(docSnap.data().username);
    }
    const storage = getStorage();
    const profilePhotoUrl = await getDownloadURL(ref(storage, item[0]+'/profilePicture/profilePhoto.jpg'));
    if(profilePhotoUrl.length > 0){
      setImage(profilePhotoUrl);
      setImageReady(!imageReady);
    }
  }

  useEffect(() => {
    console.log("");
  }, [imageReady, image]);

  useEffect(() => {
    getProfileData();
  }, []);

  return(
    <View style={styles.lastMessage}>
      <Image source={{uri: image}} style={styles.lastMessageImage} />
      <View>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={{color: "gray"}}>@{userName}</Text>
        </View>

        <Text style={item[1].startsWith("https://firebasestorage.googleapis.com") ? {color: "gray", fontStyle: "italic"} : {color: "gray"}}>
          {
            item[1].startsWith("https://firebasestorage.googleapis.com") 
            ? "Sent a photo." 
            : item[1].substring(0, 25)
          }
        </Text>
      </View>
    </View>
  )
}

const MessagesScreen = ({navigation}) => {
  const [searchVisible, setSearchVisible] = useState(true);
  const [placeholder, setPlaceholder] = useState("Search for people and groups");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [lastMessages, setLastMessages] = useState([]);
  const [messagesReady, setMessagesReady] = useState(false);

  const uid = useSelector(state => state.uid);

  const getMessages = async() => {
    const q = query(collection(db, "messages"));
    const querySnapshot = await getDocs(q);
    let messageArray = [];
    let lastMessages = [];
    let receivers = [];
    querySnapshot.forEach((doc) => {
      messageArray.push(doc.data());
    });
    messageArray.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0));

    messageArray.forEach((doc) => {
      if(uid === doc.senderID){
        if(receivers.indexOf(doc.receiverID) === -1){
          receivers.push(doc.receiverID);
          lastMessages.push([doc.receiverID, doc.text]);
        }
      }
    });

    const newPromise = new Promise (() => {
      setLastMessages(lastMessages);
    });
    newPromise.then(setMessagesReady(!messagesReady));
  }

  useEffect(() => {
    getMessages();
  }, [])

  useEffect(() => {
    console.log("");
  }, [messagesReady]);

  const toggleModalVisibility = () => {setModalVisibility(!modalVisibility)};

  const onFieldFocus = () => {
    setSearchVisible(false);
    setPlaceholder("");
  }

  const onLoseFocus = () => {
    setSearchVisible(true);
    setPlaceholder("Search for people and groups");
  }


  return (
    <View style={{width: "100%", height: "100%"}}>
    <ScrollView
      contentContainerStyle={{alignItems: "center"}}
      style={styles.container}
      stickyHeaderIndices={[0]}
      keyboardShouldPersistTaps={"never"}
      keyboardDismissMode={"on-drag"}
    >
      <MessagesHeader onFieldFocus={onFieldFocus} onLoseFocus={onLoseFocus} searchVisible={searchVisible} placeholder={placeholder}/>

      <View style={styles.messageContainer}>
        {lastMessages.map((item) => {
          return(
            <RenderLastMessage item={item} />
          )
        })}
      </View>
    </ScrollView>
    {modalVisibility && <NewMessageModal navigation={navigation} action={toggleModalVisibility} visible={modalVisibility} /> }
    <NewMessage action={toggleModalVisibility} />
    </View>
  )
}

export default MessagesScreen;