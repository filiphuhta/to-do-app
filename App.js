import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Homepage } from "./src/screens/HomePage";
import { ToDoList } from './src/screens/ToDoList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  COLORS,
  SIZES,
  FONTS,
  SHADOW
} from "./src/constants";
const Tab = createBottomTabNavigator();

export default function App() {

  const [fontsLoaded, setFontLoad] = useState(false)

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Mont': require('./assets/fonts/Montserrat-SemiBold.ttf')
      }).then(() => {
        setFontLoad(true);
      })
    })();
  }, [])



  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: COLORS.accent,
            tabBarInactiveTintColor: COLORS.primary,
            headerShown: false,
            tabBarStyle: {
              height: 90,
              paddingHorizontal: 5,
              paddingTop: 0,
              backgroundColor: COLORS.bgSecondary,
              position: 'absolute',
              borderTopWidth: 0,
            },
          })}>
          <Tab.Screen
            name="Current list"
            options={{
              tabBarLabel: 'Current list',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="md-checkbox-outline" size={24} color={color} />
              ),
            }}
            component={Homepage} />
          <Tab.Screen
            name="To do lists"
            options={{
              tabBarLabel: 'Lists',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="md-list" size={24} color={color} />
              ),
            }} component={ToDoList} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
