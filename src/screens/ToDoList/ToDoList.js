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
   const addTask = (text, date, daily) => {
      let data = list ? list : [];
      if (value !== "") {
          data.push({ text: text, isSelected: false, date: date, daily: daily });
          setList(data); // Adding a JS Object
          setObjectItem("tasks", data);
          setValue("")
      } else {
          alert("Please type in something!")
      }
  }

      // A function that delete an item at position idx from the list array
      const deleteItem = (idx) => {
         Alert.alert(
             "Delete task",
             "Are you sure you want to delete this task?",
             [
                 {
                     text: "Cancel",
                     style: "cancel"
                 },
                 {
                     text: "Yes", onPress: () => {
                         const data = list.filter((item, index) => index !== idx);
                         setList(data);
                         setObjectItem("tasks", data);
                     }
                 }
             ])
     }

   return (
      <View style={styles.container}>
         <View style={styles.textBoxWrapper}>
            <Text>To do list Screen!</Text>
         </View>
      </View>
   )
}
