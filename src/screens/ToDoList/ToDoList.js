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
   Alert,
   Pressable
} from "react-native";
import {
   COLORS,
   SIZES,
   FONTS,
   SHADOW
} from "../../constants";
import { setItem, setObjectItem, getObjectItem } from '../../utils/storage';
import { ListItem } from '../../components/ListItem';
import Ionicons from '@expo/vector-icons/Ionicons';


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
   },
   topWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 20,
      borderBottomColor: COLORS.secondary,
      borderBottomWidth: 2,
      maxWidth: 500,
   },
   addButton: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      backgroundColor: COLORS.bgSecondary,
      borderRadius: 100,
      position: "absolute",
      right: 0,
      top: -10
   }
})

export default function ToDoList(props) {
   const [list, setList] = useState([]);

   useEffect(() => {
      getObjectItem("lists")
         .then(t => {
            setList(t.item)
         })
         .catch(e => { console.log(e) });
   }), [];

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
   };

   const addTask = async () => {
      let data = list ? list : [];
      let userInput = await AsyncInput();
      if (userInput) {
         data.push({ name: userInput });
         setList(data); // Adding a JS Object
         //  setObjectItem("tasks", data);
         //  setList(oldArray => [...oldArray, { name: userInput }]);
         setObjectItem("lists", data);
      } else {
         alert("Please type in a name of the list")
      }
   }

   // A function that delete an item at position idx from the list array
   const deleteItem = (idx) => {
      Alert.alert(
         "Delete List",
         "Are you sure you want to delete this list?",
         [
            {
               text: "Cancel",
               style: "cancel"
            },
            {
               text: "Yes", onPress: () => {
                  const data = list.filter((item, index) => index !== idx);
                  setList(data);
                  setObjectItem("lists", data);
               }
            }
         ])
   };

   return (
      <View style={styles.container}>
         <View style={styles.topWrapper}>
            <Text style={{

               ...FONTS.h1_semiBold,
               color: COLORS.text,
               marginBottom: 15,


            }}>Your Lists</Text>
            <Pressable style={styles.addButton} onPress={() => addTask()}>
               <Ionicons name="md-add" size={24} color={COLORS.accent} />
            </Pressable>
         </View>
         <FlatList style={{
            marginTop: 16
         }}
            columnWrapperStyle={{
               flex: 1,
               justifyContent: "space-between"
            }}
            numColumns={2}
            data={list}
            renderItem={({ item, index }) => <ListItem
               data={item}
               navigation={props.navigation}
               index={index}
               deleteItem={deleteItem} />}
            keyExtractor={(item, index) => index.toString()}
         />
      </View>
   )
}
