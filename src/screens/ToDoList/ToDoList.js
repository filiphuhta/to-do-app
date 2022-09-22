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
import { setItem, setObjectItem, getObjectItem } from '../../utils/storage';
import { ListItem } from '../../components/ListItem';


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
   const [list, setList] = useState([]);
   //State variables
   //let storedTasks;
   const AsyncInput = async () => {
      return new Promise((resolve, reject) => {
         Alert.prompt("Create list",
            "Enter the name of the new to do list",
            [
               {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
               },
               {
                  text: "Create",
                  onPress: input => resolve(input)
               }
            ],
            "plain-text");
      })
   }

   const addTask = async () => {
      let data = list ? list : [];
      let userInput = await AsyncInput();

      if (userInput) {
         console.log(userInput);
         data.push({ name: userInput });
         setList(data);
      }
      /** 
       if (value !== "") {
          data.push({ name: text });
          setList(data); // Adding a JS Object
          setObjectItem("tasks", data);
          setValue("")
       } else {
          alert("Please type in something!")
       } */
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
            <TouchableOpacity
               style={styles.btn}
               onPress={() => addTask()}>
               <Text style={{ fontSize: 16, color: COLORS.secondary }}>Add task +</Text>
            </TouchableOpacity>
         </View>
         <FlatList style={{ flex: 1, top: 10 }}
            data={list}
            renderItem={({ item, index }) => <ListItem data={item}
               index={index}
               deleteItem={deleteItem} />}
            keyExtractor={(item, index) => index.toString()}
         />
      </View>
   )
}
