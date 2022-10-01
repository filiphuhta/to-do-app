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
      backgroundColor: COLORS.bgPrimary,
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
      backgroundColor: COLORS.bgSecondary,
      borderWidth: 2,
      maxWidth: 500,
   }
})

export default function ToDoList() {
   const [list, setList] = useState([]);
   //State variables
   //let storedTasks;
/** 
   useEffect(() => {
      getObjectItem("to-do-list")
         .then(t => setList(t.item))
            .catch(e => { console.log(e) });
      //  updateTasks();
   }), [];
   */
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
      let userInput = await AsyncInput();
      if (userInput) {
         setList(oldArray => [...oldArray, { name: userInput }]);
      } else {
         alert("Please type in a name of the list")
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
                  setObjectItem("to-do-list", data);
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
               <Text style={{ fontSize: 16, color: COLORS.text }}>Add task +</Text>
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
