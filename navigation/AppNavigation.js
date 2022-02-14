import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

//navigation imports
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//screen imports
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import InitialScreen from '../screens/InitialScreen';
import MessageScreen from '../screens/MessagesScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LogInScreen from '../screens/LogInScreen';

const Stack = createStackNavigator()

const MainStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={({route}) => ({
                headerShown: false
            })}
        >
            <Stack.Screen name={"Initial"} component={InitialScreen} />
            <Stack.Screen name={"SignUp"} component={SignUpScreen} />
            <Stack.Screen name={"LogIn"} component={LogInScreen} />
            <Stack.Screen name={"Tab"} component={MainTabNavigator} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return(
        <Tab.Navigator
            
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon:({focused, color, size}) => {
                    let iconName;
                    if(route.name === 'Home'){
                        iconName = focused ? 'home' : 'home-outline'
                    }else if(route.name === "Explore"){
                        iconName = focused ? 'search' : 'search-outline'
                    }else if(route.name === "Message"){
                        iconName = focused ? 'mail' : 'mail-outline'
                    }
                    return <Ionicons name={iconName} size={20} color={"#FFFFFF"} />;
                },
                tabBarStyle: { backgroundColor: '#000000' },
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name={"Home"} component={HomeScreen} />
            <Tab.Screen name={"Explore"} component={ExploreScreen} />
            <Tab.Screen name={"Message"} component={MessageScreen} />
        </Tab.Navigator>
    )
}



const AppNavigation = () => {
  return (
    <NavigationContainer>
        <MainStackNavigator />
    </NavigationContainer>
  )
}

export default AppNavigation;

const styles = StyleSheet.create({})