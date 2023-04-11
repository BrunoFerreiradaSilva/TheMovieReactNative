import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import Favorites from "./ui/favorites";
import Home from "./ui/home";
import Details from "./ui/details";


export default function Routes(){
    return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="HomeRoutes" component={HomeRoutes} options={{ headerShown: false, tabBarIcon: ({color}) => (<FontAwesome name="home" size={24} color={color}/>) }}/>
      <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false, tabBarIcon: ({color}) => (<MaterialIcons name="favorite" size={24} color={color} />) }} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}

function HomeRoutes({componentePrincipal= Home}){
    return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={componentePrincipal} options={{ headerShown: true }} />
      <Stack.Screen name="Details" component={Details} options={{headerShown: true , taBarVisible:false}} />
    </Stack.Navigator>
  )
}