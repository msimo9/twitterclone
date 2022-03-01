import {Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/MessageStyle'
import RelativeProfilePicture from '../components/RelativeProfilePicture'
import HeaderTitle from '../components/HeaderTitle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler'
import NewMessage from '../components/NewMessage'

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

const MessagesScreen = () => {
  const [searchVisible, setSearchVisible] = useState(true);
  const [placeholder, setPlaceholder] = useState("Search for people and groups");

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
    </ScrollView>
    <NewMessage />
    </View>
  )
}

export default MessagesScreen;