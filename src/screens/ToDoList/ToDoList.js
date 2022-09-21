import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   StatusBar,
   Platform,
   TextInput,
   TouchableOpacity,
   FlatList,
   Alert
} from "react-native";
import {
   COLORS,
   SIZES,
   FONTS,
   SHADOW
} from "../../constants";
import CheckBox from "expo-checkbox";
import { setItem, setObjectItem, getObjectItem } from '../../utils/storage';


const styles = StyleSheet.create({
   container: {
      paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
      flex: 1,
      backgroundColor: COLORS.primary,
      padding: SIZES.padding,
      width: "100%",
   },
   textBoxWrapper: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: SIZES.padding,
      borderRadius: SIZES.textBoxRadius,
      borderColor: COLORS.secondary,
      borderWidth: 2,
      maxWidth: 500,
   }
})

export default function ToDoList() {
   //State variables
   //let storedTasks;

   return (
      <View style={styles.container}>
         <View style={styles.textBoxWrapper}>
            <Text>To do list Screen!</Text>
         </View>
      </View>
   )
}
