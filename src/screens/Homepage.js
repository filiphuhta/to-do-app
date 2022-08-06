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
import { Card } from "../components";
import {
    COLORS,
    SIZES,
    FONTS,
    SHADOW
} from "../constants";
import { setItem, setObjectItem, getObjectItem } from '../utils/storage';

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding
    },
    textBoxWrapper: {
        width: "100%",
        position: "absolute",
        top: 40,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: SIZES.padding
    },
    textInput: {
        ...SHADOW,
        borderRadius: SIZES.textBoxRadius,
        backgroundColor: COLORS.secondary,
        height: 42,
        paddingLeft: 15,
        width: "95%",
        color: COLORS.primary,
        marginRight: 15,
        ...FONTS.h2_semiBold,
    },
    btn: {
        ...SHADOW,
        backgroundColor: COLORS.accent,
        height: 42,
        width: 42,
        borderRadius: SIZES.textBoxRadius,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function Homepage() {
    //State variables
    //let storedTasks;

    const [list, setList] = useState([])
    const [value, setValue] = useState("")

    useEffect(() => {
        getObjectItem("tasks")
            .then(t => setList(t.item))
            .catch(e => { console.log(e) })
    }), []
    // A function that add data to the list array
    function addText(text) {
        let data = list ? list : [];
        if (value !== "") {
            data.push({ text: text, isSelected: false });
            setList(data); // Adding a JS Object
            setObjectItem("tasks", data);
            setValue("")
        } else {
            alert("Please type in something!")
        }
    }

    // A function that set the value of isSelected based on the state of the checkbox
    function setIsSelected(index, value) {
        let data = []
        // Making a deep copy of the list array
        for (let i = 0; i < list.length; i++) {
            if (index === i) {
                data.push({ ...list[i], isSelected: value }) // Updating the object at position i === index
            } else {
                data.push(list[i])
            }
        }

        setList(data);
        setObjectItem("tasks", data); // Setting the new state
    }

    // A function that delete an item at position idx from the list array
    function deleteItem(idx) {
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


    return <View style={styles.container}>
        <View style={styles.textBoxWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="New task"
                placeholderTextColor={COLORS.primary}
                onChangeText={text => setValue(text)}
                value={value} />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => addText(value)}>
                <Text style={{ fontSize: 34, color: COLORS.secondary }}>+</Text>
            </TouchableOpacity>
        </View>
        <View style={{
            marginTop: 90,
            borderBottomColor: COLORS.secondary,
            borderBottomWidth: 2,
        }}>
            <Text style={{

                ...FONTS.h1_semiBold,
                color: COLORS.secondary,
                marginBottom: 15,


            }}>Todays tasks</Text>
        </View>
        <FlatList style={{ flex: 1, top: 10 }}
            data={list}
            renderItem={({ item, index }) => <Card data={item}
                index={index}
                setIsSelected={setIsSelected}
                deleteItem={deleteItem} />}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
}
